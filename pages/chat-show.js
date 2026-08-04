import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const PAGE_SIZE = 10;

export default function ChatGroups() {
  const [groups, setGroups] = useState({});
  const [sessionNumbers, setSessionNumbers] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();
  const { pass } = router.query;

  const correctPassword = "chatmonitor123";
  const authorized = pass === correctPassword;

  useEffect(() => {
    if (!authorized) return;

    const fetchChats = async () => {
      try {
        const response = await fetch(
          `/api/chatGet?page=${page}&limit=${PAGE_SIZE}`,
        );
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
        setSessionNumbers(data.sessionNumbers || {});
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
    const interval = setInterval(fetchChats, 3000);
    return () => clearInterval(interval);
  }, [authorized, page]);

  if (!authorized) {
    return (
      <div className="p-4 text-center text-red-600 font-semibold">
        Unauthorized access. Provide the correct password in the URL like this:{" "}
        <br />
        https://www.mazeda.net/chat-show?pass=mazedanetiscool!
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6 text-sm min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <div>
        {Object.entries(groups)
          .sort(
            ([, msgsA], [, msgsB]) =>
              new Date(msgsB[msgsB.length - 1].created_at) -
              new Date(msgsA[msgsA.length - 1].created_at),
          )
          .map(([sessionId, messages], idx) => (
            <div
              key={sessionId}
              className={`border mb-6 border-gray-800 rounded-2xl p-6 max-w-xl ${
                idx % 2 === 0 ? "bg-black" : "bg-neutral-800"
              }`}
            >
              <h2 className="font-bold mb-2 flex justify-between items-center">
                <span>Chat #{sessionNumbers[sessionId] ?? "?"}</span>
                <span className="text-xs text-gray-400">
                  {new Date(messages[0].created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  {new Date(messages[0].created_at).toLocaleDateString("en-GB")}
                </span>
              </h2>
              <div className="space-y-1">
                {messages.map((msg) => (
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
                    <div
                      className={`text-[10px] text-gray-500 mt-0.5 ${
                        msg.role === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      {new Date(msg.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>

      <div className="flex items-center gap-4 pb-6">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 rounded bg-gray-700 disabled:opacity-40"
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 rounded bg-gray-700 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
