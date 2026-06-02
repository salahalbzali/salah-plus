"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useCountUp } from "@/hooks/useCountUp";
import { stats } from "@/lib/data";
import { FiBriefcase, FiUsers, FiGrid } from "react-icons/fi";

const icons = [FiBriefcase, FiUsers, FiGrid];

export default function Stats() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white dark:bg-navy-lighter relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "linear-gradient(45deg, #D4AF37 1px, transparent 1px)",
            backgroundSize: "25px 25px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((stat, index) => {
            const count = useCountUp(stat.value, 2.5, inView);
            const Icon = icons[index];

            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="relative group"
              >
                <div className="text-center p-6 sm:p-8 rounded-2xl bg-cream dark:bg-navy border border-gray-100 dark:border-gray-800 hover:border-gold/30 transition-all duration-500">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-12 h-12 sm:w-14 md:w-16 sm:h-14 md:h-16 mx-auto mb-3 sm:mb-4 rounded-2xl bg-gold/10 flex items-center justify-center"
                  >
                    <Icon className="text-gold text-xl sm:text-2xl" />
                  </motion.div>

                  <motion.div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-navy dark:text-white mb-2">
                    {stat.prefix}
                    <motion.span>{count}</motion.span>
                    {stat.suffix}
                  </motion.div>

                  <div className="text-gray-500 dark:text-gray-400 text-sm sm:text-base md:text-lg font-medium">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}