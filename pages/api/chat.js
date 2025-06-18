// pages/api/chat.js

import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey:
    "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", // Set this in your .env.local file
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-nano",
      messages,
    });

    const reply = completion.choices[0]?.message?.content || "";

    res.status(200).json({ reply });
  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
}
