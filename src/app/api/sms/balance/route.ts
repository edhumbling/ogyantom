import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const adminKey = process.env.SMS_ADMIN_KEY;
  const apiKey = process.env.ARKESEL_API_KEY;

  if (!adminKey || !apiKey) {
    return NextResponse.json(
      { message: "SMS service is not configured yet." },
      { status: 503 }
    );
  }

  const key = new URL(request.url).searchParams.get("key");
  if (key !== adminKey) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  let res: Response;
  try {
    res = await fetch(
      `https://sms.arkesel.com/sms/api?action=check-balance&api_key=${encodeURIComponent(
        apiKey
      )}&response=json`
    );
  } catch {
    return NextResponse.json(
      { message: "Could not reach Arkesel." },
      { status: 502 }
    );
  }

  const data = await res.json().catch(() => null);
  return NextResponse.json({ balance: data });
}
