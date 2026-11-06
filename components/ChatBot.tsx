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
  link?: { text: string; url: string }; // 👈 إضافة خاصية الروابط
};

// دالة تنظيف النص العربي (لتوحيد الهمزات والتاء المربوطة والياء)
const normalizeArabic = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/[ًٌٍَُِّْ]/g, "") // إزالة التشكيل
    .trim();
};

// دالة حساب التشابه (Levenshtein Distance) لاكتشاف الأخطاء الإملائية
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
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + substitutionCost
      );
    }
  }
  const distance = matrix[b.length][a.length];
  return 1 - distance / Math.max(a.length, b.length);
};

// 👈 قاعدة البيانات الشاملة (الخدمات، المتجر، الأسعار، اللهجة اليمنية...)
const botData = [
  {
    topic: "الترحيب",
    keywords: ["مرحبا", "السلام", "عليكم", "اهلا", "هلا", "صباح", "مساء", "hi", "hello", "كيفك", "كيف حالك", "يا هلا"],
    response: "مرحباً بك في صلاح بلس! 👋 كيف يمكنني مساعدتك اليوم؟",
  },
  {
    topic: "من هو صلاح بلس",
    keywords: ["من انت", "من انتم", "مين صلاح", "صلاح بلس", "عن الموقع", "مين صاحب الموقع", "وش تسوون", "من هو"],
    response: "صلاح بلس هي منصة تقدم حلولاً إبداعية وتقنية متكاملة (تصميم، برمجة، كتب تعليمية، وذكاء اصطناعي) بقيادة م. صلاح عبده البزالي. 🚀",
  },
  {
    topic: "المتجر والكتب",
    keywords: ["كتاب", "كتب", "متجر", "شراء", "طلب", "اشتري", "ابغى كتاب", "عندكم كتب", "كورس", "منهج", "برمجه", "بايثون", "python", "cpp", "سي بلس", "front", "back"],
    response: "نوفر لك كتباً تعليمية احترافية (C++, Front-End, Back-End, Python والذكاء الاصطناعي). يمكنك تصفحها وطلبها مباشرة. 📚",
    link: { text: "تصفح المتجر الآن", url: "/store" }
  },
  {
    topic: "الخدمات والتصميم",
    keywords: ["خدمات", "خدمه", "تصميم", "جرافيك", "فوتوشوب", "بوستات", "اعلانات", "هويه", "شعار", "لوجو", "براند", "عروض", "بوربوينت", "انفوجرافيك", "مطبوعات", "طباعه"],
    response: "نقدم خدمات التصميم الجرافيكي، الهوية البصرية، العروض التقديمية، وتصميم الكتب والمناهج. 🎨",
    link: { text: "استكشف خدماتنا", url: "/#services" }
  },
  {
    topic: "الأسعار",
    keywords: ["سعر", "بكم", "تكلفه", "كم", "تسعير", "اسعار", "كم السعر", "بكم الكتاب", "كم يكلف", "غالي", "رخيص", "خصم", "عروض", "شقد", "كم حق", "كم تشتي", "كم الحساب"],
    response: `أسعار الكتب واضحة في المتجر. أما أسعار الخدمات فتعتمد على حجم المشروع. تواصل معنا للحصول على عرض سعر دقيق. 💰\nأو راسلنا واتساب: ${phone}`,
    link: { text: "الذهاب للمتجر", url: "/store" }
  },
  {
    topic: "طرق الدفع",
    keywords: ["دفع", "محفظه", "جوالي", "كريمي", "جيب", "تحويل", "حواله", "بنك", "فيزا", "كاش", "كيف ادفع", "طريقه الدفع"],
    response: "نقبل الدفع عبر المحافظ الإلكترونية (جوالي، جيب، حاسب كريمي) أو عبر شبكات الحوالات. بعد الطلب سيظهر لك رقم المحفظة. 💳",
  },
  {
    topic: "وقت التنفيذ والتسليم",
    keywords: ["متى", "وقت", "مده", "تسليم", "جاهز", "كم ياخذ", "كم يوم", "متى يخلص", "متى ينتهي", "عاجل", "سريع", "متى ينجز", "متى تكمل"],
    response: "مدة تنفيذ الكتب والخدمات تختلف حسب الطلب. الكتب الجاهزة فورية، أما التصاميم والمشاريع فتحتاج من يوم إلى أسبوع حسب حجمها. ⏱️",
  },
  {
    topic: "الشحن والتوصيل",
    keywords: ["شحن", "توصيل", "تسليم", "يوصل", "متى يوصل", "صنعاء", "عدن", "تعز", "حضرموت", "المحافظات", "داخل اليمن"],
    response: "نوفر خدمة الشحن لجميع المحافظات اليمنية. التوصيل داخل صنعاء سريع، وباقي المحافظات عبر شركات الشحن. 🚚",
  },
  {
    topic: "مواعيد العمل",
    keywords: ["دوام", "مواعيد", "وقت", "مفتوح", "مغلق", "اجازه", "جمعه", "السبت", "متى تفتحون", "ساعات العمل"],
    response: "مواعيد العمل من السبت إلى الخميس (9:00 ص - 9:30 م)، والجمعة عطلة رسمية. 🕐",
  },
  {
    topic: "التواصل والموقع",
    keywords: ["تواصل", "رقم", "واتساب", "ايميل", "بريد", "اتصل", "جوال", "تلفون", "وين انتم", "موقعكم", "عنوان", "مكان", "فرع", "رابط الموقع", "الموقع الجغرافي"],
    response: `يسعدنا تواصلك! يمكنك مراسلتنا عبر:\n📱 واتساب: ${phone}\n📧 البريد: ${email}\n🌐 الموقع: ${siteUrl}`,
    link: { text: "الذهاب لصفحة التواصل", url: "/#contact" }
  },
  {
    topic: "الأعمال السابقة",
    keywords: ["اعمال", "شغلكم", "مشاريع", "معرض", "صور", "سابقه", "نماذج", "بورتفوليو", "شفنا شغلكم"],
    response: "فخورون بأعمالنا السابقة! يمكنك تصفح معرض أعمالنا لمشاهدة أحدث المشاريع والتصاميم. 👀",
    link: { text: "تصفح معرض الأعمال", url: "/#portfolio" }
  },
  {
    topic: "المدونة والمقالات",
    keywords: ["مقالات", "مدونه", "اقرا", "معلومات", "دروس", "نصائح", "تعلم"],
    response: "لدينا مدونة مليئة بالمقالات والدروس التقنية في التصميم والبرمجة والذكاء الاصطناعي. تصفحها الآن! 📝",
    link: { text: "قراءة المقالات", url: "/#blog" }
  },
  {
    topic: "ضمان الجودة والتعديل",
    keywords: ["ضمان", "تعديل", "تعدل الحته", "مش راكب", "عدلها على السريع", "ضمان الجودة"],
    response: "نعم، جميع خدماتنا عليها ضمان جودة. لو ما عجبك الشغل، نعدله لك مجاناً حتى ترضى تماماً. 👍",
  },
  {
    topic: "الشكر والرضا",
    keywords: ["شكرا", "مشكور", "يعطيك", "تسلم", "جزاك", "الله خير", "يسلمو", "ممتاز", "رائع", "تمام", "ما قصرت", "يعطيك العافيه", "شغل نظيف", "بيض الله وجهك"],
    response: "العفو! الشكر لله. حاضرين لأي خدمة ثانية. 🌹",
  },
  {
    topic: "الوداع",
    keywords: ["مع السلامه", "باي", "وداعا", "الى اللقاء", "سلام"],
    response: "مع السلامة! 👋 نتمنى لك يوماً سعيداً، وننتظر زيارتك القادمة لموقع صلاح بلس.",
  },
];

