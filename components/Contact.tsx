"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiSend, FiFacebook, FiInstagram, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { socialLinks } from "@/lib/data";
import WorkHours from "./WorkHours";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const turnstileToken = (document.querySelector('[name="cf-turnstile-response"]') as HTMLInputElement)?.value;
    if (!turnstileToken) {
      alert("الرجاء إكمال التحقق الأمني");
      return;
    }

    setStatus("sending");

    try {
      // 👈 الإرسال عبر API Route (الخادم)
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          subject: formState.subject,
          message: formState.message,
          turnstileToken,
        }),
      });

      if (!res.ok) throw new Error("فشل الإرسال");

      setStatus("success");
      setFormState({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="py-12 sm:py-16 md:py-20 lg:py-28 bg-white dark:bg-navy-lighter relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          style={{ opacity, y }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-gold text-xs sm:text-sm font-bold tracking-widest uppercase mb-3 sm:mb-4 inline-block">
            تواصل معنا
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-navy dark:text-white mb-4 sm:mb-6">
            لنبدأ <span className="gradient-text">العمل معاً</span>
          </h2>
          <div className="w-16 sm:w-20 h-0.5 bg-gold mx-auto mb-4 sm:mb-6 rounded-full" />
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
            هل لديك مشروع في ذهنك؟ دعنا نساعدك في تحويله إلى واقع.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 md:gap-8 lg:gap-10">
          <motion.form
            ref={formRef}
            initial={{ opacity: 0, x: isMobile ? 0 : -40, y: isMobile ? 40 : 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 space-y-4 sm:space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                  الاسم الكامل <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formState.name}
                  onChange={handleChange}
                  className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-cream dark:bg-navy border border-gray-200 dark:border-gray-700 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all duration-300 text-navy dark:text-white text-sm sm:text-base"
                  placeholder="أدخل اسمك الكامل"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                  البريد الإلكتروني <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formState.email}
                  onChange={handleChange}
                  className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-cream dark:bg-navy border border-gray-200 dark:border-gray-700 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all duration-300 text-navy dark:text-white text-sm sm:text-base"
                  placeholder="example@email.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                الموضوع <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="subject"
                required
                value={formState.subject}
                onChange={handleChange}
                className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-cream dark:bg-navy border border-gray-200 dark:border-gray-700 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all duration-300 text-navy dark:text-white text-sm sm:text-base"
                placeholder="ما هو موضوع رسالتك؟"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                الرسالة <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                required
                rows={5}
                value={formState.message}
                onChange={handleChange}
                className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-cream dark:bg-navy border border-gray-200 dark:border-gray-700 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all duration-300 resize-none text-navy dark:text-white text-sm sm:text-base"
                placeholder="اكتب رسالتك هنا..."
              />
            </div>

            <div className="cf-turnstile" data-sitekey="0x4AAAAAADetE7Omp726aW1x"></div>

            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3.5 sm:py-4 rounded-xl font-bold text-base sm:text-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                status === "sending"
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : status === "success"
                  ? "bg-green-500 text-white"
                  : status === "error"
                  ? "bg-red-500 text-white"
                  : "bg-gold-gradient text-navy hover:shadow-lg hover:shadow-gold/20"
              }`}
            >
              {status === "sending" && (
                <>
                  <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span className="text-sm sm:text-base">جاري الإرسال...</span>
                </>
              )}
              {status === "success" && (
                <>
                  <FiCheckCircle className="text-base sm:text-lg" />
                  <span className="text-sm sm:text-base">تم الإرسال بنجاح ✓</span>
                </>
              )}
              {status === "error" && (
                <>
                  <FiAlertCircle className="text-base sm:text-lg" />
                  <span className="text-sm sm:text-base">حدث خطأ، حاول مرة أخرى ✗</span>
                </>
              )}
              {status === "idle" && (
                <>
                  <FiSend className="text-base sm:text-lg" />
                  <span className="text-sm sm:text-base">إرسال الرسالة</span>
                </>
              )}
            </motion.button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : 40, y: isMobile ? 40 : 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6 sm:space-y-6"
          >
            <div className="bg-cream dark:bg-navy p-6 sm:p-8 rounded-2xl border border-gray-100 dark:border-gray-800">
              <h3 className="text-lg sm:text-xl font-bold text-navy dark:text-white mb-4 sm:mb-6">معلومات التواصل</h3>
              <div className="space-y-3 sm:space-y-4">
                {[
                  { icon: FiMail, label: "البريد الإلكتروني", value: socialLinks.email, href: `mailto:${socialLinks.email}` },
                  { icon: FiPhone, label: "واتساب", value: "+967 775 307 315", href: "https://wa.me/967775307315" },
                  { icon: FiMapPin, label: "الموقع", value: "اليمن", href: "#" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl hover:bg-white dark:hover:bg-navy-lighter transition-all duration-300 group"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold transition-colors duration-300">
                      <item.icon className="text-gold text-sm sm:text-base group-hover:text-navy transition-colors duration-300" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs text-gray-400 mb-0.5">{item.label}</div>
                      <div className="text-navy dark:text-white font-medium text-xs sm:text-sm truncate">{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <WorkHours />

            <div className="bg-cream dark:bg-navy p-6 sm:p-8 rounded-2xl border border-gray-100 dark:border-gray-800">
              <h3 className="text-lg sm:text-xl font-bold text-navy dark:text-white mb-4 sm:mb-6">تابعنا على</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {[
                  { icon: FiFacebook, href: socialLinks.facebook, label: "فيسبوك", color: "#1877f2" },
                  { icon: FaXTwitter, href: socialLinks.x, label: "إكس", color: "#000000" },
                  { icon: FiInstagram, href: socialLinks.instagram, label: "إنستغرام", color: "#e4405f" },
                  { icon: FaWhatsapp, href: socialLinks.whatsapp, label: "واتساب", color: "#25d366" },
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white dark:bg-navy-lighter flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-white transition-all duration-300 shadow-sm"
                    style={{ transition: "all 0.3s ease" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = social.color;
                      e.currentTarget.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "";
                      e.currentTarget.style.color = "";
                    }}
                    aria-label={social.label}
                  >
                    <social.icon size={18} className="sm:w-5 sm:h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="lg:hidden fixed bottom-4 left-4 right-4 bg-white dark:bg-navy rounded-full shadow-lg p-2 z-50">
          <div className="flex justify-around items-center">
            <a href="#home" className="flex flex-col items-center p-2 text-gray-500 dark:text-gray-400">
              <span className="text-xs">الرئيسية</span>
            </a>
            <a href="#services" className="flex flex-col items-center p-2 text-gray-500 dark:text-gray-400">
              <span className="text-xs">الخدمات</span>
            </a>
            <a href="#contact" className="flex flex-col items-center p-2 bg-gold rounded-full px-4 text-navy">
              <span className="text-xs font-bold">اتصل بنا</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
