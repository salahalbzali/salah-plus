"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiX, FiArrowLeft } from "react-icons/fi";
import { services, portfolioItems } from "@/lib/data";
import { articles } from "@/lib/articles";

interface SearchResult {
  title: string;
  type: string;
  href: string;
  text: string;
}

export default function SearchModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (!open) return;
    const handleScroll = () => {
      setOpen(false);
      setQuery("");
      setResults([]);
    };
    window.addEventListener("scroll", handleScroll, { once: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const getAllSearchData = (): SearchResult[] => {
    const data: SearchResult[] = [];
    services.forEach((s) => {
      data.push({ title: s.title, type: "خدمة", href: "/#services", text: `${s.title} ${s.description} ${s.features.join(" ")}` });
    });
    portfolioItems.forEach((p) => {
      data.push({ title: p.title, type: "مشروع", href: "/#portfolio", text: `${p.title} ${p.description} ${p.category} ${p.tags.join(" ")}` });
    });
    articles.forEach((a) => {
      data.push({ title: a.title, type: "مقال", href: `/blog/${a.id}`, text: `${a.title} ${a.excerpt} ${a.category}` });
    });
    data.push(
      { title: "الرئيسية", type: "قسم", href: "/#home", text: "الرئيسية" },
      { title: "الخدمات", type: "قسم", href: "/#services", text: "الخدمات" },
      { title: "معرض الأعمال", type: "قسم", href: "/#portfolio", text: "معرض الأعمال" },
      { title: "المدونة", type: "قسم", href: "/#blog", text: "المدونة" },
      { title: "تواصل معنا", type: "قسم", href: "/#contact", text: "تواصل معنا" },
    );
    return data;
  };

  const allData = getAllSearchData();

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.trim().length < 1) {
      setResults([]);
      return;
    }
    const filtered = allData.filter((item) =>
      item.text.toLowerCase().includes(value.toLowerCase())
    );
    setResults(filtered.slice(0, 5));
  };

  const handleClick = (href: string) => {
    setOpen(false);
    setQuery("");
    setResults([]);
    setTimeout(() => { window.location.href = href; }, 200);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-2 rounded-xl hover:bg-gold/10 transition-colors"
        aria-label="بحث"
      >
        <FiSearch className="text-gray-700 dark:text-gray-300 text-lg" />
      </button>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 sm:pt-28 px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setOpen(false); setQuery(""); setResults([]); }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md bg-white dark:bg-navy rounded-2xl shadow-2xl overflow-hidden"
              dir="rtl"
            >
              {/* حقل البحث - صغير وأنيق */}
              <div className="flex items-center gap-2 px-4 py-3">
                <FiSearch className="text-gold text-base flex-shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="بحث..."
                  className="flex-1 bg-transparent text-navy dark:text-white text-sm outline-none placeholder-gray-400"
                  autoFocus
                />
                {query && (
                  <button
                    onClick={() => { setQuery(""); setResults([]); }}
                    className="text-gray-400 hover:text-gold p-1"
                  >
                    <FiX size={16} />
                  </button>
                )}
              </div>

              {/* نتائج البحث - مريحة وأنيقة */}
              {results.length > 0 && (
                <div className="border-t border-gray-100 dark:border-gray-800 max-h-64 overflow-y-auto">
                  {results.map((item, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.04 }}
                      onClick={() => handleClick(item.href)}
                      className="w-full text-right px-4 py-3 hover:bg-gold/5 transition-colors flex items-center gap-3 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-gold text-xs font-bold">
                          {item.type === "خدمة" ? "خ" : item.type === "مقال" ? "م" : item.type === "مشروع" ? "ع" : "ق"}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-navy dark:text-white text-sm font-medium truncate">
                          {item.title}
                        </div>
                        <div className="text-xs text-gray-400">
                          {item.type}
                        </div>
                      </div>
                      <FiArrowLeft className="text-gray-300 group-hover:text-gold transition-colors flex-shrink-0 text-sm" />
                    </motion.button>
                  ))}
                </div>
              )}

              {query && results.length === 0 && (
                <div className="border-t border-gray-100 dark:border-gray-800 p-6 text-center">
                  <p className="text-gray-400 text-sm">لا توجد نتائج</p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
