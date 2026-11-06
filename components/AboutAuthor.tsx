"use client";

import { motion } from "framer-motion";

export default function AboutAuthor() {
  return (
    <section className="py-16 sm:py-20 md:py-28 bg-white dark:bg-navy-lighter relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full md:w-1/3 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden border-4 border-gold/30 shadow-2xl">
              <img src="/profile.jpg" alt="المؤلف" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full md:w-2/3 text-center md:text-right">
            <span className="text-gold text-sm font-bold tracking-widest uppercase mb-4 block">عن المؤلف</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy dark:text-white mb-6">م. صلاح عبده البزالي</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-loose mb-6">
              مهندس ومصمم، متخصص في تبسيط العلوم التقنية والبرمجية. أؤمن بأن المعرفة يجب أن تُقدم بطريقة إبداعية وسهلة للجميع. من خلال هذه الإصدارات، أهدف إلى أخذ بيد المبتدئين والمحترفين في رحلة ممتعة لاحتراف البرمجة والذكاء الاصطناعي.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="bg-cream dark:bg-navy px-6 py-3 rounded-xl border border-gray-100 dark:border-gray-800 text-center">
                <span className="block text-2xl font-black text-gold">+10</span>
                <span className="text-xs text-gray-500">سنوات خبرة</span>
              </div>
              <div className="bg-cream dark:bg-navy px-6 py-3 rounded-xl border border-gray-100 dark:border-gray-800 text-center">
                <span className="block text-2xl font-black text-gold">+4</span>
                <span className="text-xs text-gray-500">إصدارات تعليمية</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
