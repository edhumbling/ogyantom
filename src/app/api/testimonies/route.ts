import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { writeClient } from "@/sanity/client";

type TestimonyPayload = {
  submissionKind?: unknown;
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  title?: unknown;
  highlight?: unknown;
  content?: unknown;
  videoTestimonyUrl?: unknown;
  website?: unknown;
};

type TestimonyImage = {
  _key: string;
  _type: "image";
  asset: {
    _type: "reference";
    _ref: string;
  };
  alt: string;
};

const maxLengths = {
  name: 90,
  email: 140,
  phone: 40,
  title: 120,
  highlight: 80,
  content: 4000,
  videoTestimonyUrl: 500,
};

const acceptedImageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const maxImageBytes = 5 * 1024 * 1024;
const maxImageCount = 3;

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

function cleanVideoUrl(value: unknown) {
  const rawUrl = cleanText(value, maxLengths.videoTestimonyUrl);

  if (!rawUrl) {
    return "";
  }

  try {
    const url = new URL(rawUrl);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return "";
    }
    return url.toString();
  } catch {
    return "";
  }
}

async function parseRequest(request: Request) {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    const payload: TestimonyPayload = {
      submissionKind: formData.get("submissionKind"),
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      title: formData.get("title"),
      highlight: formData.get("highlight"),
      content: formData.get("content"),
      videoTestimonyUrl: formData.get("videoTestimonyUrl"),
      website: formData.get("website"),
    };
    const images = formData
      .getAll("testimonyImages")
      .filter((value): value is File => value instanceof File && value.size > 0);

    return { payload, images };
  }

  const payload = (await request.json()) as TestimonyPayload;
  return { payload, images: [] };
}

async function uploadTestimonyImages(images: File[], title: string): Promise<TestimonyImage[]> {
  if (!writeClient || images.length === 0) {
    return [];
  }

  const uploadedImages: TestimonyImage[] = [];

  for (const [index, image] of images.entries()) {
    const buffer = Buffer.from(await image.arrayBuffer());
    const asset = await writeClient.assets.upload("image", buffer, {
      contentType: image.type,
      filename: image.name || `testimony-picture-${index + 1}`,
    });

    uploadedImages.push({
      _key: randomUUID(),
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
      alt: `${title} testimony picture ${index + 1}`,
    });
  }

  return uploadedImages;
}

export async function POST(request: Request) {
  if (!writeClient) {
    return NextResponse.json(
      { message: "Testimony submission is not configured yet." },
      { status: 503 },
    );
  }

  let payload: TestimonyPayload;
  let images: File[] = [];

  try {
    const parsedRequest = await parseRequest(request);
    payload = parsedRequest.payload;
    images = parsedRequest.images;
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
  const submissionKind = cleanText(payload.submissionKind, 20);
  const videoTestimonyUrl = cleanVideoUrl(payload.videoTestimonyUrl);
  const isVideoSubmission = submissionKind === "video";

  if (!name || !title || !content) {
    return NextResponse.json(
      { message: "Please provide your name, testimony title, and testimony." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ message: "Please provide a valid email." }, { status: 400 });
  }

  if (isVideoSubmission && !videoTestimonyUrl) {
    return NextResponse.json(
      { message: "Please provide a valid public video testimony link." },
      { status: 400 },
    );
  }

  if (images.length > maxImageCount) {
    return NextResponse.json(
      { message: "Please attach no more than three testimony pictures." },
      { status: 400 },
    );
  }

  for (const image of images) {
    if (!acceptedImageTypes.has(image.type)) {
      return NextResponse.json(
        { message: "Please attach JPEG, PNG, or WebP testimony pictures only." },
        { status: 400 },
      );
    }

    if (image.size > maxImageBytes) {
      return NextResponse.json(
        { message: "Each testimony picture must be 5 MB or smaller." },
        { status: 400 },
      );
    }
  }

  try {
    const testimonyImages = await uploadTestimonyImages(images, title);

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
      testimonyFormat: isVideoSubmission ? "video" : "written",
      ...(videoTestimonyUrl ? { videoTestimonyUrl } : {}),
      ...(testimonyImages.length > 0 ? { testimonyImages } : {}),
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
