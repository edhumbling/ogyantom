import { writeClient, client } from "@/sanity/client";
import {
  buildDailyDevotionalBody,
  slugify,
  type GeneratedDailyDevotional,
} from "@/lib/dailyDevotionalContent";
import {
  firstDailyDevotional,
  firstGeneratedDailyDevotional,
} from "@/lib/dailyDevotionalSeed";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const CO_AUTHOR = "Watchman Opanin Thomas";
const maxAttempts = 3;
const uniquenessHistoryLimit = 90;

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

type DailyDevotionalUniquenessRecord = {
  _id: string;
  title?: string;
  devotionalDate?: string;
  theme?: string;
  scripture?: string;
  excerpt?: string;
  shareLine?: string;
};

type DailyDevotionalUniquenessContext = {
  date: string;
  records: DailyDevotionalUniquenessRecord[];
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

const uniquenessStopWords = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "god",
  "his",
  "in",
  "into",
  "is",
  "it",
  "lord",
  "of",
  "on",
  "or",
  "our",
  "the",
  "this",
  "to",
  "today",
  "watch",
  "with",
  "your",
]);

function normalizeForComparison(value?: string) {
  return (value || "")
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9\s]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function significantWords(value?: string) {
  return normalizeForComparison(value)
    .split(" ")
    .filter((word) => word.length > 2 && !uniquenessStopWords.has(word));
}

function wordSet(value?: string) {
  return new Set(significantWords(value));
}

function jaccardSimilarity(left?: string, right?: string) {
  const leftWords = wordSet(left);
  const rightWords = wordSet(right);

  if (!leftWords.size || !rightWords.size) return 0;

  let shared = 0;
  leftWords.forEach((word) => {
    if (rightWords.has(word)) shared += 1;
  });

  return shared / (leftWords.size + rightWords.size - shared);
}

function startsWithSameSignificantPhrase(left?: string, right?: string) {
  const leftWords = significantWords(left).slice(0, 2);
  const rightWords = significantWords(right).slice(0, 2);

  if (leftWords.length < 2 || rightWords.length < 2) return false;

  return leftWords[0] === rightWords[0] && leftWords[1] === rightWords[1];
}

function createUniquenessContext(
  date: string,
  records: DailyDevotionalUniquenessRecord[],
): DailyDevotionalUniquenessContext {
  const seededRecord: DailyDevotionalUniquenessRecord = {
    _id: firstDailyDevotional._id,
    title: firstDailyDevotional.title,
    devotionalDate: firstDailyDevotional.devotionalDate,
    theme: firstDailyDevotional.theme,
    scripture: firstDailyDevotional.scripture,
    excerpt: firstDailyDevotional.excerpt,
    shareLine: firstDailyDevotional.shareLine,
  };
  const unique = new Map<string, DailyDevotionalUniquenessRecord>();

  [...records, seededRecord]
    .filter((record) => record.devotionalDate !== date)
    .forEach((record) => {
      unique.set(record._id || `${record.devotionalDate}-${record.title}`, record);
    });

  return { date, records: Array.from(unique.values()) };
}

function summarizeUniquenessContext(context: DailyDevotionalUniquenessContext) {
  if (!context.records.length) {
    return "No previous Daily Fire records are available. Still avoid generic titles such as Mercy for Today's Watch, Grace for the Watch, Faith for Today, Strength for the Day, or Prayer for the Morning.";
  }

  return context.records
    .slice(0, uniquenessHistoryLimit)
    .map((record, index) =>
      [
        `${index + 1}.`,
        record.devotionalDate || "undated",
        `title="${record.title || "Untitled"}"`,
        record.theme ? `theme="${record.theme}"` : "",
        record.scripture ? `scripture="${record.scripture}"` : "",
      ]
        .filter(Boolean)
        .join(" "),
    )
    .join("\n");
}

