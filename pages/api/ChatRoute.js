// mazeda-web/pages/api/ChatRoute.js
import connection from "../../lib/db";

// ─────────────────────────────────────────────
// Module-level cache (lives for the lifetime of
// the Node process, refreshed every 5 minutes)
// ─────────────────────────────────────────────
let cachedDynamicContext = null;
let cacheExpiresAt = 0;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Strips all HTML tags from a string.
 * Used to clean package_features before sending to AI.
 */

/**
 * Builds a lean plain-text block with live data from:
 *   - packages  (name, speed, price)
 *   - regions   (joined with coverage areas)
 *
 * NOTE FOR DB ADMIN:
 *   Remove all hardcoded package and coverage info from
 *   the `ai_chat_context` table. Keep only behavioural
 *   instructions, tone rules, payment info, and contact
 *   numbers there. This function now owns that data.
 */
async function buildDynamicContext() {
  const now = Date.now();
  if (cachedDynamicContext && now < cacheExpiresAt) {
    return cachedDynamicContext;
  }

  // ── Packages ──────────────────────────────────────────
  const [packageRows] = await connection.query(`
  SELECT package_name_en, package_speed_en, package_price_en, package_group
  FROM packages
  ORDER BY package_group, package_id
`);

  // Group packages by their package_group

  const groupMap = new Map();
  for (const p of packageRows) {
    const group = p.package_group;
    if (!groupMap.has(group)) groupMap.set(group, []);

    const price =
      p.package_price_en?.trim() === "(Call for Price)"
        ? "Call for Price"
        : p.package_price_en?.trim();

    const popularBadge = p.package_popular == 1 ? " [POPULAR]" : "";

    groupMap
      .get(group)
      .push(
        `    - ${p.package_name_en}${popularBadge}: ${p.package_speed_en} Mbps — ${price}`,
      );
  }

  const packageLines = [];
  for (const [group, lines] of groupMap) {
    const groupLabel = group.charAt(0).toUpperCase() + group.slice(1); // e.g. "Basic"
    packageLines.push(`  ${groupLabel}:\n${lines.join("\n")}`);
  }

  const packagesBlock = `
## Current Internet Packages (always use these prices, never use hardcoded values):
${packageLines.join("\n\n")}
All prices include VAT.
`.trim();

  // ── Coverage (regions + areas) ─────────────────────────
  const [coverageRows] = await connection.query(`
    SELECT r.regions_name_en, c.coverage_area_en
    FROM regions r
    LEFT JOIN coverage c ON c.coverage_region_id = r.regions_id
    ORDER BY r.regions_serial
  `);

  // Group coverage areas under their region
  const regionMap = new Map();
  for (const row of coverageRows) {
    const region = row.regions_name_en;
    if (!regionMap.has(region)) regionMap.set(region, []);
    if (row.coverage_area_en) {
      regionMap.get(region).push(row.coverage_area_en.trim());
    }
  }

  const coverageLines = [];
  for (const [region, areas] of regionMap) {
    coverageLines.push(`  ${region}: ${areas.join(", ") || "—"}`);
  }

  const coverageBlock = `
## Current Service Coverage (always use this list, never use hardcoded values):
${coverageLines.join("\n")}
For exact up-to-date coverage, users can visit: https://www.mazedanetworks.net/en/coverage
`.trim();

  cachedDynamicContext = `${packagesBlock}\n\n${coverageBlock}`;
  cacheExpiresAt = now + CACHE_TTL_MS;

  return cachedDynamicContext;
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

    // ── Build system prompt ────────────────────────────────
    // Layer 1: Behavioural instructions from DB
    const [rows] = await connection.query(
      "SELECT ai_chat_con_content FROM ai_chat_context",
    );
    const behaviourInstructions = rows
      .map((r) => r.ai_chat_con_content)
      .join("\n\n");

    // Layer 2: Live packages + coverage data
    const dynamicContext = await buildDynamicContext();

    const systemPrompt = `${behaviourInstructions}\n\n${dynamicContext}`;

    // ── Strip internal chat_cookie_id before sending to OpenAI ──
    // We attach it to messages on the client for our own DB use,
    // but OpenAI doesn't need it and it wastes tokens.
    const cleanMessages = messages.map(({ role, content }) => ({
      role,
      content,
    }));

    // ── Call OpenAI ────────────────────────────────────────
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [{ role: "system", content: systemPrompt }, ...cleanMessages],
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error("OpenAI error:", response.status, errBody);
      return res
        .status(502)
        .json({ message: "AI service error. Please try again later." });
    }

    const data = await response.json();
    const aiMessage =
      data.choices?.[0]?.message?.content ||
      "Something went wrong, please contact Mazeda support directly. 09666 334455";

    // ── Persist to DB ──────────────────────────────────────
    const chatIdCookie = messages[0]?.chat_cookie_id ?? null;
    const lastUserMessage = messages[messages.length - 1];

    if (chatIdCookie && lastUserMessage) {
      await connection.query(
        "INSERT INTO chat_messages (chat_cookie_id, chat_role, chat_content) VALUES (?, ?, ?)",
        [chatIdCookie, lastUserMessage.role, lastUserMessage.content],
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
