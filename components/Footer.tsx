"use client";

import { motion } from "framer-motion";
import { FiFacebook, FiInstagram, FiHeart } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { socialLinks } from "@/lib/data";
import Image from "next/image";

const footerLinks = [
  {
    title: "روابط سريعة",
    links: [
      { label: "الرئيسية", href: "/#home" },
      { label: "الخدمات", href: "/#services" },
      { label: "أعمالنا", href: "/#portfolio" },
      { label: "المدونة", href: "/#blog" },
      { label: "تواصل معنا", href: "/#contact" },
    ],
  },
  {
    title: "خدماتنا",
    links: [
      { label: "التصميم الجرافيكي", href: "/#services" },
      { label: "الهويات البصرية", href: "/#services" },
      { label: "العروض التقديمية", href: "/#services" },
      { label: "حلول الذكاء الاصطناعي", href: "/#services" },
      { label: "الدعم التقني", href: "/#services" },
    ],
  },
];

const socialIcons = [
  { icon: FiFacebook, href: socialLinks.facebook, label: "فيسبوك" },
  { icon: FaXTwitter, href: socialLinks.x, label: "إكس" },
  { icon: FiInstagram, href: socialLinks.instagram, label: "إنستغرام" },
  { icon: FaWhatsapp, href: socialLinks.whatsapp, label: "واتساب" },
];

export default function Footer() {
  return (
    <footer className="bg-navy dark:bg-black text-white relative overflow-hidden">
      <div className="h-1 bg-gold-gradient" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl overflow-hidden">
                <Image
                  src="/public/logo.png"
                  alt="صلاح بلس"
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
              <div>
                <span className="font-bold text-lg sm:text-xl text-white">صلاح</span>
                <span className="text-gold text-xs sm:text-sm font-bold block">بلس</span>
              </div>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
              حلول إبداعية وتقنية متكاملة تساعدك على الظهور بأفضل صورة وتحقيق أهدافك بكفاءة واحترافية.
            </p>
            <div className="flex gap-2">
              {socialIcons.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/10 flex items-center justify-center text-gray-400 hover:text-gold hover:bg-gold/20 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={14} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h4 className="text-white font-bold mb-3 sm:mb-4 text-base sm:text-lg">{column.title}</h4>
              <ul className="space-y-2 sm:space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-gold text-xs sm:text-sm transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-gray-400 text-xs sm:text-sm flex items-center gap-1">
            جميع الحقوق محفوظة © {new Date().getFullYear()}
            <span className="text-gold font-bold"> صلاح بلس</span>
          </p>
          <p className="text-gray-500 text-xs sm:text-sm flex items-center gap-1">
            صُنع بـ
            <FiHeart className="text-red-500 animate-pulse" />
            باستخدام
            <span className="text-gold"> Next.js</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