function validateDevotionalUniqueness(
  devotional: GeneratedDailyDevotional,
  context: DailyDevotionalUniquenessContext,
) {
  const titleWords = significantWords(devotional.title);

  if (titleWords.length < 3) {
    return "Title must have at least three significant words so it is specific.";
  }

  const genericTitle = /^(grace|mercy|faith|hope|strength|power|prayer|peace|fire)\s+for\s+/i.test(
    devotional.title,
  );

  if (genericTitle) {
    return "Title starts with a generic Daily Fire pattern.";
  }

  for (const record of context.records) {
    if (!record.title && !record.theme && !record.scripture) continue;

    if (record.scripture && record.scripture === devotional.scripture) {
      return `Scripture repeats ${record.scripture} from ${record.devotionalDate || "a previous entry"}.`;
    }

    if (startsWithSameSignificantPhrase(devotional.title, record.title)) {
      return `Title starts like previous heading "${record.title}".`;
    }

    if (jaccardSimilarity(devotional.title, record.title) >= 0.28) {
      return `Title is too similar to previous heading "${record.title}".`;
    }

    if (jaccardSimilarity(devotional.theme, record.theme) >= 0.22) {
      return `Theme is too similar to previous theme "${record.theme}".`;
    }

    if (jaccardSimilarity(devotional.excerpt, record.excerpt) >= 0.2) {
      return `Excerpt is too similar to previous excerpt from ${record.devotionalDate || "a previous entry"}.`;
    }
  }

  return null;
}

function assertDevotionalIsUnique(
  devotional: GeneratedDailyDevotional,
  context: DailyDevotionalUniquenessContext,
) {
  const reason = validateDevotionalUniqueness(devotional, context);

  if (reason) {
    throw new Error(`Generated devotional failed uniqueness rule: ${reason}`);
  }
}

function buildPrompt(date: string, context: DailyDevotionalUniquenessContext) {
  const previousDevotionals = summarizeUniquenessContext(context);

  return [
    {
      role: "system",
      content:
        "You generate original Christian daily devotionals for Ogya Ntom Prayer Army. Write in a warm, Scripture-centered, pastoral voice. Do not imitate any living author exactly. Every devotional must be materially unique from previous Daily Fire entries. Return only valid JSON.",
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

Strict uniqueness rules:
- Do not reuse, lightly reword, rhyme with, or closely echo any previous title, title opening, theme, scripture, excerpt, image, watch angle, or core topic below.
- Do not start the title with generic patterns such as "Grace for...", "Mercy for...", "Faith for...", "Strength for...", "Prayer for...", "Hope for...", or "Fire for...".
- Use a fresh Bible passage not listed below.
- Choose a precise spiritual angle with a different practical situation, emotional register, and application from previous entries.
- If your first idea feels related to the list, abandon it and choose a more specific uncommon angle.

Previous Daily Fire entries to avoid:
${previousDevotionals}

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
  context: DailyDevotionalUniquenessContext,
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

  assertDevotionalIsUnique(devotional, context);

  return devotional;
}

async function tryGroqModel(
  model: string,
  date: string,
  context: DailyDevotionalUniquenessContext,
) {
  if (!process.env.GROQ_API_KEY) {
    return null;
  }

  const devotional = await postChatCompletion(GROQ_API_URL, process.env.GROQ_API_KEY, {
    model,
    messages: buildPrompt(date, context),
    max_completion_tokens: 2200,
    temperature: 0.88,
    top_p: 0.96,
    response_format: { type: "json_object" },
  }, context);

  return { devotional, modelUsed: `groq:${model}` };
}

async function tryOpenRouterModels(
  date: string,
  context: DailyDevotionalUniquenessContext,
) {
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
      messages: buildPrompt(date, context),
      max_tokens: 2200,
      temperature: 0.88,
      top_p: 0.96,
      response_format: { type: "json_object" },
    },
    context,
    {
      "HTTP-Referer": SITE_URL,
      "X-Title": SITE_NAME,
    },
  );

  return { devotional, modelUsed: "openrouter:fallback-chain" };
}

