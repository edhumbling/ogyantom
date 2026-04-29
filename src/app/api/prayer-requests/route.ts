import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/client";

type PrayerRequestPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  category?: unknown;
  request?: unknown;
  urgency?: unknown;
  contactPreference?: unknown;
  confidential?: unknown;
  website?: unknown;
};

const maxLengths = {
  name: 90,
  email: 140,
  phone: 40,
  category: 40,
  request: 4000,
  urgency: 20,
  contactPreference: 20,
};

const allowedCategories = new Set([
  "Family",
  "Healing",
  "Deliverance",
  "Direction",
  "Provision",
  "Thanksgiving",
  "Other",
]);

const allowedUrgencies = new Set(["normal", "urgent"]);
const allowedContactPreferences = new Set(["whatsapp", "phone", "email", "none"]);

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
      { message: "Prayer request submission is temporarily unavailable." },
      { status: 503 },
    );
  }

  let payload: PrayerRequestPayload;

  try {
    payload = (await request.json()) as PrayerRequestPayload;
  } catch {
    return NextResponse.json({ message: "Invalid submission." }, { status: 400 });
  }

  if (payload.website) {
    return NextResponse.json({ message: "Your prayer request has been received." });
  }

  const name = cleanText(payload.name, maxLengths.name);
  const email = cleanText(payload.email, maxLengths.email);
  const phone = cleanText(payload.phone, maxLengths.phone);
  const requestText = cleanLongText(payload.request, maxLengths.request);
  const rawCategory = cleanText(payload.category, maxLengths.category);
  const rawUrgency = cleanText(payload.urgency, maxLengths.urgency);
  const rawContactPreference = cleanText(
    payload.contactPreference,
    maxLengths.contactPreference,
  );

  if (!name || !requestText) {
    return NextResponse.json(
      { message: "Please provide your name and prayer request." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ message: "Please provide a valid email." }, { status: 400 });
  }

  const category = allowedCategories.has(rawCategory) ? rawCategory : "Other";
  const urgency = allowedUrgencies.has(rawUrgency) ? rawUrgency : "normal";
  const contactPreference = allowedContactPreferences.has(rawContactPreference)
    ? rawContactPreference
    : "whatsapp";

  try {
    await writeClient.create({
      _type: "prayerRequest",
      status: "new",
      assignedTo: "Watchman Opanin Thomas",
      name,
      email,
      phone,
      category,
      request: requestText,
      urgency,
      contactPreference,
      confidential: Boolean(payload.confidential),
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      message: "Your prayer request has been received and sent to Watchman Opanin Thomas.",
    });
  } catch (error) {
    console.error("Failed to create prayer request", error);
    return NextResponse.json(
      { message: "We could not submit your prayer request right now." },
      { status: 500 },
    );
  }
}
