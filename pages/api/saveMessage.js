// pages/api/saveMessage.js
import connection from "../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { chat_cookie_id, chat_role, chat_content } = req.body;

  try {
    await connection.execute(
      "INSERT INTO chat_messages (chat_cookie_id, chat_role, chat_content) VALUES (?, ?, ?)",
      [session_id, role, content]
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("DB Error:", error);
    res.status(500).json({ error: "Database insert failed" });
  }
}
