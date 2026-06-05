"use client";

import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";

const testimonials = [
  {
    name: "أحمد محمد",
    role: "صاحب شركة تقنية",
    text: "صلاح بلس قدم لنا هوية بصرية احترافية فاقت توقعاتنا. العمل سريع والجودة عالية.",
    stars: 5,
  },
  {
    name: "نورة علي",
    role: "مديرة تسويق",
    text: "العروض التقديمية اللي سواها لنا كانت مبهرة. أنصح به وبقوة.",
    stars: 5,
  },
  {
    name: "خالد العمري",
    role: "رائد أعمال",
    text: "خدمات الذكاء الاصطناعي اللي قدمها ساعدتنا نوفر وقت وجهد كبير. شكراً صلاح بلس.",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-20 md:py-28 bg-cream dark:bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-gold text-sm font-bold tracking-widest uppercase mb-4 block">
            آراء العملاء
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy dark:text-white mb-4">
            ماذا يقول <span className="gradient-text">عملاؤنا</span>
          </h2>
          <div className="w-16 sm:w-20 h-0.5 bg-gold mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white dark:bg-navy-lighter p-6 sm:p-8 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-gold/30 transition-all"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: item.stars }).map((_, i) => (
                  <FiStar key={i} className="text-gold fill-gold" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                "{item.text}"
              </p>
              <div>
                <div className="font-bold text-navy dark:text-white">{item.name}</div>
                <div className="text-xs text-gray-400">{item.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
