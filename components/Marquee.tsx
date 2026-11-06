"use client";

import { motion } from "framer-motion";

export default function Marquee() {
  const text = "🚚 توصيل لجميع المحافظات  •  💳 دفع آمن عبر المحافظ الإلكترونية  •  🎁 خصم خاص عند شراء المجموعة  •  🎓 جودة تعليمية مضمونة";
  
  return (
    <div className="bg-gold text-navy py-2 overflow-hidden flex whitespace-nowrap relative z-40">
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
        className="font-bold text-sm flex gap-8"
      >
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </motion.div>
    </div>
  );
}
