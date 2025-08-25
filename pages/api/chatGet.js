import db from "../../lib/db";

export default async function handler(req, res) {
  const { chat_cookie_id } = req.query;

  // if (!chat_cookie_id) {
  //   return res.status(400).json({ error: "chat_cookie_id is required" });
  // }

  try {
    let sql = "SELECT * FROM chat_messages";
    let params = [];

    if (req.query.chat_cookie_id) {
      sql += " WHERE chat_cookie_id = ? ORDER BY chat_created_at ASC";
      params = [req.query.chat_cookie_id];
    } else {
      sql += " ORDER BY chat_created_at ASC";
    }

    const [rows] = await db.execute(sql, params);
    res.status(200).json({ chats: rows });
  } catch (error) {
    console.error("DB Error:", error);
    res.status(500).json({ error: "DB error" });
  }
}
