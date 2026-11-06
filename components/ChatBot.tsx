"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiX, FiTrash2, FiMessageSquare, FiExternalLink } from "react-icons/fi";
import Link from "next/link";

// 👈 متغيرات البيئة
const phone = process.env.NEXT_PUBLIC_PHONE || "+967775307315";
const email = process.env.NEXT_PUBLIC_EMAIL || "salahplus2026@gmail.com";
const siteUrl = "https://salah-plus-l7lb.vercel.app";

type Message = {
  text: string;
  sender: "user" | "bot";
  link?: { text: string; url: string };
};

// دالة تنظيف النص العربي
const normalizeArabic = (text: string) => {
  return text.toLowerCase().replace(/[أإآ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي").replace(/[ًٌٍَُِّْ]/g, "").trim();
};

// دالة حساب التشابه لاكتشاف الأخطاء الإملائية
const getSimilarity = (s1: string, s2: string) => {
  const a = normalizeArabic(s1);
  const b = normalizeArabic(s2);
  if (a.length === 0) return b.length === 0 ? 1 : 0;
  if (b.length === 0) return 0;
  const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));
  for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= b.length; j++) matrix[j][0] = j;
  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const substitutionCost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(matrix[j][i - 1] + 1, matrix[j - 1][i] + 1, matrix[j - 1][i - 1] + substitutionCost);
    }
  }
  return 1 - matrix[b.length][a.length] / Math.max(a.length, b.length);
};

// قاعدة البيانات الشاملة
const botData = [
  { topic: "الترحيب", keywords: ["مرحبا", "السلام", "عليكم", "اهلا", "هلا", "صباح", "مساء", "hi", "hello", "كيفك"], response: "مرحباً بك في صلاح بلس! 👋 كيف يمكنني مساعدتك اليوم؟" },
  { topic: "من هو صلاح بلس", keywords: ["من انت", "من انتم", "مين صلاح", "عن الموقع", "وش تسوون"], response: "صلاح بلس هي منصة تقدم حلولاً إبداعية وتقنية متكاملة بقيادة م. صلاح عبده البزالي. 🚀" },
  { topic: "المتجر والكتب", keywords: ["كتاب", "كتب", "متجر", "شراء", "طلب", "اشتري", "كورس", "منهج", "بايثون", "python", "cpp"], response: "نوفر لك كتباً تعليمية احترافية. تصفحها واطلبها مباشرة. 📚", link: { text: "تصفح المتجر الآن", url: "/store" } },
  { topic: "الخدمات والتصميم", keywords: ["خدمات", "تصميم", "جرافيك", "هويه", "شعار", "لوجو", "براند", "عروض", "بوربوينت"], response: "نقدم خدمات التصميم الجرافيكي، الهوية البصرية، والعروض التقديمية. 🎨", link: { text: "استكشف خدماتنا", url: "/#services" } },
  { topic: "الأسعار", keywords: ["سعر", "بكم", "تكلفه", "كم", "اسعار", "غالي", "خصم", "شقد"], response: `أسعار الكتب في المتجر. أما الخدمات فتعتمد على المشروع. تواصل معنا لسعر دقيق. 💰`, link: { text: "الذهاب للمتجر", url: "/store" } },
  { topic: "التواصل والموقع", keywords: ["تواصل", "رقم", "واتساب", "ايميل", "بريد", "اتصل", "جوال", "عنوان"], response: `يسعدنا تواصلك! 📱 واتساب: ${phone}\n📧 البريد: ${email}`, link: { text: "صفحة التواصل", url: "/#contact" } },
];

