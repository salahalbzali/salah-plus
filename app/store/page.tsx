"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiShoppingCart, FiStar } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { booksData, Book } from "@/lib/books";
import { useCurrency } from "@/lib/CurrencyContext";
import { useCart } from "@/lib/CartContext";
import CurrencySwitcher from "@/components/CurrencySwitcher";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function StorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();
  const router = useRouter();

  const filteredBooks = booksData.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBundle = () => {
    booksData.forEach(book => addToCart(book));
    router.push("/cart");
  };

  const handleAddAndGoToCart = (e: React.MouseEvent, book: Book) => {
    e.preventDefault();
    addToCart(book);
    router.push("/cart");
  };

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-cream dark:bg-navy pt-24 pb-16" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-gold text-sm font-bold tracking-widest uppercase mb-4 block">متجر صلاح بلس</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy dark:text-white mb-4">الكتب <span className="gradient-text">التعليمية</span></h1>
            <div className="w-20 h-0.5 bg-gold mx-auto rounded-full" />
          </div>

          <div className="flex flex-col items-center justify-center gap-4 mb-10">
            <div className="w-full max-w-xl relative">
              <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="ابحث عن كتاب أو مؤلف..." className="w-full pl-4 pr-12 py-4 rounded-2xl bg-white dark:bg-navy-lighter border border-gray-200 dark:border-gray-800 focus:border-gold outline-none text-navy dark:text-white shadow-sm transition-colors" />
            </div>
            <CurrencySwitcher />
          </div>

          {/* قسم عرض الحزمة */}
          <div className="bg-gradient-to-l from-gold/20 to-gold/5 border border-gold/30 rounded-3xl p-6 sm:p-8 mb-12 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/20 rounded-full blur-3xl"></div>
            <div className="text-center sm:text-right z-10">
              <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block animate-pulse">عرض محدود</span>
              <h3 className="text-2xl font-bold text-navy dark:text-white mb-2">🎁 حزمة المبرمج الشامل</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">احصل على الكتب الأربعة (C++, Frontend, Backend, Python) بسعر مخفض!</p>
            </div>
            <div className="z-10 text-center flex flex-col items-center">
              {/* 👈 تم استخدام formatPrice هنا لكي يتغير السعر حسب العملة المختارة */}
              <div className="text-3xl font-black text-gold mb-3">
                {formatPrice(12000)}
              </div>
              <button onClick={handleBundle} className="bg-gold text-navy font-bold py-3 px-8 rounded-xl hover:bg-gold-dark transition-transform hover:scale-105 shadow-lg shadow-gold/20">
                أضف الحزمة للسلة
              </button>
            </div>
          </div>

          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <motion.div key={book.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="group bg-white dark:bg-navy-lighter rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                  
                  <Link href={`/store/${book.id}`} className="relative aspect-square w-full bg-gray-100 dark:bg-gray-800 block overflow-hidden">
                    <img src={book.image_url} alt={book.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    {book.badge && (
                      <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">{book.badge}</div>
                    )}
                  </Link>

                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex text-gold">
                        {[...Array(5)].map((_, i) => (
                          <FiStar key={i} className={`text-sm ${i < Math.floor(book.rating) ? "fill-gold" : "opacity-30"}`} />
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">({book.reviewsCount})</span>
                    </div>

                    <Link href={`/store/${book.id}`}>
                      <h3 className="font-bold text-navy dark:text-white text-lg mb-1 line-clamp-1 group-hover:text-gold transition-colors">{book.title}</h3>
                    </Link>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">{book.author}</p>
                    
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                      <div className="text-lg font-black text-gold drop-shadow-sm">{formatPrice(book.price)}</div>
                      
                      <div className="flex items-center gap-2">
                        <Link 
                          href={`/store/${book.id}`} 
                          className="text-xs font-bold text-navy dark:text-white bg-gray-100 dark:bg-navy px-3 py-2 rounded-xl hover:bg-gray-200 dark:hover:bg-navy/80 transition-colors"
                        >
                          التفاصيل
                        </Link>
                        <button 
                          onClick={(e) => handleAddAndGoToCart(e, book)}
                          className="bg-gold text-navy p-2 rounded-xl hover:bg-gold-dark transition-all hover:scale-110 shadow-md shadow-gold/20 flex items-center justify-center"
                          aria-label="أضف للسلة"
                        >
                          <FiShoppingCart size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : ( <div className="text-center py-20 text-gray-500">لا توجد كتب تطابق بحثك "{searchQuery}"</div> )}
        </div>
      </div>

      <Footer />
    </>
  );
}
