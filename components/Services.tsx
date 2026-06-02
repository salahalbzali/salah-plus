"use client";

import { motion } from "framer-motion";
import { services } from "@/lib/data";
import { FiCheck } from "react-icons/fi";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function Services() {
  return (
    <section id="services" className="py-16 sm:py-20 md:py-28 bg-cream dark:bg-navy relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 sm:w-72 h-48 sm:h-72 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-gold/3 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-gold text-xs sm:text-sm font-bold tracking-widest uppercase mb-3 sm:mb-4 block">
            ماذا نقدم؟
          </span>
          <h2 className="section-title text-navy dark:text-white">
            خدماتنا <span className="gradient-text">المتكاملة</span>
          </h2>
          <div className="gold-line" />
          <p className="section-subtitle">
            نقدم مجموعة متكاملة من الخدمات الإبداعية والتقنية المصممة خصيصاً لتلبية احتياجاتك وتفوق توقعاتك
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="h-full rounded-2xl bg-white dark:bg-navy-lighter border border-gray-100 dark:border-gray-800 hover:border-gold/40 shadow-sm hover:shadow-2xl hover:shadow-gold/5 transition-all duration-500 flex flex-col overflow-hidden">
                  
                  {/* صورة الخدمة */}
                  <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden bg-navy-light">
                    <div className="w-full h-full flex items-center justify-center text-gold/20 text-5xl sm:text-6xl font-black">
                      {service.title.charAt(0)}
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 md:p-8 flex flex-col flex-grow">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gold/10 flex items-center justify-center mb-4 sm:mb-5 group-hover:bg-gold group-hover:text-navy transition-all duration-500 -mt-8 sm:-mt-10 relative z-10">
                      <Icon className="text-gold text-xl sm:text-2xl group-hover:text-navy transition-colors duration-500" />
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-navy dark:text-white mb-2 sm:mb-3 group-hover:text-gold transition-colors duration-300">
                      {service.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5 flex-grow">
                      {service.description}
                    </p>

                    <ul className="space-y-1.5 sm:space-y-2">
                      {service.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400"
                        >
                          <FiCheck className="text-gold flex-shrink-0" />
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10 sm:mt-12"
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base mb-4">
            لم تجد ما تبحث عنه؟ تواصل معنا وسنصمم لك حلاً مخصصاً
          </p>
          <a href="#contact" className="btn-outline inline-flex items-center gap-2">
            اطلب خدمة مخصصة
          </a>
        </motion.div>
      </div>
    </section>
  );
}