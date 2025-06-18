import { useState } from "react";

export default function Home() {
  const [reply, setReply] = useState("");

  const handleClick = async () => {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: "Who is the founder of Grameen Bank?" },
        ],
      }),
    });

    const data = await res.json();
    setReply(data.reply || "No reply");
  };

  return (
    <div style={{ padding: 20 }}>
      <button onClick={handleClick}>Ask ChatGPT</button>
      <p>
        <strong>Reply:</strong> {reply}
      </p>
    </div>
  );
}