const fallbackDevotionalIdeas = [
  {
    title: "Oil for the Hidden Assignment",
    theme: "God forms obedience in unseen places before public doors open.",
    scripture: "1 Samuel 16:13",
    scriptureText:
      "Then Samuel took the horn of oil, and anointed him in the midst of his brethren: and the Spirit of the LORD came upon David from that day forward.",
    excerpt:
      "Some assignments are prepared in quiet rooms before anyone recognizes them. Let the Spirit train your obedience where applause cannot reach.",
  },
  {
    title: "Wisdom at the Narrow Gate",
    theme: "Discernment helps believers choose the faithful path when options compete.",
    scripture: "Matthew 7:14",
    scriptureText:
      "Because strait is the gate, and narrow is the way, which leadeth unto life, and few there be that find it.",
    excerpt:
      "Not every open road carries life. Ask the Lord for a disciplined heart that can recognize the narrow way and walk it with peace.",
  },
  {
    title: "Courage Beside the Unfinished Wall",
    theme: "Holy perseverance keeps building when progress is visible but incomplete.",
    scripture: "Nehemiah 4:6",
    scriptureText:
      "So built we the wall; and all the wall was joined together unto the half thereof: for the people had a mind to work.",
    excerpt:
      "Half-built places can feel discouraging, yet they also prove that grace is already at work. Keep your hands steady before the Lord.",
  },
  {
    title: "Bread for the Obedient Journey",
    theme: "God supplies enough strength for the step He has actually given today.",
    scripture: "1 Kings 19:7",
    scriptureText:
      "And the angel of the LORD came again the second time, and touched him, and said, Arise and eat; because the journey is too great for thee.",
    excerpt:
      "The Lord does not shame tired servants. He feeds them, lifts them, and gives strength for the next obedient step.",
  },
  {
    title: "A Clean Heart Under Pressure",
    theme: "Pressure reveals the need for inward renewal more than outward performance.",
    scripture: "Psalm 51:10",
    scriptureText:
      "Create in me a clean heart, O God; and renew a right spirit within me.",
    excerpt:
      "When pressure rises, the deepest victory is not appearance but a renewed spirit. Invite God to cleanse what hurry has exposed.",
  },
  {
    title: "Light for the Next Turn",
    theme: "The Word gives enough direction for faithful movement without demanding full control.",
    scripture: "Psalm 119:105",
    scriptureText:
      "Thy word is a lamp unto my feet, and a light unto my path.",
    excerpt:
      "God may not reveal the whole road at once, but His Word gives light for the next turn. Walk in the light you have received.",
  },
  {
    title: "Quiet Strength Before Answering",
    theme: "Spirit-led restraint can protect peace, witness, and relationships.",
    scripture: "Proverbs 15:1",
    scriptureText:
      "A soft answer turneth away wrath: but grievous words stir up anger.",
    excerpt:
      "A restrained answer can be a spiritual weapon. Let the Holy Spirit govern your tone before emotion decides the atmosphere.",
  },
  {
    title: "Roots Deeper Than Delay",
    theme: "Waiting seasons can deepen trust instead of weakening expectation.",
    scripture: "Isaiah 40:31",
    scriptureText:
      "But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles.",
    excerpt:
      "Delay is not always denial. In the waiting place, the Lord can deepen roots that future fruit will need.",
  },
] satisfies Array<Pick<GeneratedDailyDevotional, "title" | "theme" | "scripture" | "scriptureText" | "excerpt">>;

function dateIndex(date: string, length: number) {
  const value = date.replace(/-/g, "");
  const numeric = Number.parseInt(value, 10);

  return Number.isFinite(numeric) ? numeric % length : 0;
}

