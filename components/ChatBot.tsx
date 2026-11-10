"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiX, FiTrash2, FiMessageSquare, FiExternalLink } from "react-icons/fi";
import Link from "next/link";

// 👈 متغيرات البيئة
const phone = process.env.NEXT_PUBLIC_PHONE || "+967775307315";
const email = process.env.NEXT_PUBLIC_EMAIL || "salahplus2026@gmail.com";

type Message = {
  text: string;
  sender: "user" | "bot";
  link?: { text: string; url: string };
};

// دالة تنظيف النص العربي
const normalizeArabic = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/[ًٌٍَُِّْ]/g, "")
    .trim();
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

// 👈 قاعدة البيانات الشاملة (ردود حقيقية ومفصلة)
const botData = [
  {
    topic: "الترحيب",
    keywords: ["مرحبا", "السلام", "عليكم", "اهلا", "هلا", "صباح", "مساء", "hi", "hello", "كيفك", "كيف حالك", "يا هلا"],
    response: "مرحباً بك في صلاح بلس! 👋\nأنا المساعد الذكي، يمكنني أن أساعدك في:\n• معرفة الخدمات والأسعار\n• معلومات عن الكتب والمتجر\n• طرق الدفع والشحن\n• التواصل معنا\n\nكيف يمكنني مساعدتك اليوم؟",
  },
  {
    topic: "من هو صلاح بلس",
    keywords: ["من انت", "من انتم", "مين صلاح", "صلاح بلس", "عن الموقع", "مين صاحب الموقع", "وش تسوون", "من هو", "مين انت"],
    response: "صلاح بلس هي منصة إبداعية وتقنية متكاملة، أسسها المهندس صلاح عبده البزالي.\n\nنقدم خدمات:\n🎨 التصميم الجرافيكي والهويات البصرية\n📚 تصميم وبيع الكتب التعليمية (C++، Front-End، Back-End، Python)\n📊 العروض التقديمية الاحترافية\n🤖 حلول الذكاء الاصطناعي والأتمتة\n💻 الدعم التقني\n\nهدفنا: تحويل أفكارك إلى واقع احترافي بأفضل جودة وأسرع وقت. 🚀",
  },
  {
    topic: "المتجر والكتب",
    keywords: ["كتاب", "كتب", "متجر", "شراء", "طلب", "اشتري", "ابغى كتاب", "عندكم كتب", "كورس", "منهج", "برمجه", "بايثون", "python", "cpp", "سي بلس", "front", "back", "أسعار الكتب", "كم سعر الكتاب"],
    response: "نوفر لك 4 كتب تعليمية احترافية:\n\n📘 المرشد العملي في برمجة C++ (3500 ريال يمني)\n📗 تطوير واجهات المستخدم Front-End (4500 ريال)\n📙 تطوير الأنظمة المتكاملة Back-End (5500 ريال)\n📕 Python والذكاء الاصطناعي (5000 ريال)\n\n🎁 عرض خاص: احصل على الحزمة الكاملة بـ 12,000 ريال فقط!\n\nجميع الكتب مطبوعة بجودة عالية ومناسبة للمبتدئين والمحترفين.",
    link: { text: "📚 تصفح المتجر الآن", url: "/store" },
  },
  {
    topic: "الخدمات والتصميم",
    keywords: ["خدمات", "خدمه", "تصميم", "جرافيك", "فوتوشوب", "بوستات", "اعلانات", "هويه", "شعار", "لوجو", "براند", "عروض", "بوربوينت", "انفوجرافيك", "مطبوعات", "طباعه"],
    response: "نقدم 7 خدمات متكاملة:\n\n1️⃣ التصميم الجرافيكي (منشورات، بروشورات، بنرات)\n2️⃣ تصميم الكتب والمناهج التعليمية\n3️⃣ الهويات البصرية والشعارات الاحترافية\n4️⃣ الخدمات المكتبية (طباعة، تغليف)\n5️⃣ العروض التقديمية (PowerPoint، إنفوجرافيك)\n6️⃣ الصيانة والدعم التقني\n7️⃣ حلول الذكاء الاصطناعي (ChatGPT، أتمتة)\n\nأي خدمة تريد معرفة تفاصيلها أكثر؟",
    link: { text: "🎨 استكشف الخدمات", url: "/services" },
  },
  {
    topic: "الأسعار والتكلفة",
    keywords: ["سعر", "بكم", "تكلفه", "كم", "تسعير", "اسعار", "كم السعر", "كم يكلف", "غالي", "رخيص", "خصم", "عروض", "شقد", "كم حق", "كم تشتي", "كم الحساب"],
    response: "الأسعار تختلف حسب الخدمة:\n\n📚 الكتب: تبدأ من 3,500 ريال يمني\n🎨 التصميم الجرافيكي: حسب حجم المشروع (من 50$)\n🏷️ الهوية البصرية: حسب متطلبات المشروع\n📊 العروض التقديمية: حسب عدد الشرائح\n🤖 حلول AI: حسب التعقيد\n\nلحساب السعر بدقة، أرسل لنا تفاصيل المشروع عبر الواتساب: +967775307315",
  },
  {
    topic: "التواصل",
    keywords: ["تواصل", "رقم", "واتساب", "ايميل", "بريد", "اتصل", "جوال", "تلفون", "وين انتم", "موقعكم", "عنوان", "مكان", "فرع", "رابط الموقع"],
    response: `يسعدنا تواصلك معنا! 📞\n\n📱 واتساب: ${phone}\n📧 البريد: ${email}\n📍 الموقع: اليمن\n\nمواعيد العمل:\n• السبت - الخميس: 9 صباحاً - 9:30 مساءً\n• الجمعة: عطلة\n\nيمكنك أيضاً استخدام قسم "تواصل معنا" في أسفل أي صفحة.`,
  },
  {
    topic: "طرق الدفع",
    keywords: ["دفع", "محفظه", "جوالي", "كريمي", "جيب", "تحويل", "حواله", "بنك", "فيزا", "كاش", "كيف ادفع", "طريقه الدفع"],
    response: "نوفر لك 3 طرق دفع سهلة:\n\n💳 محفظة جوالي (Jawali)\n💳 محفظة جيب (Jaib)\n🏦 محفظة حاسب كريمي (Kuraimi)\n\nالخطوات:\n1. أضف الكتب للسلة\n2. أدخل بياناتك\n3. اختر المحفظة\n4. حوّل المبلغ\n5. أرسل صورة الإيصال عبر الواتساب\n\nوسنؤكد طلبك فوراً! ✅",
  },
  {
    topic: "الشحن والتوصيل",
    keywords: ["شحن", "توصيل", "تسليم", "يوصل", "متى يوصل", "صنعاء", "عدن", "تعز", "حضرموت", "المحافظات", "داخل اليمن"],
    response: "نوفر خدمة الشحن لجميع المحافظات اليمنية 🚚\n\n📍 صنعاء: التوصيل خلال 24-48 ساعة\n📍 باقي المحافظات: 3-5 أيام عمل\n\n📦 الشحن عبر شركات معتمدة\n💰 رسوم الشحن تحدد حسب الموقع\n\nللتفاصيل الدقيقة، تواصل معنا عبر الواتساب.",
  },
  {
    topic: "مواعيد العمل",
    keywords: ["دوام", "مواعيد", "وقت", "مفتوح", "مغلق", "اجازه", "جمعه", "السبت", "متى تفتحون", "ساعات العمل", "ساعات الدوام"],
    response: "مواعيد عملنا:\n\n🕐 السبت - الخميس: من 9 صباحاً إلى 9:30 مساءً\n🚫 الجمعة: عطلة رسمية\n\nيمكنك التواصل معنا في أي وقت عبر الواتساب، وسنرد عليك خلال ساعات العمل في أقرب وقت ممكن! 📱",
  },
  {
    topic: "مدة التنفيذ",
    keywords: ["متى", "وقت", "مده", "تسليم", "جاهز", "كم ياخذ", "كم يوم", "متى يخلص", "متى ينتهي", "عاجل", "سريع", "متى ينجز", "متى تكمل"],
    response: "مدة التنفيذ حسب نوع الخدمة:\n\n📚 الكتب: جاهزة فوراً\n🎨 تصميم منشور: 1-2 يوم\n🏷️ تصميم شعار: 2-3 أيام\n💼 هوية بصرية كاملة: 5-7 أيام\n📊 عرض تقديمي: 2-4 أيام\n💻 مشاريع برمجية: حسب الحجم\n\n🚀 لدينا خدمة مستعجل (24 ساعة) للطلبات العاجلة!\n\nللتأكيد على الموعد، تواصل معنا.",
  },
  {
    topic: "ضمان الجودة",
    keywords: ["ضمان", "تعديل", "تعدل الحته", "مش راكب", "عدلها على السريع", "ضمان الجودة", "اذا ماعجبني"],
    response: "نضمن لك جودة عالية في كل خدمة ✨\n\n✅ تعديلات مجانية غير محدودة حتى الرضا التام\n✅ ضمان على الكتب المطبوعة (لو فيها عيب مطبعي نستبدلها)\n✅ نلتزم بموعد التسليم المتفق عليه\n✅ نرد على استفساراتك بسرعة\n\nرضاك هو أولويتنا الأولى! 💯",
  },
  {
    topic: "عن المؤلف",
    keywords: ["المؤلف", "صلاح البزالي", "صاحب الكتب", "من كتب", "خبره", "خبرة"],
    response: "✍️ م. صلاح عبده البزالي\n\n• مهندس ومصمم محترف\n• متخصص في تبسيط العلوم التقنية والبرمجية\n• أكثر من 10 سنوات خبرة\n• صاحب 4 إصدارات تعليمية (C++، Front-End، Back-End، Python)\n• مؤسس منصة صلاح بلس\n\nرسالته: تبسيط التقنية وإيصالها لكل من يريد التعلم بأسلوب إبداعي. 🎯",
  },
  {
    topic: "الأعمال السابقة",
    keywords: ["اعمال", "شغلكم", "مشاريع", "معرض", "سابقه", "نماذج", "شفنا شغلكم", "بورتفوليو"],
    response: "لدينا معرض أعمال متنوع يشمل:\n\n🎯 هويات بصرية لشركات\n📚 تصميم كتب تعليمية\n📱 حملات تسويقية\n📊 عروض تقديمية احترافية\n🤖 تطبيقات ذكاء اصطناعي\n🖨️ مشاريع طباعة وتغليف\n\nكل مشروع له صفحة تفصيلية بصور واحترافية. تفضل بزيارته!",
    link: { text: "👀 شاهد معرض الأعمال", url: "/portfolio" },
  },
  {
    topic: "المدونة",
    keywords: ["مقالات", "مدونه", "اقرا", "دروس", "نصائح", "تعلم"],
    response: "لدينا مقالات ودروس تقنية مميزة في المدونة:\n\n📝 أدوات الذكاء الاصطناعي الأكثر تأثيراً في 2026\n🎨 كيف تختار الهوية البصرية المناسبة؟\n💻 دليلك الشامل لبدء البرمجة من الصفر\n✨ اتجاهات التصميم الجرافيكي 2026\n\nكل مقال فيه محتوى غني ومفيد. تفضل بالقراءة!",
    link: { text: "📖 اقرأ المقالات", url: "/blog" },
  },
  {
    topic: "الشكر",
    keywords: ["شكرا", "مشكور", "يعطيك", "تسلم", "جزاك", "الله خير", "يسلمو", "ممتاز", "رائع", "تمام", "ما قصرت", "يعطيك العافيه", "شغل نظيف", "بيض الله وجهك"],
    response: "العفو يا غالي! 🌹\n\nأنا هنا دائماً لخدمتك، وإذا احتجت أي شيء آخر فلا تتردد في السؤال. 😊",
  },
  {
    topic: "الوداع",
    keywords: ["مع السلامه", "باي", "وداعا", "الى اللقاء", "سلام"],
    response: "مع السلامة! 👋\n\nنتمنى لك يوماً سعيداً، وننتظر زيارتك القادمة لموقع صلاح بلس.\n\nلا تنسَ متابعتنا على السوشيال ميديا لمتابعة كل جديد! 🌟",
  },
];

