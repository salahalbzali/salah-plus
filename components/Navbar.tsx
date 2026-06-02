"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "#home", label: "الرئيسية" },
  { href: "#services", label: "الخدمات" },
  { href: "#portfolio", label: "أعمالنا" },
  { href: "#blog", label: "المدونة" },
  { href: "#contact", label: "تواصل معنا" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/90 dark:bg-navy/95 backdrop-blur-xl shadow-lg shadow-gold/5"
            : "bg-transparent"
        }`}
        dir="rtl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
            {/* Logo */}
            <Link href="#home" className="flex items-center gap-2 sm:gap-3 group">
              <motion.div
                whileHover={{ rotate: -10, scale: 1.1 }}
                className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl overflow-hidden shadow-lg shadow-gold/30"
              >
                <Image
                  src="/logo.png"
                  alt="صلاح بلس"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 32px, 40px"
                />
              </motion.div>
              <div className="flex flex-col">
                <span className="font-bold text-base sm:text-lg md:text-xl text-navy dark:text-white leading-tight">
                  صلاح
                </span>
                <span className="text-[10px] sm:text-xs text-gold font-bold tracking-wider">
                  بلس
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-3 xl:px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300
                             hover:text-gold dark:hover:text-gold transition-colors duration-300 group"
                >
                  {link.label}
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5
                                 bg-gold-gradient rounded-full transition-all duration-300
                                 group-hover:w-3/4"
                  />
                </Link>
              ))}
              <div className="mr-2 xl:mr-4">
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle />
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center
                           bg-gray-100 dark:bg-navy-lighter text-navy dark:text-white"
                aria-label={isMobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
              >
                {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] sm:w-80 bg-white dark:bg-navy
                         shadow-2xl z-50 lg:hidden overflow-y-auto safe-bottom"
              dir="rtl"
            >
              <div className="p-5 sm:p-6 pt-16 sm:pt-20">
                {/* شعار القائمة الجوال */}
                <div className="flex items-center gap-3 mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="relative w-10 h-10 rounded-xl overflow-hidden">
                    <Image
                      src="/logo.png"
                      alt="صلاح بلس"
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div>
                    <span className="font-bold text-lg text-navy dark:text-white">صلاح</span>
                    <span className="text-xs text-gold font-bold block">بلس</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1 sm:gap-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-3 sm:py-4 px-4 sm:px-6 text-base sm:text-lg font-medium
                                   text-gray-700 dark:text-gray-300
                                   hover:text-gold dark:hover:text-gold rounded-xl
                                   hover:bg-gold/5 transition-all duration-300"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}