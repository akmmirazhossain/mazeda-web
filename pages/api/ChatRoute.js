// mazeda-web/pages/api/ChatRoute.js
import connection from "../../lib/db";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

// ─────────────────────────────────────────────
// Module-level caches (live for the lifetime of
// the Node process, refreshed every 5 minutes)
// ─────────────────────────────────────────────
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

let cachedDbCategories = null; // { always: "...", packages: "...", payment: "...", ... }
let dbCacheExpiresAt = 0;

let cachedPackagesBlock = null;
let cachedCoverageBlock = null;
let strapiCacheExpiresAt = 0;

// How many most-recent chat turns to forward to Claude.
const MAX_HISTORY_MESSAGES = 10;

// ─────────────────────────────────────────────
// Keyword gates — only pull in a context block if the
// latest user message plausibly needs it.
// ─────────────────────────────────────────────
const PACKAGE_KEYWORDS = /package|price|speed|mbps|plan|cost|৳|bdt/i;
const COVERAGE_KEYWORDS = /coverage|area|location|available in|district|near/i;
const PAYMENT_KEYWORDS =
  /pay|bill|bkash|nagad|payment|portal|ssl|subscriber id|customer id/i;
const FEATURES_KEYWORDS =
  /feature|ipv6|fiber|bdix|contention|why mazeda|benefit/i;
const CONTACT_KEYWORDS = /address|email|facebook|office/i;
const FTP_KEYWORDS = /ftp|movie server|torrent server/i;

/**
 * Fetches all ai_chat_context rows once, grouped by category.
 * Cached in-process for CACHE_TTL_MS so we don't hit MySQL on every message.
 */
async function getDbCategories() {
  const now = Date.now();
  if (cachedDbCategories && now < dbCacheExpiresAt) {
    return cachedDbCategories;
  }

  const [rows] = await connection.query(
    "SELECT ai_chat_con_content, category FROM ai_chat_context",
  );

  const grouped = {};
  for (const row of rows) {
    const cat = row.category || "always";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(row.ai_chat_con_content);
  }

  const joined = {};
  for (const cat in grouped) {
    joined[cat] = grouped[cat].join("\n\n");
  }

  cachedDbCategories = joined;
  dbCacheExpiresAt = now + CACHE_TTL_MS;

  return joined;
}

/**
 * Builds packages + coverage blocks from Strapi (live data),
 * cached separately from the DB categories above.
 */
async function buildStrapiContext() {
  const now = Date.now();
  if (
    cachedPackagesBlock &&
    cachedCoverageBlock &&
    now < strapiCacheExpiresAt
  ) {
    return {
      packagesBlock: cachedPackagesBlock,
      coverageBlock: cachedCoverageBlock,
    };
  }

  // ── Packages ──
  const pkgRes = await fetch(
    `${STRAPI_URL}/api/package-categories?locale=en&sort=order:asc` +
      `&populate[packages][sort]=order:asc` +
      `&fields[0]=name&fields[1]=order` +
      `&populate[packages][fields][0]=name` +
      `&populate[packages][fields][1]=speed` +
      `&populate[packages][fields][2]=price` +
      `&populate[packages][fields][3]=is_popular` +
      `&populate[packages][fields][4]=call_for_price`,
  );
  const pkgJson = await pkgRes.json();
  const categories = pkgJson.data || [];

  const packageLines = categories.map((category) => {
    const lines = (category.packages || []).map((p) => {
      const price = p.call_for_price ? "Call for Price" : p.price;
      const popularBadge = p.is_popular ? " [POPULAR]" : "";
      return `    - ${p.name}${popularBadge}: ${p.speed} Mbps — ${price}`;
    });
    return `  ${category.name}:\n${lines.join("\n")}`;
  });

  const packagesBlock = `
## Current Internet Packages (always use these prices, never use hardcoded values):
${packageLines.join("\n\n")}
All prices include VAT.
`.trim();

  // ── Coverage ──
  const covRes = await fetch(
    `${STRAPI_URL}/api/coverage?locale=en` +
      `&populate[districts][populate][0]=district_rel_area` +
      `&populate[districts][fields][0]=district_name` +
      `&populate[districts][populate][district_rel_area][fields][0]=area_name` +
      `&populate[districts][populate][district_rel_area][fields][1]=region_tag`,
  );
  const covJson = await covRes.json();
  const districts = covJson.data?.districts || [];

  const coverageLines = districts.map((district) => {
    const areas = (district.district_rel_area || [])
      .map((a) =>
        a.region_tag ? `${a.area_name} (${a.region_tag})` : a.area_name,
      )
      .join(", ");
    return `  ${district.district_name}: ${areas || "—"}`;
  });

  const coverageBlock = `
## Current Service Coverage (always use this list, never use hardcoded values):
${coverageLines.join("\n")}
For exact up-to-date coverage, users can visit: https://www.mazeda.net/en/coverage
`.trim();

  cachedPackagesBlock = packagesBlock;
  cachedCoverageBlock = coverageBlock;
  strapiCacheExpiresAt = now + CACHE_TTL_MS;

  return { packagesBlock, coverageBlock };
}