const suggestions = ["الكتب 📚", "الخدمات 🎨", "الأسعار 💰", "التواصل 📞"];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { text: "مرحباً 👋 أنا مساعد صلاح بلس الذكي، كيف يمكنني مساعدتك؟", sender: "bot" },
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
    if (messages.length > 50) setMessages((prev) => prev.slice(-50));
    else localStorage.setItem("salah-chat", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const getBotReply = (userInput: string): { text: string; link?: any } => {
    const cleanInput = normalizeArabic(userInput);
    let bestMatch = { score: 0, data: null as any };

    for (const item of botData) {
      for (const keyword of item.keywords) {
        const score = getSimilarity(cleanInput, keyword);
        if (score > bestMatch.score) bestMatch = { score, data: item };
      }
    }

    if (bestMatch.score > 0.8) return { text: bestMatch.data.response, link: bestMatch.data.link };
    if (bestMatch.score > 0.5) return { text: `هل تقصد "${bestMatch.data.topic}"؟ 🤔\n\n${bestMatch.data.response}`, link: bestMatch.data.link };
    return { text: "شكراً لتواصلك. سيقوم فريق صلاح بلس بالرد عليك قريباً. 😊\nجرب كلمات مثل: (كتب، خدمات، أسعار)." };
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { text, sender: "user" }]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      const reply = getBotReply(text);
      setMessages((prev) => [...prev, { text: reply.text, sender: "bot", link: reply.link }]);
      setIsTyping(false);
    }, 800);
  };

  const clearChat = () => {
    setMessages([{ text: "مرحباً 👋 أنا مساعد صلاح بلس الذكي، كيف يمكنني مساعدتك؟", sender: "bot" }]);
    localStorage.removeItem("salah-chat");
  };

  return (
    <>
      {/* 👈 تم رفع الـ z-index ليكون فوق شريط التنقل السفلي */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-5 z-[60] rounded-full bg-gold p-4 text-navy shadow-xl hover:bg-gold-dark transition-all hover:scale-110"
      >
        <FiMessageSquare size={24} />
      </button>

      {open && (
        /* 👈 تم تعديل المقاسات لتناسب الجوال، ورفع z-index لـ 200 ليكون فوق كل شيء */
        <div className="fixed z-[200] inset-x-4 bottom-20 sm:inset-x-auto sm:right-5 sm:bottom-28 flex h-[70vh] sm:h-[500px] w-auto sm:w-[380px] flex-col overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-navy shadow-2xl">
          
          {/* رأس النافذة */}
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-4 bg-cream dark:bg-navy-lighter">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gold">
                <img src="/logo-dark.png" alt="Bot" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-navy dark:text-white text-sm">مساعد صلاح بلس</h3>
                <span className="text-[10px] text-green-500 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> متصل الآن
                </span>
              </div>
            </div>
            <div className="flex gap-3 text-gray-500 dark:text-gray-400">
              <button onClick={clearChat} title="مسح المحادثة" className="hover:text-red-500 transition-colors">
                <FiTrash2 size={18} />
              </button>
              <button onClick={() => setOpen(false)} className="hover:text-gold transition-colors">
                <FiX size={24} />
              </button>
            </div>
          </div>

          {/* منطقة الرسائل */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-cream/50 dark:bg-navy">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`rounded-2xl p-3 max-w-[85%] text-sm leading-relaxed whitespace-pre-line ${
                    msg.sender === "user"
                      ? "bg-gold text-navy rounded-tr-none shadow-sm"
                      : "bg-white dark:bg-navy-lighter text-navy dark:text-white border border-gray-100 dark:border-gray-700 rounded-tl-none shadow-sm"
                  }`}
                >
                  <p>{msg.text}</p>
                  
                  {msg.link && (
                    <Link
                      href={msg.link.url}
                      onClick={() => setOpen(false)}
                      className="mt-3 flex items-center justify-center gap-2 bg-gold/10 text-gold hover:bg-gold hover:text-navy px-3 py-2 rounded-xl text-xs font-bold transition-colors"
                    >
                      {msg.link.text}
                      <FiExternalLink size={14} />
                    </Link>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-tl-none p-3 bg-white dark:bg-navy-lighter border border-gray-100 dark:border-gray-700 text-gray-400 text-sm flex gap-1">
                  <span className="animate-bounce">●</span>
                  <span className="animate-bounce delay-100">●</span>
                  <span className="animate-bounce delay-200">●</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* 👈 الاقتراحات السريعة (تم تغييرها إلى flex-wrap لكي لا تُقطع) */}
          <div className="px-3 py-2 bg-white dark:bg-navy-lighter border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-2">
            {suggestions.map((suggestion, i) => (
              <button
                key={i}
                onClick={() => sendMessage(suggestion)}
                className="text-xs bg-gray-100 dark:bg-navy text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-full hover:bg-gold hover:text-navy transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>

          {/* حقل الإدخال */}
          <div className="flex gap-2 border-t border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-navy-lighter">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder="اكتب رسالتك..."
              className="flex-1 rounded-xl border border-gray-200 dark:border-gray-600 px-4 py-2.5 text-sm bg-cream dark:bg-navy text-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-gold"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className="rounded-xl bg-gold px-4 py-2.5 text-navy hover:bg-gold-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiSend size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
