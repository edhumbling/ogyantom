import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/client";

type TestimonyPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  title?: unknown;
  highlight?: unknown;
  content?: unknown;
  website?: unknown;
};

const maxLengths = {
  name: 90,
  email: 140,
  phone: 40,
  title: 120,
  highlight: 80,
  content: 4000,
};

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function cleanLongText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\r\n/g, "\n").slice(0, maxLength);
}

function isValidEmail(value: string) {
  if (!value) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  if (!writeClient) {
    return NextResponse.json(
      { message: "Testimony submission is not configured yet." },
      { status: 503 },
    );
  }

  let payload: TestimonyPayload;

  try {
    payload = (await request.json()) as TestimonyPayload;
  } catch {
    return NextResponse.json({ message: "Invalid submission." }, { status: 400 });
  }

  if (payload.website) {
    return NextResponse.json({ message: "Thank you for sharing your testimony." });
  }

  const name = cleanText(payload.name, maxLengths.name);
  const email = cleanText(payload.email, maxLengths.email);
  const phone = cleanText(payload.phone, maxLengths.phone);
  const title = cleanText(payload.title, maxLengths.title);
  const highlight = cleanText(payload.highlight, maxLengths.highlight);
  const content = cleanLongText(payload.content, maxLengths.content);

  if (!name || !title || !content) {
    return NextResponse.json(
      { message: "Please provide your name, testimony title, and testimony." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ message: "Please provide a valid email." }, { status: 400 });
  }

  try {
    await writeClient.create({
      _type: "testimony",
      reviewStatus: "pending",
      name,
      email,
      phone,
      title,
      highlight,
      content,
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      message: "Thank you. Your testimony has been received.",
    });
  } catch (error) {
    console.error("Failed to create testimony", error);
    return NextResponse.json(
      { message: "We could not submit your testimony right now." },
      { status: 500 },
    );
  }
}
