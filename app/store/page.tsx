"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiInfo, FiSearch } from "react-icons/fi";
import Link from "next/link";
import { booksData } from "@/lib/books";

export default function StorePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = booksData.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-cream dark:bg-navy pt-24 pb-16" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-gold text-sm font-bold tracking-widest uppercase mb-4 block">متجر صلاح بلس</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy dark:text-white mb-4">الكتب <span className="gradient-text">التعليمية</span></h1>
          <div className="w-20 h-0.5 bg-gold mx-auto rounded-full" />
        </div>

        <div className="max-w-xl mx-auto mb-12 relative">
          <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="ابحث عن كتاب أو مؤلف..." className="w-full pl-4 pr-12 py-4 rounded-2xl bg-white dark:bg-navy-lighter border border-gray-200 dark:border-gray-800 focus:border-gold outline-none text-navy dark:text-white shadow-sm transition-colors" />
        </div>

        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <motion.div key={book.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-navy-lighter rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="relative aspect-square w-full bg-gray-100 dark:bg-gray-800">
                  <img src={book.image_url} alt={book.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-bold text-navy dark:text-white text-lg mb-1 line-clamp-1">{book.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{book.author}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="text-xl font-black text-gold">{book.price} <span className="text-sm">جنيهاً</span></div>
                    <Link href={`/store/${book.id}`} className="bg-gold/10 text-gold p-2 rounded-xl hover:bg-gold hover:text-navy transition-colors"><FiInfo size={20} /></Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : ( <div className="text-center py-20 text-gray-500">لا توجد كتب تطابق بحثك "{searchQuery}"</div> )}
      </div>
    </div>
  );
}
