"use client";

import { useEffect, useState, useRef } from "react";
import { FiSend, FiX, FiTrash2, FiMessageSquare } from "react-icons/fi";

type Message = {
  text: string;
  sender: "user" | "bot";
};

const responses: Record<string, string> = {
const responses: Record<string, string> = {
  // تحيات وترحيب
  "مرحبا": "مرحباً بك في صلاح بلس 👋 كيف يمكنني مساعدتك؟",
  "السلام عليكم": "وعليكم السلام ورحمة الله وبركاته 🌟 أهلاً بك في صلاح بلس!",
  "اهلا": "أهلاً وسهلاً! 😊 تفضل بسؤالك.",
  "صباح الخير": "صباح النور والياسمين 🌞 كيف أقدر أخدمك؟",
  "مساء الخير": "مساء الفل 🌙 تفضل، أنا جاهز لمساعدتك.",

  // أسئلة عن الخدمات
  "ما الخدمات": "نقدم التصميم الجرافيكي، الهويات البصرية، العروض التقديمية، تصميم الكتب، الخدمات المكتبية، الدعم التقني، وحلول الذكاء الاصطناعي.",
  "خدماتكم": "خدماتنا تشمل: 1. التصميم الجرافيكي 2. الهويات البصرية 3. العروض التقديمية 4. تصميم الكتب التعليمية 5. الخدمات المكتبية 6. الدعم التقني 7. حلول الذكاء الاصطناعي. أيها يهمك؟",
  "التصميم": "نقدم خدمة التصميم الجرافيكي من منشورات، بروشورات، بنرات، وهويات بصرية كاملة للشركات.",
  "الهوية البصرية": "نوفر تصميم هوية بصرية كاملة تشمل الشعار، الألوان، الخطوط، ودليل الهوية. اطلبها الآن من قسم 'تواصل معنا'.",
  "العروض التقديمية": "نصمم عروض PowerPoint احترافية، إنفوجرافيك، وعروض فيديو قصيرة.",
  "الذكاء الاصطناعي": "نطور حلول ذكاء اصطناعي مخصصة مثل بوتات ChatGPT، أتمتة المهام، وتحليل البيانات.",

  // أسئلة عن الأسعار
  "كم السعر": "الأسعار تعتمد على نوع المشروع وحجمه. تواصل معنا من قسم 'تواصل معنا' وسنعطيك عرض سعر دقيق.",
  "الاسعار": "لكل مشروع سعره الخاص حسب التفاصيل. راسلنا من نموذج التواصل نحسب لك التكلفة بدقة.",
  "بكم": "يعتمد السعر على متطلبات المشروع. أرسل لنا التفاصيل من قسم التواصل نحضر لك عرض سعر مجاني.",
  "التكلفة": "التكلفة تختلف حسب نوع الخدمة وحجم العمل. تواصل معنا نحسبها لك بدقة بدون أي التزام.",

  // أسئلة عن طلب الخدمة
  "كيف اطلب": "سهل جداً! اذهب إلى قسم 'تواصل معنا' في الموقع، واملأ النموذج باسمك وطلبك. سنرد عليك قريباً.",
  "طلب خدمة": "لطلب أي خدمة، املأ نموذج التواصل في قسم 'اتصل بنا'، واكتب تفاصيل مشروعك.",
  "اريد تصميم": "رائع! اذهب إلى 'تواصل معنا' واكتب نوع التصميم اللي تحتاجه. فريقنا جاهز للإبداع 🎨",

  // أسئلة عن الموقع
  "الموقع": "تفضل رابط موقعنا: https://salah-plus.vercel.app 🚀",
  "رابط الموقع": "يمكنك زيارة موقعنا من هنا: https://salah-plus.vercel.app",
  "موقعكم": "رابط موقعنا الرسمي: https://salah-plus.vercel.app",
  "الموقع الجغرافي": "يمكنك الوصول إلينا عبر خرائط جوجل. اسألنا عن الرابط من فضلك 📍",
  "العنوان": "موقعنا: اليمن. للتواصل المباشر: واتساب +967775307315",

  // أسئلة عن التواصل
  "التواصل": "يمكنك التواصل معنا عبر: 📧 البريد: salah201617@gmail.com | 📱 واتساب: +967775307315 | أو نموذج التواصل في الموقع.",
  "كيف اتواصل": "عدة طرق: 1. نموذج التواصل في الموقع 2. واتساب: +967775307315 3. بريد: salah201617@gmail.com",
  "رقم الجوال": "رقمنا للواتساب: +967775307315 📱",
  "الإيميل": "بريدنا الإلكتروني: salah201617@gmail.com 📧",
  "واتساب": "تواصل معنا واتساب: +967775307315",

  // أسئلة عن مدة التنفيذ
  "مدة التنفيذ": "تختلف حسب حجم المشروع. المشاريع الصغيرة: 1-3 أيام، المتوسطة: 3-7 أيام، الكبيرة: تحدد بعد المعاينة.",
  "متى يخلص": "المشاريع الصغيرة تحتاج 1-3 أيام عمل. نعطيك موعد دقيق بعد استلام متطلباتك.",
  "سرعة التسليم": "نحن نضمن التسليم في الوقت المتفق عليه. للعاجل، نقدم خدمة 'مستعجل' خلال 24 ساعة.",

  // أسئلة عن ضمان الجودة
  "ضمان": "نعم، جميع خدماتنا عليها ضمان جودة. لو ما عجبك الشغل، نعدله لك مجاناً.",
  "تعديل": "نقدم تعديلات مجانية حتى ترضى تماماً عن التصميم. راحتك تهمنا 👍",
  "ضمان الجودة": "نقدم ضمان على جميع خدماتنا. التعديلات مفتوحة حتى ترضى.",

  // أسئلة عن الدفع
  "الدفع": "نقبل الدفع عبر التحويل البنكي، الحوالات، أو الدفع عند الاستلام حسب الاتفاق.",
  "طرق الدفع": "التحويل البنكي، الحوالات المالية، أو الدفع نقداً حسب منطقتك.",
  "الدفع مقدم": "نعم، نطلب عربون 50% عند بدء العمل، والباقي عند التسليم.",

  // أسئلة عامة
  "من أنت": "أنا مساعد صلاح بلس الذكي! 🤖 جاهز للإجابة على كل أسئلتك عن خدماتنا.",
  "شكرا": "العفو! 🌹 أي خدمة ثانية؟",
  "وداعا": "مع السلامة! 🖐️ نتمنى لك يوماً سعيداً.",
  "بااي": "الله يحفظك! 👋",
  "مع السلامة": "مع السلامة! ننتظر زيارتك القادمة 🌟",
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
