"use client";

import { motion } from "framer-motion";
import { services } from "@/lib/data";
import { FiCheck, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function Services({ limit }: { limit?: number }) {
  // إذا تم تمرير limit، نعرض عدداً محدوداً، وإلا نعرض الكل
  const displayedServices = limit ? services.slice(0, limit) : services;

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
          {displayedServices.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="h-full rounded-2xl bg-white dark:bg-navy-lighter border border-gray-100 dark:border-gray-800 hover:border-gold/40 shadow-sm hover:shadow-2xl hover:shadow-gold/5 transition-all duration-500 flex flex-col overflow-hidden">
                  
                  {/* 👈 إعادة صورة الخدمة هنا */}
                  <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden bg-navy-light">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    {/* الأيقونة */}
                    <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold group-hover:text-navy transition-all duration-500 -mt-12 relative z-10 border-4 border-white dark:border-navy-lighter">
                      <Icon className="text-gold text-2xl group-hover:text-navy transition-colors duration-500" />
                    </div>

                    {/* العنوان */}
                    <h3 className="text-xl font-bold text-navy dark:text-white mb-3 group-hover:text-gold transition-colors duration-300">
                      {service.title}
                    </h3>

                    {/* الوصف */}
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-5 flex-grow">
                      {service.description}
                    </p>

                    {/* المميزات */}
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
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

        {/* 👈 زر عرض المزيد (يظهر فقط في الصفحة الرئيسية) */}
        {limit && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/services" className="btn-outline inline-flex items-center gap-2 group">
              استكشف جميع الخدمات
              <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
