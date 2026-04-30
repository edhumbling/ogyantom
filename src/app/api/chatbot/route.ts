import {
  CHAT_SYSTEM_PROMPT,
  getChatContext,
  GROQ_TEXT_MODELS,
  OPENROUTER_FREE_TEXT_MODELS,
} from "@/lib/chat-context";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

function isChatMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== "object") {
    return false;
  }

  const message = value as Partial<ChatMessage>;
  return (
    (message.role === "user" || message.role === "assistant" || message.role === "system") &&
    typeof message.content === "string" &&
    message.content.trim().length > 0
  );
}

function normalizeMessages(messages: unknown): ChatMessage[] {
  if (!Array.isArray(messages)) {
    return [];
  }

  return messages
    .filter(isChatMessage)
    .filter((message) => message.role !== "system")
    .slice(-12)
    .map((message) => ({
      role: message.role,
      content: message.content.trim().slice(0, 8000),
    }));
}

async function tryGroqModel(model: string, messages: ChatMessage[]) {
  if (!process.env.GROQ_API_KEY) {
    return null;
  }

  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      max_completion_tokens: 1200,
      temperature: 0.72,
      top_p: 0.95,
      stream: true,
    }),
  });

  if (response.ok && response.body) {
    return response;
  }

  console.warn(`Groq chatbot model failed: ${model} (${response.status})`);
  return null;
}

async function tryOpenRouterFreeModels(messages: ChatMessage[]) {
  if (!process.env.OPENROUTER_API_KEY) {
    return null;
  }

  const [primaryModel, ...fallbackModels] = OPENROUTER_FREE_TEXT_MODELS;
  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": SITE_URL,
      "X-Title": SITE_NAME,
    },
    body: JSON.stringify({
      model: primaryModel,
      models: fallbackModels,
      messages,
      max_tokens: 1200,
      temperature: 0.72,
      top_p: 0.95,
      stream: true,
    }),
  });

  if (response.ok && response.body) {
    return response;
  }

  console.warn(`OpenRouter free model fallback chain failed (${response.status})`);
  return null;
}

function transformOpenAICompatibleStream(body: ReadableStream<Uint8Array>) {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";

  return body.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        buffer += decoder.decode(chunk, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          const trimmed = line.trim();

          if (!trimmed.startsWith("data:")) {
            continue;
          }

          const data = trimmed.slice(5).trim();

          if (data === "[DONE]") {
            controller.enqueue(encoder.encode("data: [DONE]\n\n"));
            continue;
          }

          try {
            const parsed = JSON.parse(data) as {
              choices?: Array<{
                delta?: {
                  content?: string;
                };
              }>;
            };
            const content = parsed.choices?.[0]?.delta?.content;

            if (content) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
            }
          } catch {
            // Ignore partial or non-content events.
          }
        }
      },
      flush(controller) {
        if (buffer.includes("[DONE]")) {
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        }
      },
    }),
  );
}

export async function POST(request: Request) {
  if (!process.env.GROQ_API_KEY && !process.env.OPENROUTER_API_KEY) {
    return Response.json(
      { error: "The chat assistant is not configured yet." },
      { status: 503 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const messages = normalizeMessages((body as { messages?: unknown })?.messages);

  if (!messages.length || messages[messages.length - 1]?.role !== "user") {
    return Response.json({ error: "Please send a user message." }, { status: 400 });
  }

  const chatContext = await getChatContext();
  const providerMessages: ChatMessage[] = [
    {
      role: "system",
      content: `${CHAT_SYSTEM_PROMPT}\n\nUse this ministry context as your source of truth:\n\n${chatContext}`,
    },
    ...messages,
  ];

  for (const model of GROQ_TEXT_MODELS) {
    try {
      const response = await tryGroqModel(model, providerMessages);

      if (response?.body) {
        return new Response(transformOpenAICompatibleStream(response.body), {
          headers: {
            "Cache-Control": "no-cache, no-transform",
            Connection: "keep-alive",
            "Content-Type": "text/event-stream; charset=utf-8",
            "X-Accel-Buffering": "no",
          },
        });
      }
    } catch (error) {
      console.warn(`Groq chatbot model error: ${model}`, error);
    }
  }

  try {
    const response = await tryOpenRouterFreeModels(providerMessages);

    if (response?.body) {
      return new Response(transformOpenAICompatibleStream(response.body), {
        headers: {
          "Cache-Control": "no-cache, no-transform",
          Connection: "keep-alive",
          "Content-Type": "text/event-stream; charset=utf-8",
          "X-Accel-Buffering": "no",
        },
      });
    }
  } catch (error) {
    console.warn("OpenRouter chatbot fallback error", error);
  }

  return Response.json(
    {
      error:
        "The prayer assistant is temporarily unavailable. Please try again or contact the ministry team.",
    },
    { status: 503 },
  );
}
