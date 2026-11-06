"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioItems } from "@/lib/data";
import { FiExternalLink } from "react-icons/fi";
import Link from "next/link"; // 👈 استيراد Link

const categories = ["الكل", "هوية بصرية", "تصميم جرافيكي", "كتب تعليمية", "عروض تقديمية", "ذكاء اصطناعي", "خدمات مكتبية"];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("الكل");

  const filteredItems =
    activeCategory === "الكل"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <section id="portfolio" className="py-16 sm:py-20 md:py-28 bg-white dark:bg-navy-lighter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12"
        >
          <span className="text-gold text-xs sm:text-sm font-bold tracking-widest uppercase mb-3 sm:mb-4 block">
            معرض الأعمال
          </span>
          <h2 className="section-title text-navy dark:text-white">
            أحدث <span className="gradient-text">مشاريعنا</span>
          </h2>
          <div className="gold-line" />
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gold-gradient text-navy shadow-lg shadow-gold/20"
                  : "bg-cream dark:bg-navy text-gray-600 dark:text-gray-400 hover:bg-gold/10"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="relative rounded-2xl overflow-hidden bg-navy-gradient cursor-pointer aspect-[4/3] group"
              >
                {/* 👈 ربط البطاقة بالكامل بصفحة التفاصيل */}
                <Link href={`/portfolio/${item.id}`} className="block w-full h-full">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* 👈 طبقة التفاصيل: تظهر دائماً في الجوال، وعند التمرير في الكمبيوتر */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-transparent lg:bg-navy/90 
                                  flex flex-col items-center justify-center p-4 sm:p-6 text-center 
                                  transition-opacity duration-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100">
                    <span className="text-gold text-xs font-bold tracking-wider mb-2">
                      {item.category}
                    </span>
                    <h3 className="text-white text-lg sm:text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-300 text-xs sm:text-sm mb-4 line-clamp-2">{item.description}</p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center mb-4">
                      {item.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs bg-gold/20 text-gold">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* الزر الأصفر (تحول إلى div لأن البطاقة كلها أصبحت Link) */}
                    <div className="mt-2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gold flex items-center justify-center text-navy shadow-lg group-hover:scale-110 transition-transform">
                      <FiExternalLink size={20} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
