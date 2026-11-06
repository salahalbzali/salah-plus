"use client";

import { motion } from "framer-motion";
import { FiMail, FiMapPin, FiFacebook, FiInstagram, FiPhone } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { socialLinks } from "@/lib/data";
import WorkHours from "./WorkHours";

export default function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-20 md:py-28 bg-white dark:bg-navy-lighter relative overflow-hidden">
      {/* خلفية خفيفة */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-gold text-sm font-bold tracking-widest uppercase mb-4 block">
            تواصل معنا
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-navy dark:text-white mb-4">
            لنبدأ <span className="gradient-text">العمل معاً</span>
          </h2>
          <div className="w-20 h-0.5 bg-gold mx-auto rounded-full mb-6" />
          <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200 max-w-2xl mx-auto font-medium">
            هل لديك مشروع في ذهنك؟ نحن هنا للإجابة على استفساراتك وتقديم الاستشارة.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* العمود الأول: بطاقة الواتساب الكبيرة */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <div className="bg-cream dark:bg-navy p-8 sm:p-10 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl flex-grow flex flex-col items-center justify-center text-center relative overflow-hidden">
              {/* تأثير خلفية */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl"></div>
              
              <div className="w-20 h-20 bg-[#25D366]/10 rounded-full flex items-center justify-center mb-6">
                <FaWhatsapp className="text-[#25D366] text-5xl" />
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-black text-navy dark:text-white mb-4">
                تواصل مباشر عبر واتساب
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8 max-w-sm">
                الطريقة الأسرع! اضغط على الزر أدناه لبدء محادثة فورية معنا. فريقنا جاهز للرد على استفساراتك وتقديم عرض السعر المناسب.
              </p>

              <a
                href={socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-sm bg-[#25D366] text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-[#20bd5a] transition-all hover:scale-105 shadow-lg shadow-green-500/30"
              >
                <FaWhatsapp size={26} />
                ابدأ محادثة الآن
              </a>
              
              <p className="text-xs text-gray-400 mt-4">متاحون للرد خلال ساعات العمل</p>
            </div>
          </motion.div>

          {/* العمود الثاني: معلومات التواصل ومواعيد العمل */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 flex flex-col justify-between"
          >
            {/* معلومات التواصل */}
            <div className="bg-cream dark:bg-navy p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <h3 className="text-lg sm:text-xl font-bold text-navy dark:text-white mb-6 flex items-center gap-2">
                <FiMail className="text-gold" /> معلومات التواصل
              </h3>
              <div className="space-y-4">
                {/* البريد الإلكتروني */}
                <a
                  href={`mailto:${socialLinks.email}`}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-white dark:hover:bg-navy-lighter transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center group-hover:bg-gold transition-colors flex-shrink-0">
                    <FiMail className="text-gold group-hover:text-navy transition-colors text-xl" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-gray-400 mb-1">البريد الإلكتروني</div>
                    <div className="text-navy dark:text-white font-medium text-sm sm:text-base truncate" dir="ltr">
                      {socialLinks.email}
                    </div>
                  </div>
                </a>

                {/* رقم الواتساب */}
                <a
                  href={socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-white dark:hover:bg-navy-lighter transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center group-hover:bg-gold transition-colors flex-shrink-0">
                    <FiPhone className="text-gold group-hover:text-navy transition-colors text-xl" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-gray-400 mb-1">رقم الواتساب</div>
                    <div className="text-navy dark:text-white font-medium text-sm sm:text-base" dir="ltr">
                      +967 775 307 315
                    </div>
                  </div>
                </a>

                {/* الموقع */}
                <div className="flex items-center gap-4 p-3 rounded-xl">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <FiMapPin className="text-gold text-xl" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">الموقع</div>
                    <div className="text-navy dark:text-white font-medium text-sm sm:text-base">اليمن</div>
                  </div>
                </div>
              </div>
            </div>

            {/* مواعيد العمل */}
            <WorkHours />

            {/* أيقونات التواصل الاجتماعي */}
            <div className="bg-cream dark:bg-navy p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <h3 className="text-lg sm:text-xl font-bold text-navy dark:text-white mb-4">تابعنا على</h3>
              <div className="flex gap-3">
                {/* 👈 تم إصلاح الخطأ هنا باستخدام {const Icon = social.icon} */}
                {[
                  { icon: FiFacebook, href: socialLinks.facebook, color: "#1877f2" },
                  { icon: FaXTwitter, href: socialLinks.x, color: "#000" },
                  { icon: FiInstagram, href: socialLinks.instagram, color: "#e4405f" },
                  { icon: FaWhatsapp, href: socialLinks.whatsapp, color: "#25d366" },
                ].map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.href}
                      href={social.href}
                      target="_blank"
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-xl bg-white dark:bg-navy-lighter flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-white shadow-sm transition-colors"
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = social.color; e.currentTarget.style.color = "white"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ""; e.currentTarget.style.color = ""; }}
                    >
                      <Icon size={20} />
                    </motion.a>
                  );
                })}
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
