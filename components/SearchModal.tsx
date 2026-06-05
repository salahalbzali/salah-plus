"use client";

import { useState } from "react";
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

  const getAllSearchData = (): SearchResult[] => {
    const data: SearchResult[] = [];

    services.forEach((s) => {
      data.push({
        title: s.title,
        type: "خدمة",
        href: "/#services",
        text: `${s.title} ${s.description} ${s.features.join(" ")}`,
      });
    });

    portfolioItems.forEach((p) => {
      data.push({
        title: p.title,
        type: "مشروع",
        href: "/#portfolio",
        text: `${p.title} ${p.description} ${p.category} ${p.tags.join(" ")}`,
      });
    });

    articles.forEach((a) => {
      data.push({
        title: a.title,
        type: "مقال",
        href: `/blog/${a.id}`,
        text: `${a.title} ${a.excerpt} ${a.category}`,
      });
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
    setResults(filtered.slice(0, 8));
  };

  const handleClick = (href: string) => {
    setOpen(false);
    setQuery("");
    setResults([]);
    window.location.href = href;
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
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setOpen(false); setQuery(""); setResults([]); }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-lg"
              dir="rtl"
            >
              <div className="bg-white dark:bg-navy rounded-2xl shadow-2xl overflow-hidden">
                <div className="flex items-center gap-3 p-4 border-b border-gray-100 dark:border-gray-700">
                  <FiSearch className="text-gold text-xl flex-shrink-0" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="ابحث عن أي خدمة، مشروع، مقال..."
                    className="flex-1 bg-transparent text-navy dark:text-white text-lg outline-none"
                    autoFocus
                  />
                  <button
                    onClick={() => { setOpen(false); setQuery(""); setResults([]); }}
                    className="text-gray-400 hover:text-gold"
                  >
                    <FiX size={20} />
                  </button>
                </div>

                {results.length > 0 && (
                  <div className="p-2 max-h-80 overflow-y-auto">
                    {results.map((item, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleClick(item.href)}
                        className="w-full text-right p-3 rounded-xl hover:bg-gold/5 transition-colors flex items-center justify-between group"
                      >
                        <div>
                          <div className="text-navy dark:text-white font-medium text-sm">
                            {item.title}
                          </div>
                          <div className="text-xs text-gray-400 mt-0.5">
                            {item.type}
                          </div>
                        </div>
                        <FiArrowLeft className="text-gray-400 group-hover:text-gold transition-colors flex-shrink-0" />
                      </motion.button>
                    ))}
                  </div>
                )}

                {query && results.length === 0 && (
                  <div className="p-8 text-center text-gray-400">
                    لا توجد نتائج لـ "{query}"
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
