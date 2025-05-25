import React, { useState, useEffect } from "react";
import { Button, Textarea } from "@nextui-org/react";
import { motion } from "framer-motion";

const ChatBubble = () => {
  const [showChatWindow, setShowChatWindow] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "হ্যালো আমি MazedaAi, কিভাবে আপনাকে সাহায্য করতে পারি? ",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];

    console.log("Sending messages:", newMessages);

    setMessages(newMessages);
    setInput("");

    setLoading(true);
    setMessages([
      ...newMessages,
      { role: "assistant", content: "__loading__" },
    ]);

    fetch("/api/ChatRoute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: newMessages,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("🚀 AI RESPONSE FE:", data);
        const reply = data.message || "No response";

        setMessages((prev) => {
          // Replace the last message (the loading one)
          const updated = [
            ...prev.slice(0, -1),
            { role: "assistant", content: reply },
          ];
          return updated;
        });
      })
      .catch((err) => {
        console.error("API error frontend", err);
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { role: "assistant", content: "Error getting response" },
        ]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      {" "}
      {showChatWindow && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          // className="fixed bottom-0 right-0 max-w-96 flex flex-col justify-center  z-10"
          className="fixed bottom-4 right-4 max-w-96 flex flex-col justify-end bg-white  rounded-xl shadow-xl z-10 h-[500px] md:h-[600px] overflow-hidden"
        >
          <div className="flex justify-between items-center flex-row absolute top-0 px-4 py-2 rounded-xl  bg-gradient-to-b from-white/100 to-white/5  w-full  z-10 text-sm">
            <div className="w-1/5"></div>
            <div className="w-3/5 flex  items-center justify-center ">
              <div className="shadow-lg flex  items-center justify-center  rounded-full border px-2 py-0.5 bg-white gap-2">
                <img
                  src="/images/mazeda-ai.svg"
                  alt="Avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span>MazedaAi</span>
              </div>
            </div>

            <div className="w-1/5 flex justify-end ">
              {" "}
              <Button
                radius="full"
                isIconOnly
                onClick={() => setShowChatWindow(false)}
                className="text-gray-500  hover:text-red-500 flex items-center shadow-lg rounded-full border  bg-white "
              >
                {" "}
                ✕
              </Button>
            </div>
          </div>

          <div className="flex flex-col px-4 pb-4 ">
            <div className="flex-1 overflow-y-auto overflow-x-clip mb-4 flex flex-col-reverse space-y-2 space-y-reverse h-[500px] md:h-[500px] px-4">
              {[...messages].reverse().map((msg, idx) => (
                <div
                  key={idx}
                  className={`chat ${
                    msg.role === "user" ? "chat-end" : "chat-start"
                  }`}
                >
                  <div
                    className={`chat-bubble rounded-2xl ${
                      msg.role === "user" ? "bg_red " : "bg_green"
                    }`}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          msg.content === "__loading__"
                            ? '<span class="loading loading-dots loading-xs"></span>'
                            : msg.content,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between gap-2">
              <Textarea
                className="max-w-xs"
                placeholder="Type your message..."
                onChange={(e) => setInput(e.target.value)}
                value={input}
                onKeyDown={handleKeyDown}
                minRows={1}
              />

              <Button
                radius="full"
                isIconOnly
                onClick={sendMessage}
                disabled={loading}
                className="text-gray-500 bg-white"
              >
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="28px"
                  viewBox="0 -960 960 960"
                  width="28px"
                  fill="#6b7280"
                >
                  <path d="M792-443 176-183q-20 8-38-3.5T120-220v-520q0-22 18-33.5t38-3.5l616 260q25 11 25 37t-25 37ZM200-280l474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
                </svg>
              </Button>
            </div>
          </div>
        </motion.div>
        // <motion.div
        //   initial={{ opacity: 0, y: 20 }}
        //   animate={{ opacity: 1, y: 0 }}
        //   exit={{ opacity: 0, y: 20 }}
        //   transition={{ duration: 0.3 }}
        //   className="fixed flex flex-col justify-end bottom-4 right-4 bg-white  rounded-xl shadow-xl z-50 max-w-96 h-[600px] overflow-hidden"
        // >
        //   <div className="flex justify-between items-center flex-row absolute px-4 bg-gradient-to-b from-white/100 to-white/5  w-full h-12 z-10 text-sm">
        //     <div></div>
        //     <div className="flex items-center shadow-lg rounded-full border px-2 py-0.5 bg-white gap-2">
        //       <img
        //         src="/images/mazeda-ai.svg"
        //         alt="Avatar"
        //         className="w-8 h-8 rounded-full object-cover"
        //       />
        //       <span>MazedaAi</span>
        //     </div>

        //     <Button
        //       radius="full"
        //       isIconOnly
        //       onClick={() => setShowChatWindow(false)}
        //       className="text-gray-500 hover:text-red-500 flex items-center shadow-lg rounded-full border  bg-white "
        //     >
        //       {" "}
        //       ✕
        //     </Button>
        //   </div>
        //   <div className="flex flex-col px-4 pb-4 flex-1">
        //     <div className="flex flex-col ">
        //       <div className="flex-1 overflow-y-auto mb-4 flex flex-col-reverse space-y-2 space-y-reverse max-h-[calc(80vh-160px)] px-4">
        //         {[...messages].reverse().map((msg, idx) => (
        //           <div
        //             key={idx}
        //             className={`chat ${
        //               msg.role === "user" ? "chat-end" : "chat-start"
        //             }`}
        //           >
        //             <div
        //               className={`chat-bubble rounded-2xl ${
        //                 msg.role === "user" ? "bg_red " : "bg_green"
        //               }`}
        //             >
        //               <div
        //                 dangerouslySetInnerHTML={{
        //                   __html:
        //                     msg.content === "__loading__"
        //                       ? '<span class="loading loading-dots loading-xs"></span>'
        //                       : msg.content,
        //                 }}
        //               />
        //             </div>
        //           </div>
        //         ))}
        //       </div>

        //       <div className="flex items-center justify-between gap-2">

        //         <Textarea
        //           className="max-w-xs"
        //           placeholder="Type your message..."
        //           onChange={(e) => setInput(e.target.value)}
        //           value={input}
        //           onKeyDown={handleKeyDown}
        //           minRows={1}
        //         />

        //         <Button
        //           radius="full"
        //           isIconOnly
        //           onClick={sendMessage}
        //           disabled={loading}
        //           className="text-gray-500 bg-white"
        //         >
        //           {" "}
        //           <svg
        //             xmlns="http://www.w3.org/2000/svg"
        //             height="28px"
        //             viewBox="0 -960 960 960"
        //             width="28px"
        //             fill="#6b7280"
        //           >
        //             <path d="M792-443 176-183q-20 8-38-3.5T120-220v-520q0-22 18-33.5t38-3.5l616 260q25 11 25 37t-25 37ZM200-280l474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
        //           </svg>
        //         </Button>
        //       </div>
        //     </div>
        //   </div>

        // </motion.div>
      )}
      {!showChatWindow && (
        <div className="fixed bottom-4 right-4  z-50">
          <Button
            radius="full"
            isIconOnly
            className="px-3 py-3 h-14 w-14 green_gradient shadow_akm"
            onClick={() => setShowChatWindow(!showChatWindow)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              fill="#fff"
            >
              <path d="m240-240-92 92q-19 19-43.5 8.5T80-177v-623q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240Zm-34-80h594v-480H160v525l46-45Zm-46 0v-480 480Zm120-80h240q17 0 28.5-11.5T560-440q0-17-11.5-28.5T520-480H280q-17 0-28.5 11.5T240-440q0 17 11.5 28.5T280-400Zm0-120h400q17 0 28.5-11.5T720-560q0-17-11.5-28.5T680-600H280q-17 0-28.5 11.5T240-560q0 17 11.5 28.5T280-520Zm0-120h400q17 0 28.5-11.5T720-680q0-17-11.5-28.5T680-720H280q-17 0-28.5 11.5T240-680q0 17 11.5 28.5T280-640Z" />
            </svg>
          </Button>
        </div>
      )}
    </>
  );
};

export default ChatBubble;
