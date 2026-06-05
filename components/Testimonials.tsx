"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiStar } from "react-icons/fi";
import { FaStarHalfAlt, FaQuoteRight } from "react-icons/fa";

const testimonials = [
  {
    name: "أحمد محمد",
    role: "صاحب شركة تقنية",
    text: "صلاح بلس قدم لنا هوية بصرية احترافية فاقت توقعاتنا. العمل سريع والجودة عالية.",
    stars: 4.5,
    image: "/clients/client1.jpg",
  },
  {
    name: "نورة علي",
    role: "مديرة تسويق",
    text: "العروض التقديمية اللي سواها لنا كانت مبهرة. أنصح به وبقوة.",
    stars: 4.5,
    image: "/clients/client2.jpg",
  },
  {
    name: "خالد العمري",
    role: "رائد أعمال",
    text: "خدمات الذكاء الاصطناعي اللي قدمها ساعدتنا نوفر وقت وجهد كبير. شكراً صلاح بلس.",
    stars: 4.5,
    image: "/clients/client3.jpg",
  },
];

function TestimonialCard({ item, index }: { item: typeof testimonials[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.2,
        ease: [0.25, 0.1, 0.25, 1] 
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-white dark:bg-navy-lighter p-6 sm:p-8 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-gold/30 hover:shadow-2xl hover:shadow-gold/5 transition-all flex flex-col relative overflow-hidden"
    >
      {/* أيقونة الاقتباس في الخلفية */}
      <FaQuoteRight className="absolute -top-4 -left-4 text-6xl text-gold/10 dark:text-gold/5" />

      {/* النجوم + التقييم */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
        className="flex items-center gap-2 mb-4"
      >
        <div className="flex gap-0.5">
          {Array.from({ length: Math.floor(item.stars) }).map((_, i) => (
            <motion.div
              key={`full-${i}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: index * 0.2 + 0.5 + i * 0.1 }}
            >
              <FiStar className="text-gold fill-gold text-2xl" />
            </motion.div>
          ))}
          {item.stars % 1 !== 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: index * 0.2 + 1 }}
            >
              <FaStarHalfAlt className="text-gold fill-gold text-2xl transform -scale-x-100" />
            </motion.div>
          )}
        </div>
        <motion.span 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.2 + 0.8 }}
          className="text-gold font-bold text-lg"
        >
          {item.stars}
        </motion.span>
      </motion.div>

      {/* نص الرأي */}
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.2 + 0.6 }}
        className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-grow relative z-10"
      >
        <span className="text-gold text-3xl font-bold leading-none align-middle">"</span>
        {item.text}
        <span className="text-gold text-3xl font-bold leading-none align-middle">"</span>
      </motion.p>

      {/* صورة العميل + الاسم */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: index * 0.2 + 0.9 }}
        className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700"
      >
        <motion.img
          whileHover={{ scale: 1.1, rotate: 5 }}
          src={item.image}
          alt={item.name}
          className="w-10 h-10 rounded-full object-cover border-2 border-gold flex-shrink-0"
        />
        <div className="min-w-0">
          <div className="font-bold text-navy dark:text-white text-sm truncate">
            {item.name}
          </div>
          <div className="text-xs text-gray-400 truncate">
            {item.role}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-20 md:py-28 bg-cream dark:bg-navy overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gold text-sm font-bold tracking-widest uppercase mb-4 block"
          >
            آراء العملاء
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy dark:text-white mb-4"
          >
            ماذا يقول <span className="gradient-text">عملاؤنا</span>
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "5rem" }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="h-0.5 bg-gold mx-auto rounded-full" 
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <TestimonialCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
