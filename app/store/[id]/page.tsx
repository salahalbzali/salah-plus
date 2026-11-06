"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiArrowRight, FiShoppingCart, FiCheck, FiMinus, FiPlus } from "react-icons/fi";
import { useCart } from "@/lib/CartContext";
import { booksData } from "@/lib/books";
import { useCurrency } from "@/lib/CurrencyContext";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CurrencySwitcher from "@/components/CurrencySwitcher";

export default function BookDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const book = booksData.find((b) => b.id === Number(params.id));

  const handleAddToCart = () => {
    if (!book) return;
    for (let i = 0; i < quantity; i++) addToCart(book);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!book) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center bg-cream dark:bg-navy pt-24">
          <h1 className="text-2xl font-bold mb-4">الكتاب غير موجود</h1>
          <Link href="/store" className="text-gold hover:underline">العودة للمتجر</Link>
        </div>
        <Footer />
      </>
    );
  }

  const renderDescription = (text: string) => {
    return text.split('\n').map((line, index) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return <div key={index} className="h-2"></div>;
      
      // eslint-disable-next-line no-misleading-character-class
      const isHeading = /^[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u.test(trimmedLine) || trimmedLine.endsWith('؟');

      if (isHeading) {
        return (
          <h3 key={index} className="text-gold text-xl font-bold mt-6 mb-3 flex items-center gap-2">
            {trimmedLine}
          </h3>
        );
      }
      return (
        <p key={index} className="text-gray-700 dark:text-gray-300 mb-2 leading-relaxed text-lg">
          {trimmedLine}
        </p>
      );
    });
  };

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-cream dark:bg-navy pt-24 pb-32" dir="rtl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-gold mb-8 transition-colors">
            <FiArrowRight /> العودة للمتجر
          </button>
          
          <div className="grid md:grid-cols-2 gap-10">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white dark:bg-navy-lighter rounded-2xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm flex items-start justify-center h-fit">
              <div className="relative aspect-square w-full">
                <img src={book.image_url} alt={book.title} className="absolute inset-0 w-full h-full object-cover rounded-xl" />
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col">
              <h1 className="text-3xl sm:text-4xl font-bold text-navy dark:text-white mb-3 leading-snug">{book.title}</h1>
              <p className="text-gray-500 dark:text-gray-400 mb-4 text-lg">{book.author}</p>
              
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">
                <div className="text-3xl font-black text-gold">
                  {formatPrice(book.price)}
                </div>
                <CurrencySwitcher />
              </div>

              <div className="flex-grow mb-8">
                {renderDescription(book.description)}
              </div>
              
              <div className="bg-white dark:bg-navy-lighter p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">الكمية</span>
                  <div className="flex items-center gap-4 bg-cream dark:bg-navy px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-gray-500 hover:text-gold"><FiMinus /></button>
                    <span className="font-bold text-navy dark:text-white w-4 text-center">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="text-gray-500 hover:text-gold"><FiPlus /></button>
                  </div>
                </div>
                <button onClick={handleAddToCart} className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg ${added ? "bg-green-500 text-white shadow-green-500/20" : "bg-gold text-navy hover:bg-gold-dark shadow-gold/20"}`}>
                  {added ? <><FiCheck /> تمت الإضافة</> : <><FiShoppingCart /> أضف للسلة</>}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 👈 شريط الإضافة الثابت للجوال */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-navy border-t border-gray-200 dark:border-gray-800 p-4 z-40 shadow-[0_-10px_20px_rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-between gap-4 max-w-6xl mx-auto">
          <div>
            <div className="text-xs text-gray-500">السعر</div>
            <div className="text-xl font-black text-gold">{formatPrice(book.price)}</div>
          </div>
          <button 
            onClick={handleAddToCart} 
            className={`flex-grow py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
              added ? "bg-green-500 text-white" : "bg-gold text-navy hover:bg-gold-dark"
            }`}
          >
            {added ? <><FiCheck /> تمت الإضافة</> : <><FiShoppingCart /> أضف للسلة</>}
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}
