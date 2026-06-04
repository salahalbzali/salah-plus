"use client";

import { useEffect, useState, useRef } from "react";
import { FiSend, FiX, FiTrash2, FiMessageSquare } from "react-icons/fi";

type Message = {
  text: string;
  sender: "user" | "bot";
};

const responses: Record<string, string> = {
  مرحبا: "مرحباً بك في صلاح بلس 👋",
  "السلام عليكم": "وعليكم السلام ورحمة الله وبركاته",
  "ما الخدمات": "نقدم تصميم الجرافيك، الهوية البصرية، العروض التقديمية، وتطوير حلول الذكاء الاصطناعي.",
  "كيف اطلب": "يمكنك التواصل معنا من قسم التواصل وإرسال تفاصيل مشروعك.",
  "كم السعر": "يعتمد السعر على نوع المشروع وحجمه.",
  التواصل: "يمكنك استخدام نموذج التواصل الموجود في الموقع.",
  "الهوية البصرية": "نوفر تصميم هوية بصرية كاملة للشركات.",
  "الذكاء الاصطناعي": "نطور حلول ذكاء اصطناعي مخصصة للشركات.",
  "العروض التقديمية": "نصمم عروض PowerPoint احترافية.",
  "مدة التنفيذ": "تختلف حسب حجم المشروع.",
};

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { text: "مرحباً 👋 أنا مساعد صلاح بلس، كيف يمكنني مساعدتك؟", sender: "bot" },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("salah-chat");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setMessages(parsed);
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    if (messages.length > 100) {
      setMessages((prev) => prev.slice(-100));
    } else {
      localStorage.setItem("salah-chat", JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const getBotReply = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();
    const matchedKey = Object.keys(responses).find((key) =>
      lowerInput.includes(key.toLowerCase())
    );
    return matchedKey
      ? responses[matchedKey]
      : "شكراً لتواصلك. سيقوم فريق صلاح بلس بالرد عليك قريباً.";
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = getBotReply(userMessage.text);
      setMessages((prev) => [...prev, { text: reply, sender: "bot" }]);
      setIsTyping(false);
    }, 800);
  };

  const clearChat = () => {
    setMessages([
      { text: "مرحباً 👋 أنا مساعد صلاح بلس، كيف يمكنني مساعدتك؟", sender: "bot" },
    ]);
    localStorage.removeItem("salah-chat");
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-5 z-50 rounded-full bg-gold p-4 text-navy shadow-xl hover:bg-gold-dark transition-all"
      >
        <FiMessageSquare size={18} />
      </button>

      {open && (
        <div className="fixed bottom-28 right-5 z-50 flex h-[500px] w-[350px] flex-col overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-navy shadow-2xl">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-4 bg-cream dark:bg-navy-lighter">
            <h3 className="font-bold text-navy dark:text-white">مساعد صلاح بلس</h3>
            <div className="flex gap-2 text-gray-500 dark:text-gray-400">
              <button onClick={clearChat} title="مسح المحادثة" className="hover:text-red-500">
                <FiTrash2 size={18} />
              </button>
              <button onClick={() => setOpen(false)} className="hover:text-gold">
                <FiX size={18} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-cream/50 dark:bg-navy">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`rounded-xl p-3 max-w-[85%] text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "ml-auto bg-gold text-navy"
                    : "bg-white dark:bg-navy-lighter text-navy dark:text-white border border-gray-100 dark:border-gray-700"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="rounded-xl p-3 max-w-[85%] bg-white dark:bg-navy-lighter text-gray-400 text-sm">
                يكتب...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-2 border-t border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-navy-lighter">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="اكتب رسالتك..."
              className="flex-1 rounded-lg border border-gray-200 dark:border-gray-600 px-3 py-2 bg-cream dark:bg-navy text-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-gold"
            />
            <button
              onClick={sendMessage}
              className="rounded-lg bg-gold px-4 py-2 text-navy hover:bg-gold-dark transition"
            >
              <FiSend size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
