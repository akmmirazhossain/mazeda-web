import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ChatGroups() {
  const [groups, setGroups] = useState({});
  const router = useRouter();
  const { pass } = router.query;

  const correctPassword = "chatmonitor123"; // change to your desired password
  const authorized = pass === correctPassword;

  useEffect(() => {
    if (!authorized) return;

    const fetchChats = async () => {
      try {
        const response = await fetch("/api/chatGet");
        const data = await response.json();
        const normalized = data.chats.map((r) => ({
          id: r.chat_id,
          session_id: r.chat_cookie_id,
          role: r.chat_role,
          content: r.chat_content,
          created_at: r.chat_created_at,
        }));

        const grouped = normalized.reduce((acc, chat) => {
          if (!acc[chat.session_id]) acc[chat.session_id] = [];
          acc[chat.session_id].push(chat);
          return acc;
        }, {});

        setGroups(grouped);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
    // Poll every 5 seconds
    const interval = setInterval(fetchChats, 3000);

    return () => clearInterval(interval); // Clean up on unmount
  }, [authorized]);

  if (!authorized) {
    return (
      <div className="p-4 text-center text-red-600 font-semibold">
        Unauthorized access. Provide the correct password in the URL like this:{" "}
        <br />
        https://www.mazedanetworks.net/chat-show?pass=mazedanetiscool!
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6 text-sm min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div>
        {Object.entries(groups)
          .sort(
            // Sort sessions by the latest message's created_at timestamp, DESC
            ([, msgsA], [, msgsB]) =>
              new Date(msgsB[msgsB.length - 1].created_at) -
              new Date(msgsA[msgsA.length - 1].created_at)
          )
          .map(([sessionId, messages]) => (
            <div
              key={sessionId}
              className="border mb-6 border-gray-800 rounded-2xl p-6 max-w-xl bg-black"
            >
              <h2 className="font-bold mb-2 flex justify-between items-center">
                <span>Chat Session: {sessionId}</span>
                <span className="text-xs text-gray-400">
                  {new Date(messages[0].created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  {new Date(messages[0].created_at).toLocaleDateString("en-GB")}
                </span>
              </h2>
              <div className="space-y-1">
                {[...messages].reverse().map((msg) => (
                  <div
                    key={msg.id}
                    className={msg.role === "user" ? "text-right" : "text-left"}
                  >
                    <div
                      className={`inline-block rounded px-3 py-1 ${
                        msg.role === "user"
                          ? "green_gradient text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                      dangerouslySetInnerHTML={{ __html: msg.content }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
