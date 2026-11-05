"use client";

import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import { booksData } from "@/lib/books";

export default function FeaturedBooks() {
  const books = booksData.slice(0, 4);

  return (
    <section className="py-16 sm:py-20 md:py-28 bg-cream dark:bg-navy relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-gold text-sm font-bold tracking-widest uppercase mb-4 block">إصداراتنا</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy dark:text-white mb-4">أحدث <span className="gradient-text">الكتب</span></h2>
          <div className="w-20 h-0.5 bg-gold mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {books.map((book, index) => (
            <motion.div key={book.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-white dark:bg-navy-lighter rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
              <Link href={`/store/${book.id}`} className="block relative aspect-square w-full bg-gray-100 dark:bg-gray-800">
                <img src={book.image_url} alt={book.title} className="w-full h-full object-cover" />
              </Link>
              <div className="p-5 flex flex-col flex-grow">
                <Link href={`/store/${book.id}`}>
                  <h3 className="font-bold text-navy dark:text-white text-lg mb-1 line-clamp-1 hover:text-gold transition-colors">{book.title}</h3>
                </Link>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{book.author}</p>
                <div className="mt-auto flex items-center justify-between">
                  <div className="text-lg font-black text-gold">{book.price} <span className="text-xs">جنيهاً</span></div>
                  <Link href={`/store/${book.id}`} className="text-sm font-bold text-navy dark:text-white bg-gold/10 px-3 py-1 rounded-lg hover:bg-gold hover:text-navy transition-colors">التفاصيل</Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/store" className="inline-flex items-center gap-2 bg-gold text-navy font-bold py-3 px-8 rounded-full hover:bg-gold-dark transition-colors shadow-lg shadow-gold/20 group">
            تصفح كل الكتب
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
