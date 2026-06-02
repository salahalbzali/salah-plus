"use client";

import { motion } from "framer-motion";
import { blogPosts } from "@/lib/data";
import { FiCalendar, FiClock, FiArrowLeft } from "react-icons/fi";

export default function Blog() {
  return (
    <section id="blog" className="py-16 sm:py-20 md:py-28 bg-cream dark:bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-gold text-xs sm:text-sm font-bold tracking-widest uppercase mb-3 sm:mb-4 block">
            المدونة
          </span>
          <h2 className="section-title text-navy dark:text-white">
            أحدث <span className="gradient-text">المقالات</span>
          </h2>
          <div className="gold-line" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -6 }}
              className="group bg-white dark:bg-navy-lighter rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-gold/30 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="h-40 sm:h-48 bg-gradient-to-br from-navy-light to-navy-lighter flex items-center justify-center relative overflow-hidden">
                <span className="text-5xl sm:text-6xl font-black text-gold/20">
                  {post.title.charAt(0)}
                </span>
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                  <span className="px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-gold text-navy">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-xs text-gray-400 mb-2 sm:mb-3">
                  <span className="flex items-center gap-1">
                    <FiCalendar size={12} />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiClock size={12} />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-navy dark:text-white mb-2 sm:mb-3 group-hover:text-gold transition-colors duration-300">
                  {post.title}
                </h3>

                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                  {post.excerpt}
                </p>

                <motion.a
                  href="#"
                  whileHover={{ x: -5 }}
                  className="inline-flex items-center gap-2 text-gold font-bold text-xs sm:text-sm group/link"
                >
                  اقرأ المزيد
                  <FiArrowLeft className="group-hover/link:-translate-x-1 transition-transform" />
                </motion.a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}