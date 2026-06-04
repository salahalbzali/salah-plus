"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUp } from "react-icons/fi";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [settings, setSettings] = useState({
    showAfter: 400,
    bottom: 80,  // 👈 المسافة من الأسفل (تم تعديلها)
  });

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        if (data.scrollToTop) {
          setSettings({
            showAfter: data.scrollToTop.showAfter || 400,
            bottom: data.scrollToTop.bottom || 80,
          });
        }
      } catch (error) {
        // استخدام القيم الافتراضية
      }
    }
    fetchSettings();
  }, []);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > settings.showAfter);
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [settings.showAfter]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          style={{ bottom: `${settings.bottom}px` }}
          className="fixed left-4 sm:left-8 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full
                     bg-gold-gradient text-navy shadow-lg shadow-gold/20
                     flex items-center justify-center
                     hover:shadow-xl transition-shadow duration-300"
          aria-label="الرجوع إلى الأعلى"
        >
          <FiArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
