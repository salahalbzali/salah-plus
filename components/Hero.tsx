"use client";

import { motion } from "framer-motion";
import { FiArrowLeft, FiEye } from "react-icons/fi";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden
                 bg-cream dark:bg-navy pt-14 sm:pt-16 md:pt-20"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-48 h-48 sm:w-72 md:w-96 sm:h-72 md:h-96 rounded-full
                     bg-gold/5 dark:bg-gold/10 blur-3xl"
        />
        <motion.div
          animate={{ rotate: [360, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-48 h-48 sm:w-72 md:w-96 sm:h-72 md:h-96 rounded-full
                     bg-gold/5 dark:bg-gold/10 blur-3xl"
        />
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(circle, #D4AF37 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center lg:text-right order-2 lg:order-1"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full
                         bg-gold/10 border border-gold/20 mb-4 sm:mb-6"
            >
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gold rounded-full animate-pulse" />
              <span className="text-gold text-xs sm:text-sm font-medium">
                حلول إبداعية وتقنية
              </span>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4 sm:mb-6">
              <span className="text-navy dark:text-white">نحول أفكارك إلى </span>
              <span className="gradient-text">تصاميم احترافية</span>
            </h1>

            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
              نقدم حلولاً تقنية وإبداعية متكاملة تساعدك على الظهور بأفضل صورة وتحقيق أهدافك بكفاءة واحترافية.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center gap-2 group"
              >
                اطلب خدمة
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              </motion.a>
              <motion.a
                href="#portfolio"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline flex items-center gap-2"
              >
                <FiEye />
                معرض الأعمال
              </motion.a>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-4 sm:gap-6 mt-8 sm:mt-10 justify-center lg:justify-start">
              {[
                { value: "500+", label: "مشروع" },
                { value: "300+", label: "عميل" },
                { value: "7", label: "خدمات" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-black text-gold">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex justify-center order-1 lg:order-2"
          >
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.7, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-gold-gradient rounded-full blur-3xl opacity-50"
              />

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96
                           rounded-full overflow-hidden border-4 border-gold/30
                           shadow-2xl shadow-gold/20"
              >
                <Image
                  src="/profile.jpg"
                  alt="صلاح بلس"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, (max-width: 1024px) 288px, (max-width: 1280px) 320px, 384px"
                  priority
                />

                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-2 sm:-inset-4 rounded-full border-2 border-dashed
                             border-gold/30 pointer-events-none"
                />
              </motion.div>

              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-2 sm:-bottom-4 left-1/2 -translate-x-1/2
                           bg-white dark:bg-navy-lighter shadow-xl rounded-xl sm:rounded-2xl
                           px-4 sm:px-6 py-2 sm:py-3 flex items-center gap-2 sm:gap-3 border border-gold/20"
              >
                <span className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs sm:text-sm font-bold text-navy dark:text-white whitespace-nowrap">
                  متاح للعمل الحر
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 sm:gap-2"
      >
        <span className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500">
          اسحب للأسفل
        </span>
        <div className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border-2 border-gold/30 flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 sm:w-1.5 sm:h-3 bg-gold rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}