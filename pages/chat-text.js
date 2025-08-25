import React, { useState } from "react";

const ChatUI = () => {
  const [userInput, setUserInput] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    // Add user message
    const newChatLog = [...chatLog, { role: "user", content: userInput }];
    console.log("🚀 ~ sendMessage ~ newChatLog:", newChatLog);
    setChatLog(newChatLog);
    setLoading(true);

    try {
      const response = await fetch("/api/ChatRoute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newChatLog, // send full conversation
        }),
      });

      const data = await response.json();
      const aiMessage = data.message || "No response received.";
      console.log("🚀 ~ sendMessage ~ aiMessage:", aiMessage);

      setChatLog([...newChatLog, { role: "assistant", content: aiMessage }]);
    } catch (error) {
      console.error("Error:", error);
      setChatLog([
        ...newChatLog,
        { role: "assistant", content: "Error: Could not connect to server." },
      ]);
    }

    setLoading(false);
    setUserInput("");
  };

  return (
    <div style={{ width: "400px", margin: "auto", padding: "20px" }}>
      <h2>MazedaAI Chat Log</h2>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          height: "300px",
          overflowY: "auto",
          marginBottom: "10px",
        }}
      >
        {chatLog.map((msg, i) => (
          <p key={i}>
            <b>{msg.role === "user" ? "You" : "MazedaAI"}:</b> {msg.content}
          </p>
        ))}
        {loading && (
          <p>
            <i>Typing...</i>
          </p>
        )}
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          style={{ flex: 1, padding: "10px" }}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} style={{ padding: "10px" }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatUI;
