import React, { useState, useEffect, useRef } from "react";
import { Button, Textarea, Tooltip } from "@nextui-org/react";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { nanoid } from "nanoid";

const ChatBubble = () => {
  const [showChat, setShowChat] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [chatLog, setChatLog] = useState([]);

  const showChatWindow = async () => {
    setShowChat(true);
    const chatIdCookie = Cookies.get("mazeda_chat_id");
    await fetchChatLog(chatIdCookie);
  };

  //SHOW TOOLTIP ON CHAT
  useEffect(() => {
    // Get how many times tooltip has been shown
    const shownCount = parseInt(
      localStorage.getItem("tooltipShown") || "0",
      10
    );

    if (shownCount >= 5) return; // Don't show anymore if shown 3+ times

    // Show tooltip after 2 seconds
    const showTimer = setTimeout(() => setShowTooltip(true), 4000);

    // Hide tooltip after 5 seconds total
    const hideTimer = setTimeout(() => setShowTooltip(false), 10000);

    // Update shown count
    localStorage.setItem("tooltipShown", shownCount + 1);

    // Cleanup
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  // Add this function inside your component
  const fetchChatLog = async (chatIdCookie) => {
    if (chatIdCookie) {
      console.log("🚀 ~ fetchChatLog ~ chatIdCookie:", chatIdCookie);
      try {
        const res = await fetch(`/api/chatGet?chat_cookie_id=${chatIdCookie}`);
        const data = await res.json();

        if (!data.chats || data.chats.length === 0) {
          // If no chats found, show first message
          setChatLog([
            {
              role: "assistant",
              content: "Hi, I’m MazedaAI. How can I assist you today?",
            },
          ]);
        } else {
          // If chats exist, map them
          setChatLog(
            data.chats
              .map((c) => ({
                role: c.chat_role,
                content: c.chat_content,
              }))
              .reverse()
          );
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    } else {
      const chatId = nanoid(12);
      Cookies.set("mazeda_chat_id", chatId, { expires: 30 });
      console.log("New chat ID created:", chatId);

      // SHOW FIRST MESSAGE
      setChatLog([
        {
          role: "assistant",
          content: "হ্যালো আমি MazedaAI, কিভাবে আপনাকে সাহায্য করতে পারি?",
        },
      ]);
    }
  };

  //AUTO RRFRESH CHAT
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === "visible") {
        const chatIdCookie = Cookies.get("mazeda_chat_id");
        await fetchChatLog(chatIdCookie);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // AUTO SCROLL
  const chatboxRef = useRef(null);
  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [chatLog, showChat]);

  const [userInput, setUserInput] = useState("");

  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!userInput.trim()) return;
    setUserInput("");
    const chatIdCookie = Cookies.get("mazeda_chat_id");
    // Add user message
    const newChatLog = [...chatLog, { role: "user", content: userInput }];
    // console.log("🚀 ~ sendMessage ~ newChatLog:", newChatLog);
    setChatLog(newChatLog);
    setLoading(true);

    try {
      const response = await fetch("/api/ChatRoute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newChatLog.map((msg) => ({
            ...msg,
            chat_cookie_id: chatIdCookie, // ✅ Attach chatId to every message
          })),
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
  };

  // const sendMessage = async () => {
  //   if (!input.trim()) return;

  //   const userMessage = { role: "user", content: input };
  //   setMessages((prev) => [...prev, userMessage]);
  //   setInput("");
  //   setLoading(true);

  //   try {
  //     const chatIdCookie = Cookies.get("mazeda_chat_id");

  //     // Send as array of messages like backend expects
  //     const res = await fetch("/api/ChatRoute", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         messages: [...messages, userMessage].map((m) => ({
  //           ...m,
  //           //chat_cookie_id: chatIdCookie, // include cookie for DB if needed
  //         })),
  //       }),
  //     });

  //     const data = await res.json();

  //     console.log("🚀 ~ sendMessage ~ data:", data);

  //     setMessages((prev) => [
  //       ...prev,
  //       { role: "assistant", content: data.message },
  //     ]);
  //   } catch (err) {
  //     console.error("Error sending message:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Send Message
  // const sendMessage = () => {
  //   // if (!input.trim()) return;

  //   // //SET ROLE AS USER AND CONTEST AS INPUT
  //   // const userMessage = { role: "user", content: input }; // <-- declare it here
  //   // setInput("");
  //   // setLoading(true);

  //   // // Add user message + loading bubble
  //   // setMessages((prev) => [
  //   //   ...prev,
  //   //   userMessage,
  //   //   { role: "assistant", content: "__loading__" },
  //   // ]);

  //   // fetch("/api/ChatRoute", {
  //   //   method: "POST",
  //   //   headers: { "Content-Type": "application/json" },
  //   //   body: JSON.stringify({ messages: [...messages, userMessage] }),
  //   // })
  //   //   .then((res) => res.json())
  //   //   .then((data) => {
  //   //     const reply = data.message || "No response";

  //   //     setMessages((prev) => {
  //   //       const newMessages = [...prev];

  //   //       const loadingIndex = newMessages.findIndex(
  //   //         (m) => m.content === "__loading__"
  //   //       );
  //   //       if (loadingIndex !== -1) {
  //   //         newMessages[loadingIndex] = { role: "assistant", content: reply };
  //   //       }

  //   //       // ✅ Update cookie immediately after setting new message
  //   //       const oneHour = new Date(new Date().getTime() + 60 * 60 * 1000);
  //   //       Cookies.set("mazeda_chat", JSON.stringify(newMessages), {
  //   //         expires: oneHour,
  //   //       });

  //   //       return newMessages;
  //   //     });

  //   //     // Assistant reply SAVE IN DB
  //   //     fetch("/api/saveMessage", {
  //   //       method: "POST",
  //   //       headers: { "Content-Type": "application/json" },
  //   //       body: JSON.stringify({
  //   //         session_id: sessionId,
  //   //         role: "assistant",
  //   //         content: reply,
  //   //       }),
  //   //     });
  //   //   })
  //   //   .catch(() => {
  //   //     setMessages((prev) => {
  //   //       const newMessages = [...prev];
  //   //       const loadingIndex = newMessages.findIndex(
  //   //         (m) => m.content === "__loading__"
  //   //       );
  //   //       if (loadingIndex !== -1)
  //   //         newMessages[loadingIndex] = {
  //   //           role: "assistant",
  //   //           content: "Error getting response",
  //   //         };
  //   //       return newMessages;
  //   //     });
  //   //   })
  //   //   .finally(() => setLoading(false));

  //   // //SAVE IN DB FOR USER
  //   // fetch("/api/saveMessage", {
  //   //   method: "POST",
  //   //   headers: { "Content-Type": "application/json" },
  //   //   body: JSON.stringify({
  //   //     session_id: sessionId,
  //   //     role: "user",
  //   //     content: input,
  //   //   }),
  //   // });
  // };

  return (
    <>
      {/* Floating Open Button */}
      {!showChat && (
        <div className="fixed bottom-4 right-4 z-50">
          <div
            className={`relative bg-white text-black p-2 rounded-2xl shadow-md text-sm transition-opacity duration-500 mb-2 ${
              showTooltip ? "opacity-100" : "opacity-0"
            }`}
          >
            যেকোনো তথ্য জানতে
            <br />
            আমার সাথে চ্যাট করুন!
            {/* Arrow */}
            <div className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45 shadow-xl"></div>
          </div>

          <Button
            onClick={() => showChatWindow(true)}
            size="sm"
            className=" green_gradient text-sm hover:red_gradient  text-white rounded-full shadow-lg flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              fill="currentColor"
            >
              <path d="m240-240-92 92q-19 19-43.5 8.5T80-177v-623q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240Zm40-160h240q17 0 28.5-11.5T560-440q0-17-11.5-28.5T520-480H280q-17 0-28.5 11.5T240-440q0 17 11.5 28.5T280-400Zm0-120h400q17 0 28.5-11.5T720-560q0-17-11.5-28.5T680-600H280q-17 0-28.5 11.5T240-560q0 17 11.5 28.5T280-520Zm0-120h400q17 0 28.5-11.5T720-680q0-17-11.5-28.5T680-720H280q-17 0-28.5 11.5T240-680q0 17 11.5 28.5T280-640Z" />
            </svg>
            MazedaAI Chat
          </Button>
          {/* <Tooltip
            content={
              <span
                dangerouslySetInnerHTML={{
                  __html: "যেকোনো তথ্য জানতে<br />আমার সাথে চ্যাট করুন!<br />",
                }}
              />
            }
            showArrow={true}
            isOpen={showTooltip}
            position="fixed"
          ></Tooltip> */}
        </div>
      )}

      {/* Floating Chat Window */}
      {showChat && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed z-50 text-sm bottom-16 right-4 w-96  bg-white shadow-lg rounded-lg flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-3 green_gradient text-white flex justify-between items-center">
            <span className="font-semibold">MazedaAI</span>
            <button
              onClick={() => setShowChat(false)}
              className="text-gray-200 hover:text-white w-10 flex justify-end"
            >
              ✕
            </button>
          </div>

          {/* Chat Messages */}
          <div
            ref={chatboxRef}
            className="p-4 h-96 overflow-y-auto space-y-2 hide-scrollbar"
          >
            {chatLog.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-2 ${
                  msg.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block rounded-lg py-2 px-4 ${
                    msg.role === "user"
                      ? "green_gradient text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <span dangerouslySetInnerHTML={{ __html: msg.content }} />
                </div>
              </div>
            ))}

            {/* Spinner for upcoming assistant reply */}
            {loading && (
              <div className="mb-2 text-left">
                <div className="inline-block rounded-lg py-2 px-4 bg-gray-200 text-gray-800">
                  <span className="loading loading-dots loading-xs"></span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t flex">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 border rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#03738c]"
              style={{ fontSize: "16px" }}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className={`${
                loading
                  ? "bg-gray-400"
                  : "green_gradient hover:red_gradient  text-white px-4 py-2 rounded-r-md"
              } text-white px-4 py-2 rounded-r-md transition`}
            >
              Send
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default ChatBubble;
