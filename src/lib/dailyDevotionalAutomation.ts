import { writeClient, client } from "@/sanity/client";
import {
  buildDailyDevotionalBody,
  slugify,
  type GeneratedDailyDevotional,
} from "@/lib/dailyDevotionalContent";
import { firstGeneratedDailyDevotional } from "@/lib/dailyDevotionalSeed";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const CO_AUTHOR = "Watchman Opanin Thomas";
const maxAttempts = 3;

const groqDevotionalModels = [
  "openai/gpt-oss-120b",
  "llama-3.3-70b-versatile",
  "openai/gpt-oss-20b",
  "qwen/qwen3-32b",
  "meta-llama/llama-4-scout-17b-16e-instruct",
] as const;

const openRouterDevotionalModels = [
  "openai/gpt-oss-120b:free",
  "minimax/minimax-m2.5:free",
  "nvidia/nemotron-3-super-120b-a12b:free",
  "meta-llama/llama-3.3-70b-instruct:free",
  "qwen/qwen3-next-80b-a3b-instruct:free",
  "google/gemma-4-31b-it:free",
  "openai/gpt-oss-20b:free",
  "openrouter/free",
] as const;

type AutomationOptions = {
  date?: string;
  dryRun?: boolean;
  force?: boolean;
};

type ExistingDailyDevotional = {
  _id: string;
  slug?: string;
};

type ProviderMessage = {
  role: "system" | "user";
  content: string;
};

type ChatCompletionResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

export type DailyDevotionalAutomationResult = {
  ok: boolean;
  date: string;
  dryRun: boolean;
  skipped?: boolean;
  id: string;
  slug: string;
  modelUsed: string;
  generationStatus: "aiGenerated" | "fallback";
  devotional: GeneratedDailyDevotional;
};

function utcDateKey(value = new Date()) {
  return value.toISOString().slice(0, 10);
}

function normalizeDateKey(value?: string) {
  if (!value) return utcDateKey();

  const normalized = value.trim();

  if (!/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
    throw new Error("Invalid date. Use YYYY-MM-DD.");
  }

  return normalized;
}

function buildPrompt(date: string) {
  return [
    {
      role: "system",
      content:
        "You generate original Christian daily devotionals for Ogya Ntom Prayer Army. Write in a warm, Scripture-centered, pastoral voice. Do not imitate any living author exactly. Return only valid JSON.",
    },
    {
      role: "user",
      content: `Create one daily devotional for ${date}.

Use this structure:
- title: short, specific, spiritually compelling
- theme: one sentence
- scripture: one Bible reference
- scriptureText: a short KJV Scripture quotation
- excerpt: 28 to 42 words
- reflectionParagraphs: exactly 4 rich paragraphs, 70 to 115 words each
- prayer: one reverent prayer, 55 to 90 words
- actionSteps: exactly 3 practical steps
- shareLine: one line in the format "Share / 5 min read / [watch or theme]"
- readTime: "5 min read"

The devotional should carry grace, prayer, faith, practical application, and hope without guaranteeing outcomes or replacing pastoral care.`,
    },
  ] satisfies ProviderMessage[];
}

function extractJson(value: string) {
  const trimmed = value.trim();

  if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
    return trimmed;
  }

  const match = trimmed.match(/\{[\s\S]*\}/);
  return match?.[0] || "";
}

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function asStringArray(value: unknown) {
  if (!Array.isArray(value)) return [];

  return value.map(asString).filter(Boolean);
}

function normalizeGeneratedDevotional(value: unknown): GeneratedDailyDevotional | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const record = value as Record<string, unknown>;
  const devotional: GeneratedDailyDevotional = {
    title: asString(record.title),
    theme: asString(record.theme),
    scripture: asString(record.scripture),
    scriptureText: asString(record.scriptureText),
    excerpt: asString(record.excerpt),
    reflectionParagraphs: asStringArray(record.reflectionParagraphs).slice(0, 4),
    prayer: asString(record.prayer),
    actionSteps: asStringArray(record.actionSteps).slice(0, 3),
    shareLine: asString(record.shareLine) || "Share / 5 min read / Daily Watch",
    readTime: asString(record.readTime) || "5 min read",
  };

  if (
    !devotional.title ||
    !devotional.scripture ||
    !devotional.scriptureText ||
    !devotional.excerpt ||
    devotional.reflectionParagraphs.length !== 4 ||
    devotional.actionSteps.length !== 3 ||
    !devotional.prayer
  ) {
    return null;
  }

  return devotional;
}

