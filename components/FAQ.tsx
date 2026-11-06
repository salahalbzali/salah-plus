"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi"; // 👈 استبدلنا الأيقونات بهذه
import { faqs } from "@/lib/data";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-20 md:py-28 bg-white dark:bg-navy-lighter relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* عنوان القسم */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-gold text-sm font-bold tracking-widest uppercase mb-4 block">
            الأسئلة الشائعة
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy dark:text-white mb-4">
            هل لديك <span className="gradient-text">استفسارات؟</span>
          </h2>
          <div className="w-20 h-0.5 bg-gold mx-auto rounded-full" />
        </motion.div>

        {/* قائمة الأسئلة */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                openIndex === index
                  ? "border-gold/50 bg-cream dark:bg-navy shadow-md"
                  : "border-gray-200 dark:border-gray-800 bg-transparent hover:border-gold/30"
              }`}
            >
              {/* السؤال */}
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-right focus:outline-none"
              >
                <span className={`text-lg font-bold transition-colors ${openIndex === index ? "text-gold" : "text-navy dark:text-white"}`}>
                  {faq.question}
                </span>
                
                {/* 👈 السهم الذي يدور عند الفتح */}
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                    openIndex === index ? "bg-gold text-navy" : "bg-gray-100 dark:bg-navy text-gray-500"
                  }`}
                >
                  <FiChevronDown size={20} />
                </motion.div>
              </button>

              {/* الجواب (قائمة منسدلة) */}
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-5 sm:px-6 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-800 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
