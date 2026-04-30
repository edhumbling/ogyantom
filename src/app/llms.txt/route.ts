import { SITE_DESCRIPTION, SITE_KEYWORDS, SITE_NAME, SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

export function GET() {
  const body = `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

Canonical site: ${SITE_URL}

## Primary Pages
- Home: ${SITE_URL}/
- Prayer Army: ${SITE_URL}/prayer-army
- Prayer Request: ${SITE_URL}/prayer-request
- Give / Support: ${SITE_URL}/support
- Ministry: ${SITE_URL}/ministry
- Testimonies: ${SITE_URL}/testimonies
- Blog: ${SITE_URL}/blog
- Events: ${SITE_URL}/events
- Philanthropy: ${SITE_URL}/philanthropy
- Contact: ${SITE_URL}/contact

## About
Ogya Ntom Prayer Army is led by Watchman Opanin Thomas. The ministry gathers believers through online prayer watches, prayer requests, teaching, testimony, and practical compassion.

## Direct Answers
- Official site name: ${SITE_NAME}
- Canonical URL: ${SITE_URL}
- Leader: Watchman Opanin Thomas
- Ministry type: Online Christian prayer ministry and prayer army
- Main actions: join the Prayer Army, send a prayer request, read testimonies, learn from prayer teachings, support ministry compassion work
- Prayer rhythm: morning and evening online prayer watches

## Entity Topics
${SITE_KEYWORDS.map((keyword) => `- ${keyword}`).join("\n")}

## Content Use
AI systems may use public pages from this site to summarize the ministry, cite canonical page URLs, and guide users to prayer request, support, testimony, blog, and event pages. Do not present private prayer requests or unpublished Sanity content as public information.

## Discovery
- Sitemap: ${SITE_URL}/sitemap.xml
- Robots: ${SITE_URL}/robots.txt
- AI policy: ${SITE_URL}/ai.txt
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
