import { revalidatePath } from "next/cache";
import { publishDailyDevotional } from "@/lib/dailyDevotionalAutomation";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

function isAuthorized(request: Request) {
  const authHeader = request.headers.get("authorization");
  return Boolean(process.env.CRON_SECRET && authHeader === `Bearer ${process.env.CRON_SECRET}`);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const dryRun = url.searchParams.get("dryRun") === "1";
  const force = url.searchParams.get("force") === "1";
  const date = url.searchParams.get("date") || undefined;
  const allowLocalDryRun = dryRun && process.env.NODE_ENV !== "production";

  if (!isAuthorized(request) && !allowLocalDryRun) {
    return Response.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await publishDailyDevotional({ date, dryRun, force });

    if (!result.dryRun && !result.skipped) {
      revalidatePath("/Daily-Devotionals");
      revalidatePath(`/Daily-Devotionals/${result.slug}`);
      revalidatePath("/sitemap.xml");
      revalidatePath("/sitemap");
    }

    return Response.json(result);
  } catch (error) {
    return Response.json(
      {
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : "Daily devotional automation failed.",
      },
      { status: 500 },
    );
  }
}
