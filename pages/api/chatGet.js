// pages/api/chatGet.js
import db from "../../lib/db";

const DEFAULT_PAGE_SIZE = 10;

export default async function handler(req, res) {
  const { chat_cookie_id, page = 1, limit = DEFAULT_PAGE_SIZE } = req.query;

  try {
    // ── Single-session view (ChatBubble widget) — unchanged ──────────
    if (chat_cookie_id) {
      const [rows] = await db.execute(
        "SELECT * FROM chat_messages WHERE chat_cookie_id = ? ORDER BY chat_id DESC LIMIT 10",
        [chat_cookie_id],
      );
      return res.status(200).json({ chats: rows });
    }

    // ── Paginated multi-session view (chat-show.js) ──────────────────
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const pageSize = Math.max(1, parseInt(limit, 10) || DEFAULT_PAGE_SIZE);
    const offset = (pageNum - 1) * pageSize;

    // Global creation order — powers stable "Chat #N" numbering across all pages
    const [allSessions] = await db.query(
      `SELECT chat_cookie_id, MIN(chat_id) AS first_chat_id
       FROM chat_messages
       GROUP BY chat_cookie_id
       ORDER BY first_chat_id ASC`,
    );
    const sessionNumbers = {};
    allSessions.forEach((s, idx) => {
      sessionNumbers[s.chat_cookie_id] = idx + 1;
    });

    const totalSessions = allSessions.length;
    const totalPages = Math.max(1, Math.ceil(totalSessions / pageSize));

    // This page's sessions, ranked by most recent activity
    const [pageSessions] = await db.query(
      `SELECT chat_cookie_id, MAX(chat_created_at) AS last_msg
       FROM chat_messages
       GROUP BY chat_cookie_id
       ORDER BY last_msg DESC
       LIMIT ? OFFSET ?`,
      [pageSize, offset],
    );

    if (pageSessions.length === 0) {
      return res.status(200).json({
        chats: [],
        sessionNumbers,
        page: pageNum,
        totalPages,
        totalSessions,
      });
    }

    const cookieIds = pageSessions.map((s) => s.chat_cookie_id);
    const [rows] = await db.query(
      `SELECT * FROM chat_messages WHERE chat_cookie_id IN (?) ORDER BY chat_created_at ASC`,
      [cookieIds],
    );

    res.status(200).json({
      chats: rows,
      sessionNumbers,
      page: pageNum,
      totalPages,
      totalSessions,
    });
  } catch (error) {
    console.error("DB Error:", error);
    res.status(500).json({ error: "DB error" });
  }
}
