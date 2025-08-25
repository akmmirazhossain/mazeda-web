import connection from "../../lib/db";

export default async function handler(req, res) {
  try {
    const [rows] = await connection.query(
      "SELECT ai_chat_con_content FROM ai_chat_context"
    );
    const aiChatContext = rows.map((r) => r.ai_chat_con_content).join("\n\n");
    const { messages } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: aiChatContext,
          },
          ...messages,
        ],
      }),
    });

    const data = await response.json();

    const aiMessage =
      data.choices?.[0]?.message?.content ||
      "Something went wrong, please contact Mazeda support directly. 09666 334455";

    // Save last user message and AI response in DB
    const chatIdCookie = messages[0]?.chat_cookie_id || null;

    const lastUserMessage = messages[messages.length - 1];
    if (lastUserMessage && chatIdCookie) {
      // Save user message
      await connection.query(
        "INSERT INTO chat_messages (chat_cookie_id, chat_role, chat_content) VALUES (?, ?, ?)",
        [chatIdCookie, lastUserMessage.role, lastUserMessage.content]
      );

      // Save AI message
      await connection.query(
        "INSERT INTO chat_messages (chat_cookie_id, chat_role, chat_content) VALUES (?, ?, ?)",
        [chatIdCookie, "assistant", aiMessage]
      );
    }

    return res.status(200).json({ message: aiMessage });
  } catch (err) {
    console.error("API error backend:", err);
    return res.status(500).json({ message: "Error", error: String(err) });
  }
}