function fallbackDevotional(
  date: string,
  context: DailyDevotionalUniquenessContext = createUniquenessContext(date, []),
): GeneratedDailyDevotional {
  if (date === "2026-05-04") {
    return firstGeneratedDailyDevotional;
  }

  const orderedIdeas = fallbackDevotionalIdeas
    .map((idea, index) => ({
      idea,
      score:
        (index -
          dateIndex(date, fallbackDevotionalIdeas.length) +
          fallbackDevotionalIdeas.length) %
        fallbackDevotionalIdeas.length,
    }))
    .sort((left, right) => left.score - right.score)
    .map(({ idea }) => idea);
  const idea =
    orderedIdeas.find(
      (candidate) =>
        !validateDevotionalUniqueness(
          {
            ...firstGeneratedDailyDevotional,
            ...candidate,
            reflectionParagraphs: firstGeneratedDailyDevotional.reflectionParagraphs,
            prayer: firstGeneratedDailyDevotional.prayer,
            actionSteps: firstGeneratedDailyDevotional.actionSteps,
            shareLine: `Share / 5 min read / ${candidate.title.split(" ").slice(0, 3).join(" ")}`,
            readTime: "5 min read",
          },
          context,
        ),
    ) || orderedIdeas[0];

  return {
    ...firstGeneratedDailyDevotional,
    ...idea,
    reflectionParagraphs: [
      `${idea.theme} The Lord does not waste the hidden details of a believer's day. He meets the heart in ordinary duties, uncertain conversations, and decisions that may look small to others but matter before Him.`,
      "Bring this matter into prayer before you try to master it by strength alone. The Father gives wisdom without confusion, correction without cruelty, and peace without pretending that responsibility is easy.",
      "Let the Scripture shape your response today. Do not rush past conviction, and do not turn waiting into despair. Grace trains the soul to obey with humility while trusting God with the outcome.",
      "Choose one faithful step and take it before the Lord. A day surrendered in prayer can become a place where character is strengthened, motives are purified, and hope learns to stand again.",
    ],
    prayer:
      "Father, guide my heart in this watch. Give me wisdom for the step before me, purity in my motives, courage to obey, and peace that rests in Your faithfulness. Let this day honor You in thought, word, and action. In Jesus' name, amen.",
    actionSteps: [
      "Pray over one specific decision before discussing it with anyone else.",
      `Read ${idea.scripture} slowly and write the phrase that corrects or steadies you.`,
      "Take one quiet act of obedience that does not need to be seen by others.",
    ],
    shareLine: `Share / 5 min read / ${idea.title.split(" ").slice(0, 3).join(" ")}`,
  };
}

async function generateDailyDevotional(date: string, context: DailyDevotionalUniquenessContext) {
  const failures: string[] = [];

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    for (const model of groqDevotionalModels) {
      try {
        const result = await tryGroqModel(model, date, context);

        if (result) {
          return { ...result, generationStatus: "aiGenerated" as const, failures };
        }
      } catch (error) {
        failures.push(`attempt ${attempt} groq ${model}: ${(error as Error).message}`);
      }
    }

    try {
      const result = await tryOpenRouterModels(date, context);

      if (result) {
        return { ...result, generationStatus: "aiGenerated" as const, failures };
      }
    } catch (error) {
      failures.push(`attempt ${attempt} openrouter: ${(error as Error).message}`);
    }
  }

  console.warn("Daily devotional AI generation fell back to deterministic content", failures);

  return {
    devotional: fallbackDevotional(date, context),
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

async function fetchUniquenessHistory(date: string) {
  if (!client) return createUniquenessContext(date, []);

  try {
    const records = await client.fetch<DailyDevotionalUniquenessRecord[]>(
      `*[_type == "dailyDevotional" && devotionalDate != $date] | order(devotionalDate desc, publishedAt desc)[0...${uniquenessHistoryLimit}] {
        _id,
        title,
        devotionalDate,
        theme,
        scripture,
        excerpt,
        shareLine
      }`,
      { date },
    );

    return createUniquenessContext(date, records);
  } catch (error) {
    console.error("Daily devotional uniqueness history fetch failed", error);
    return createUniquenessContext(date, []);
  }
}

export async function publishDailyDevotional(options: AutomationOptions = {}) {
  const date = normalizeDateKey(options.date);
  const id = `daily-devotional-${date}`;
  const existing = await findExisting(date);
  const uniquenessContext = await fetchUniquenessHistory(date);

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
      devotional: fallbackDevotional(date, uniquenessContext),
    } satisfies DailyDevotionalAutomationResult;
  }

  const generated = await generateDailyDevotional(date, uniquenessContext);
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