// ─────────────────────────────────────────────
// Route Handler
// ─────────────────────────────────────────────
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { messages } = req.body;

    if (!messages?.length) {
      return res.status(400).json({ message: "No messages provided" });
    }

    // ── Cap history so tokens don't grow unbounded per session ──
    const trimmedMessages = messages.slice(-MAX_HISTORY_MESSAGES);
    const lastUserMessage = trimmedMessages[trimmedMessages.length - 1];
    const lastText = (lastUserMessage?.content || "").toLowerCase();

    // ── Layer 1: always-on behavioural instructions (own cache breakpoint) ──
    const dbCategories = await getDbCategories();
    const alwaysInstructions = dbCategories.always || "";

    // ── Layer 2: DB-backed conditional categories (own cache breakpoint) ──
    const neededDbCategories = [
      PACKAGE_KEYWORDS.test(lastText) && "packages",
      PAYMENT_KEYWORDS.test(lastText) && "payment",
      FEATURES_KEYWORDS.test(lastText) && "features",
      CONTACT_KEYWORDS.test(lastText) && "contact",
      FTP_KEYWORDS.test(lastText) && "ftp",
    ].filter(Boolean);

    const conditionalDbText = neededDbCategories
      .map((cat) => dbCategories[cat])
      .filter(Boolean)
      .join("\n\n");

    // ── Layer 3: live Strapi data (packages/coverage), own cache breakpoint ──
    const needsPackagesData = PACKAGE_KEYWORDS.test(lastText);
    const needsCoverageData = COVERAGE_KEYWORDS.test(lastText);

    let strapiText = "";
    if (needsPackagesData || needsCoverageData) {
      const { packagesBlock, coverageBlock } = await buildStrapiContext();
      if (needsPackagesData) strapiText += `\n\n${packagesBlock}`;
      if (needsCoverageData) strapiText += `\n\n${coverageBlock}`;
    }

    // ── Strip internal chat_cookie_id before sending to Claude ──
    const cleanMessages = trimmedMessages.map(({ role, content }) => ({
      role,
      content,
    }));

    // ── Build system blocks (each cache_control breakpoint caches
    //    everything up to and including that block) ──
    const systemBlocks = [
      {
        type: "text",
        text: alwaysInstructions,
        cache_control: { type: "ephemeral" },
      },
    ];

    if (conditionalDbText) {
      systemBlocks.push({
        type: "text",
        text: conditionalDbText,
        cache_control: { type: "ephemeral" },
      });
    }

    if (strapiText) {
      systemBlocks.push({
        type: "text",
        text: strapiText.trim(),
        cache_control: { type: "ephemeral" },
      });
    }

    // ── Call Claude ──
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        system: systemBlocks,
        messages: cleanMessages,
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error("Claude error:", response.status, errBody);
      return res
        .status(502)
        .json({ message: "AI service error. Please try again later." });
    }

    const data = await response.json();
    const aiMessage =
      data.content?.[0]?.text ||
      "Something went wrong, please contact Mazeda support directly. 09666 334455";

    // Uncomment while tuning cache hit rate:
    console.log("cache usage:", data.usage);

    // ── Persist to DB ──────────────────────────────────────
    const chatIdCookie = messages[0]?.chat_cookie_id ?? null;
    const lastFullUserMessage = messages[messages.length - 1];

    if (chatIdCookie && lastFullUserMessage) {
      await connection.query(
        "INSERT INTO chat_messages (chat_cookie_id, chat_role, chat_content) VALUES (?, ?, ?)",
        [chatIdCookie, lastFullUserMessage.role, lastFullUserMessage.content],
      );
      await connection.query(
        "INSERT INTO chat_messages (chat_cookie_id, chat_role, chat_content) VALUES (?, ?, ?)",
        [chatIdCookie, "assistant", aiMessage],
      );
    }

    return res.status(200).json({ message: aiMessage });
  } catch (err) {
    console.error("ChatRoute error:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
}