const suggestions = ["الكتب المتوفرة 📚", "خدماتكم 🎨", "أسعاركم 💰", "تواصل معنا 📞"];

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
    if (messages.length > 50) {
      setMessages((prev) => prev.slice(-50));
    } else {
      localStorage.setItem("salah-chat", JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // عقل البوت الذكي
  const getBotReply = (userInput: string): { text: string; link?: any } => {
    const cleanInput = normalizeArabic(userInput);
    let bestMatch = { score: 0, data: null as any };

    for (const item of botData) {
      for (const keyword of item.keywords) {
        const score = getSimilarity(cleanInput, keyword);
        if (score > bestMatch.score) {
          bestMatch = { score, data: item };
        }
      }
    }

    if (bestMatch.score > 0.8) {
      return { text: bestMatch.data.response, link: bestMatch.data.link };
    }

    if (bestMatch.score > 0.5) {
      return { 
        text: `هل تقصد أنك تسأل عن "${bestMatch.data.topic}"؟ 🤔\n\n${bestMatch.data.response}`, 
        link: bestMatch.data.link 
      };
    }

    return { 
      text: "شكراً لتواصلك. سيقوم فريق صلاح بلس بالرد عليك قريباً.\nيمكنك تجربة كتابة كلمات أبسط مثل: (كتب، خدمات، أسعار، تواصل) أو استخدام الأزرار بالأسفل. 😊" 
    };
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { text, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = getBotReply(text);
      setMessages((prev) => [...prev, { text: reply.text, sender: "bot", link: reply.link }]);
      setIsTyping(false);
    }, 800);
  };

  const clearChat = () => {
    setMessages([
      { text: "مرحباً 👋 أنا مساعد صلاح بلس الذكي، كيف يمكنني مساعدتك؟", sender: "bot" },
    ]);
    localStorage.removeItem("salah-chat");
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-5 z-50 rounded-full bg-gold p-4 text-navy shadow-xl hover:bg-gold-dark transition-all hover:scale-110"
      >
        <FiMessageSquare size={24} />
      </button>

      {open && (
        <div className="fixed bottom-28 right-5 z-50 flex h-[500px] w-[350px] flex-col overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-navy shadow-2xl">
          
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
            <div className="flex gap-2 text-gray-500 dark:text-gray-400">
              <button onClick={clearChat} title="مسح المحادثة" className="hover:text-red-500 transition-colors">
                <FiTrash2 size={18} />
              </button>
              <button onClick={() => setOpen(false)} className="hover:text-gold transition-colors">
                <FiX size={20} />
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
                  
                  {/* زر الرابط التوجيهي */}
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

          {/* الاقتراحات السريعة */}
          <div className="px-3 py-2 bg-white dark:bg-navy-lighter border-t border-gray-100 dark:border-gray-800 flex gap-2 overflow-x-auto no-scrollbar">
            {suggestions.map((suggestion, i) => (
              <button
                key={i}
                onClick={() => sendMessage(suggestion)}
                className="whitespace-nowrap text-xs bg-gray-100 dark:bg-navy text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-full hover:bg-gold hover:text-navy transition-colors"
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
