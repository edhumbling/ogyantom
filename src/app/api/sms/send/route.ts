import { NextResponse } from "next/server";

const ARKESEL_SEND_URL = "https://sms.arkesel.com/api/v2/sms/send";
const MAX_RECIPIENTS = 5000;
const MAX_MESSAGE_CHARS = 918; // ~6 concatenated segments

// Normalize Ghana numbers to 233XXXXXXXXX
function normalizeNumber(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (/^233\d{9}$/.test(digits)) return digits;
  if (/^0\d{9}$/.test(digits)) return `233${digits.slice(1)}`;
  return null;
}

function countSegments(message: string): number {
  if (message.length <= 160) return 1;
  return Math.ceil(message.length / 153);
}

type SendPayload = {
  key?: unknown;
  message?: unknown;
  recipients?: unknown;
};

export async function POST(request: Request) {
  const adminKey = process.env.SMS_ADMIN_KEY;
  const apiKey = process.env.ARKESEL_API_KEY;
  const senderId = (process.env.ARKESEL_SENDER_ID || "OGYA NTOM").slice(0, 11);

  if (!adminKey || !apiKey) {
    return NextResponse.json(
      { message: "SMS service is not configured yet." },
      { status: 503 }
    );
  }

  let payload: SendPayload;
  try {
    payload = (await request.json()) as SendPayload;
  } catch {
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 }
    );
  }

  if (payload.key !== adminKey) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const message =
    typeof payload.message === "string" ? payload.message.trim() : "";
  if (!message) {
    return NextResponse.json(
      { message: "Write a message first." },
      { status: 400 }
    );
  }
  if (message.length > MAX_MESSAGE_CHARS) {
    return NextResponse.json(
      { message: "Message is too long (keep it under 918 characters)." },
      { status: 400 }
    );
  }

  const rawList =
    typeof payload.recipients === "string" ? payload.recipients : "";
  const numbers = [
    ...new Set(
      rawList
        .split(/[\n,;]+/)
        .map((entry) => normalizeNumber(entry))
        .filter((entry): entry is string => entry !== null)
    ),
  ];
  if (numbers.length === 0) {
    return NextResponse.json(
      { message: "No valid Ghana phone numbers found." },
      { status: 400 }
    );
  }
  if (numbers.length > MAX_RECIPIENTS) {
    return NextResponse.json(
      { message: `Too many recipients (max ${MAX_RECIPIENTS} per send).` },
      { status: 400 }
    );
  }

  const segments = countSegments(message);

  // Chunk recipient lists; Arkesel handles arrays but chunking keeps
  // each request small and failures isolated.
  const chunks: string[][] = [];
  for (let i = 0; i < numbers.length; i += 100) {
    chunks.push(numbers.slice(i, i + 100));
  }

  for (const chunk of chunks) {
    let res: Response;
    try {
      res = await fetch(ARKESEL_SEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "api-key": apiKey },
        body: JSON.stringify({ sender: senderId, recipients: chunk, message }),
      });
    } catch {
      return NextResponse.json(
        { message: "Could not reach Arkesel. Check your connection and try again." },
        { status: 502 }
      );
    }
    if (!res.ok) {
      const detail = await res.json().catch(() => null);
      return NextResponse.json(
        { message: "Arkesel rejected the send.", detail },
        { status: 502 }
      );
    }
  }

  return NextResponse.json({
    message: "Sent.",
    recipients: numbers.length,
    segments,
    estimatedCredits: numbers.length * segments,
  });
}