async function postChatCompletion(
  url: string,
  token: string,
  body: Record<string, unknown>,
  headers: Record<string, string> = {},
) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Model request failed with ${response.status}`);
  }

  const data = (await response.json()) as ChatCompletionResponse;
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("Model returned no content.");
  }

  const parsed = JSON.parse(extractJson(content)) as unknown;
  const devotional = normalizeGeneratedDevotional(parsed);

  if (!devotional) {
    throw new Error("Model returned invalid devotional JSON.");
  }

  return devotional;
}

async function tryGroqModel(model: string, date: string) {
  if (!process.env.GROQ_API_KEY) {
    return null;
  }

  const devotional = await postChatCompletion(GROQ_API_URL, process.env.GROQ_API_KEY, {
    model,
    messages: buildPrompt(date),
    max_completion_tokens: 2200,
    temperature: 0.78,
    top_p: 0.92,
    response_format: { type: "json_object" },
  });

  return { devotional, modelUsed: `groq:${model}` };
}

async function tryOpenRouterModels(date: string) {
  if (!process.env.OPENROUTER_API_KEY) {
    return null;
  }

  const [primaryModel, ...fallbackModels] = openRouterDevotionalModels;
  const devotional = await postChatCompletion(
    OPENROUTER_API_URL,
    process.env.OPENROUTER_API_KEY,
    {
      model: primaryModel,
      models: fallbackModels,
      messages: buildPrompt(date),
      max_tokens: 2200,
      temperature: 0.78,
      top_p: 0.92,
      response_format: { type: "json_object" },
    },
    {
      "HTTP-Referer": SITE_URL,
      "X-Title": SITE_NAME,
    },
  );

  return { devotional, modelUsed: "openrouter:fallback-chain" };
}

function fallbackDevotional(date: string): GeneratedDailyDevotional {
  if (date === "2026-05-04") {
    return firstGeneratedDailyDevotional;
  }

  return {
    ...firstGeneratedDailyDevotional,
    title: "Mercy for Today's Watch",
    excerpt:
      "The mercy of God meets this day before fear can define it. Bring every burden into prayer and let His faithfulness steady your next step.",
    shareLine: "Share / 5 min read / Daily Watch",
  };
}

async function generateDailyDevotional(date: string) {
  const failures: string[] = [];

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    for (const model of groqDevotionalModels) {
      try {
        const result = await tryGroqModel(model, date);

        if (result) {
          return { ...result, generationStatus: "aiGenerated" as const, failures };
        }
      } catch (error) {
        failures.push(`attempt ${attempt} groq ${model}: ${(error as Error).message}`);
      }
    }

    try {
      const result = await tryOpenRouterModels(date);

      if (result) {
        return { ...result, generationStatus: "aiGenerated" as const, failures };
      }
    } catch (error) {
      failures.push(`attempt ${attempt} openrouter: ${(error as Error).message}`);
    }
  }

  console.warn("Daily devotional AI generation fell back to deterministic content", failures);

  return {
    devotional: fallbackDevotional(date),
    modelUsed: "deterministic-fallback",
    generationStatus: "fallback" as const,
    failures,
  };
}

async function findExisting(date: string) {
  if (!client) return null;

  return client.fetch<ExistingDailyDevotional | null>(
    `*[_type == "dailyDevotional" && devotionalDate == $date][0] {
      _id,
      "slug": slug.current
    }`,
    { date },
  );
}

export async function publishDailyDevotional(options: AutomationOptions = {}) {
  const date = normalizeDateKey(options.date);
  const id = `daily-devotional-${date}`;
  const existing = await findExisting(date);

  if (existing && !options.force) {
    return {
      ok: true,
      date,
      dryRun: Boolean(options.dryRun),
      skipped: true,
      id: existing._id,
      slug: existing.slug || id,
      modelUsed: "existing-document",
      generationStatus: "aiGenerated",
      devotional: fallbackDevotional(date),
    } satisfies DailyDevotionalAutomationResult;
  }

  const generated = await generateDailyDevotional(date);
  const slug = slugify(generated.devotional.title);
  const publishedAt = `${date}T00:00:00.000Z`;
  const document = {
    _id: id,
    _type: "dailyDevotional",
    title: generated.devotional.title,
    slug: { _type: "slug", current: slug },
    devotionalDate: date,
    publishedAt,
    theme: generated.devotional.theme,
    scripture: generated.devotional.scripture,
    scriptureText: generated.devotional.scriptureText,
    excerpt: generated.devotional.excerpt,
    shareLine: generated.devotional.shareLine,
    coAuthor: CO_AUTHOR,
    readTime: generated.devotional.readTime,
    actionSteps: generated.devotional.actionSteps,
    prayer: generated.devotional.prayer,
    generationStatus: generated.generationStatus,
    modelUsed: generated.modelUsed,
    body: buildDailyDevotionalBody(generated.devotional),
  };

  if (!options.dryRun) {
    if (!writeClient) {
      throw new Error("SANITY_API_WRITE_TOKEN is required to publish daily devotionals.");
    }

    await writeClient.createOrReplace(document);
  }

  return {
    ok: true,
    date,
    dryRun: Boolean(options.dryRun),
    id,
    slug,
    modelUsed: generated.modelUsed,
    generationStatus: generated.generationStatus,
    devotional: generated.devotional,
  } satisfies DailyDevotionalAutomationResult;
}