const suggestions = ["الكتب المتوفرة 📚", "أسعاركم 💰", "طرق الدفع 💳", "تواصل معنا 📞"];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { text: "مرحباً 👋 أنا مساعد صلاح بلس الذكي.\nيمكنني مساعدتك في معرفة الخدمات، الكتب، الأسعار، أو التواصل معنا.\n\nكيف يمكنني مساعدتك؟", sender: "bot" },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("salah-chat");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) setMessages(parsed);
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

    if (bestMatch.score > 0.75) {
      return { text: bestMatch.data.response, link: bestMatch.data.link };
    }

    if (bestMatch.score > 0.5) {
      return {
        text: `هل تقصد أنك تسأل عن "${bestMatch.data.topic}"؟ 🤔\n\n${bestMatch.data.response}`,
        link: bestMatch.data.link,
      };
    }

    return {
      text: "عذراً، لم أفهم سؤالك تماماً. 😅\n\nيمكنك تجربة:\n• السؤال عن الكتب\n• الأسعار\n• الخدمات\n• طرق الدفع\n• التواصل\n\nأو اكتب كلمات مفتاحية مثل: (كتاب، تصميم، سعر، تواصل).",
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
    }, 700);
  };

  const clearChat = () => {
    setMessages([
      { text: "مرحباً 👋 أنا مساعد صلاح بلس الذكي.\nيمكنني مساعدتك في معرفة الخدمات، الكتب، الأسعار، أو التواصل معنا.\n\nكيف يمكنني مساعدتك؟", sender: "bot" },
    ]);
    localStorage.removeItem("salah-chat");
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-5 z-[60] rounded-full bg-gold p-4 text-navy shadow-xl hover:bg-gold-dark transition-all hover:scale-110"
      >
        <FiMessageSquare size={24} />
      </button>

      {open && (
        <div className="fixed z-[200] inset-x-4 bottom-20 sm:inset-x-auto sm:right-5 sm:bottom-28 flex h-[75vh] sm:h-[550px] w-auto sm:w-[380px] flex-col overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-navy shadow-2xl">

          {/* رأس النافذة */}
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-4 bg-cream dark:bg-navy-lighter">
            <div className="flex items-center gap-2">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-gold">
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
                <FiX size={22} />
              </button>
            </div>
          </div>

          {/* منطقة الرسائل */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-cream/50 dark:bg-navy">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`rounded-2xl p-3 max-w-[88%] text-sm leading-relaxed whitespace-pre-line ${
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

          {/* أزرار الاقتراحات */}
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
              placeholder="اكتب سؤالك..."
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
