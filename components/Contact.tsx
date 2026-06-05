"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiMail, FiPhone, FiMapPin, FiSend, FiFacebook, FiInstagram,
  FiCheckCircle, FiAlertCircle, FiLoader,
} from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { socialLinks } from "@/lib/data";
import WorkHours from "./WorkHours";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage("");
  };

  const siteKey = "0x4AAAAAADetE7Omp726aW1x";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // إعادة تحميل Turnstile إذا اختفى
    const existingWidget = document.querySelector('.cf-turnstile');
    if (!existingWidget) {
      const form = formRef.current;
      if (form) {
        const div = document.createElement("div");
        div.className = "cf-turnstile";
        div.setAttribute("data-sitekey", siteKey);
        const btn = form.querySelector("button[type='submit']");
        if (btn) {
          btn.parentNode?.insertBefore(div, btn);
        }
        if ((window as any).turnstile) {
          (window as any).turnstile.render(div);
        }
      }
      setErrorMessage("جاري تحميل التحقق... انتظر ثانية");
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    const turnstileInput = document.querySelector('[name="cf-turnstile-response"]') as HTMLInputElement;
    const turnstileToken = turnstileInput?.value;

    if (!turnstileToken) {
      setErrorMessage("الرجاء إكمال التحقق الأمني");
      return;
    }

    setStatus("sending");

    try {
      const emailjs = (await import("@emailjs/browser")).default;
      await emailjs.send("service_yygh4dj", "template_0n382af", {
        from_name: formState.name,
        from_email: formState.email,
        title: formState.subject,
        message: formState.message,
      }, "j766og8IrXhks3sKC");

      setStatus("success");
      setFormState({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error: any) {
      setStatus("error");
      setErrorMessage(error?.text || error?.message || "فشل الإرسال");
      setTimeout(() => { setStatus("idle"); setErrorMessage(""); }, 5000);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="py-12 sm:py-16 md:py-20 lg:py-28 bg-white dark:bg-navy-lighter relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* عنوان القسم - مثل Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gold text-sm font-bold tracking-widest uppercase mb-4 block"
          >
            تواصل معنا
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy dark:text-white mb-4"
          >
            لنبدأ <span className="gradient-text">العمل معاً</span>
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "5rem" }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="h-0.5 bg-gold mx-auto rounded-full mb-6" 
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-sm sm:text-base text-gray-900 dark:text-white max-w-2xl mx-auto font-medium"
          >
            هل لديك مشروع في ذهنك؟ دعنا نساعدك في تحويله إلى واقع.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          <motion.form ref={formRef} onSubmit={handleSubmit} className="lg:col-span-3 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الاسم الكامل <span className="text-red-500">*</span></label>
                <input type="text" name="name" required value={formState.name} onChange={handleChange} className="w-full px-5 py-3.5 rounded-xl bg-cream dark:bg-navy border border-gray-200 dark:border-gray-700 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none text-navy dark:text-white" placeholder="أدخل اسمك الكامل" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">البريد الإلكتروني <span className="text-red-500">*</span></label>
                <input type="email" name="email" required value={formState.email} onChange={handleChange} className="w-full px-5 py-3.5 rounded-xl bg-cream dark:bg-navy border border-gray-200 dark:border-gray-700 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none text-navy dark:text-white" placeholder="example@email.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الموضوع <span className="text-red-500">*</span></label>
              <input type="text" name="subject" required value={formState.subject} onChange={handleChange} className="w-full px-5 py-3.5 rounded-xl bg-cream dark:bg-navy border border-gray-200 dark:border-gray-700 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none text-navy dark:text-white" placeholder="ما هو موضوع رسالتك؟" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الرسالة <span className="text-red-500">*</span></label>
              <textarea name="message" required rows={5} value={formState.message} onChange={handleChange} className="w-full px-5 py-3.5 rounded-xl bg-cream dark:bg-navy border border-gray-200 dark:border-gray-700 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none resize-none text-navy dark:text-white" placeholder="اكتب رسالتك هنا..." />
            </div>

            {/* Turnstile */}
            <div className="cf-turnstile" data-sitekey={siteKey} />

            {errorMessage && (
              <div className="text-red-500 text-sm flex items-center gap-2 bg-red-50 dark:bg-red-900/20 p-3 rounded-xl">
                <FiAlertCircle /><span>{errorMessage}</span>
              </div>
            )}

            <motion.button type="submit" disabled={status === "sending"} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 ${
                status === "sending" ? "bg-gray-400 text-white cursor-not-allowed" :
                status === "success" ? "bg-green-500 text-white" :
                status === "error" ? "bg-red-500 text-white" :
                "bg-gold-gradient text-navy hover:shadow-lg hover:shadow-gold/20"
              }`}>
              {status === "sending" && <><FiLoader className="animate-spin" /> جاري الإرسال...</>}
              {status === "success" && <><FiCheckCircle /> تم الإرسال بنجاح ✓</>}
              {status === "error" && <><FiAlertCircle /> حدث خطأ ✗</>}
              {status === "idle" && <><FiSend /> إرسال الرسالة</>}
            </motion.button>
          </motion.form>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-cream dark:bg-navy p-8 rounded-2xl border border-gray-100 dark:border-gray-800">
              <h3 className="text-xl font-bold text-navy dark:text-white mb-6">معلومات التواصل</h3>
              <div className="space-y-4">
                {[
                  { icon: FiMail, label: "البريد", value: socialLinks.email, href: `mailto:${socialLinks.email}` },
                  { icon: FiPhone, label: "واتساب", value: "+967 775 307 315", href: "https://wa.me/967775307315" },
                  { icon: FiMapPin, label: "الموقع", value: "اليمن", href: "#" },
                ].map((item) => (
                  <a key={item.label} href={item.href} className="flex items-center gap-4 p-4 rounded-xl hover:bg-white dark:hover:bg-navy-lighter transition-all group">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center group-hover:bg-gold transition">
                      <item.icon className="text-gold group-hover:text-navy" />
                    </div>
                    <div><div className="text-xs text-gray-400">{item.label}</div><div className="text-navy dark:text-white font-medium text-sm">{item.value}</div></div>
                  </a>
                ))}
              </div>
            </div>
            <WorkHours />
            <div className="bg-cream dark:bg-navy p-8 rounded-2xl border border-gray-100 dark:border-gray-800">
              <h3 className="text-xl font-bold text-navy dark:text-white mb-4">تابعنا على</h3>
              <div className="flex gap-3">
                {[
                  { icon: FiFacebook, href: socialLinks.facebook, color: "#1877f2" },
                  { icon: FaXTwitter, href: socialLinks.x, color: "#000" },
                  { icon: FiInstagram, href: socialLinks.instagram, color: "#e4405f" },
                  { icon: FaWhatsapp, href: socialLinks.whatsapp, color: "#25d366" },
                ].map((s) => (
                  <motion.a key={s.href} href={s.href} target="_blank" whileHover={{ scale: 1.1, y: -3 }} whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 rounded-xl bg-white dark:bg-navy-lighter flex items-center justify-center text-gray-500 hover:text-white shadow-sm"
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = s.color; e.currentTarget.style.color = "white"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ""; e.currentTarget.style.color = ""; }}>
                    <s.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden fixed bottom-4 left-4 right-4 bg-white dark:bg-navy rounded-full shadow-lg p-2 z-50 mobile-bottom-nav">
          <div className="flex justify-around items-center">
            <a href="#home" className="flex flex-col items-center p-2 text-gray-500 dark:text-gray-400"><span className="text-xs">الرئيسية</span></a>
            <a href="#services" className="flex flex-col items-center p-2 text-gray-500 dark:text-gray-400"><span className="text-xs">الخدمات</span></a>
            <a href="#contact" className="flex flex-col items-center p-2 bg-gold rounded-full px-4 text-navy"><span className="text-xs font-bold">اتصل بنا</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}
