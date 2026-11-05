"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiArrowRight, FiShoppingCart, FiCheck, FiMinus, FiPlus } from "react-icons/fi";
import { useCart, Book } from "@/lib/CartContext";
import Link from "next/link";

export default function BookDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    async function fetchBook() {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
      try {
        const res = await fetch(`${supabaseUrl}/rest/v1/books?id=eq.${params.id}&select=*`, {
          headers: { apikey: supabaseKey, "Authorization": `Bearer ${supabaseKey}` },
        });
        const data = await res.json();
        if (data && data.length > 0) setBook(data[0]);
      } catch (error) {}
      setLoading(false);
    }
    if (params.id) fetchBook();
  }, [params.id]);

  const handleAddToCart = () => {
    if (!book) return;
    for (let i = 0; i < quantity; i++) addToCart(book);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-cream dark:bg-navy"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div></div>;
  if (!book) return <div className="min-h-screen flex flex-col items-center justify-center bg-cream dark:bg-navy"><h1 className="text-2xl font-bold mb-4">الكتاب غير موجود</h1><Link href="/store" className="text-gold hover:underline">العودة للمتجر</Link></div>;

  return (
    <div className="min-h-screen bg-cream dark:bg-navy pt-24 pb-16" dir="rtl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-gold mb-8 transition-colors"><FiArrowRight /> العودة للمتجر</button>
        <div className="grid md:grid-cols-2 gap-10">
          {/* صورة الكتاب المربعة */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white dark:bg-navy-lighter rounded-2xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-center">
            <div className="relative aspect-square w-full">
              <img src={book.image_url} alt={book.title} className="absolute inset-0 w-full h-full object-cover rounded-xl" />
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col">
            <h1 className="text-3xl sm:text-4xl font-bold text-navy dark:text-white mb-3">{book.title}</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-6">{book.author}</p>
            <div className="text-3xl font-black text-gold mb-6">{book.price} <span className="text-lg">جنيهاً</span></div>
            {/* الوصف المنسق */}
            <div className="text-gray-700 dark:text-gray-300 leading-loose mb-8 flex-grow whitespace-pre-line text-lg">{book.description}</div>
            
            <div className="bg-white dark:bg-navy-lighter p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between mb-6">
                <span className="text-gray-600 dark:text-gray-400 font-medium">الكمية</span>
                <div className="flex items-center gap-4 bg-cream dark:bg-navy px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-gray-500 hover:text-gold"><FiMinus /></button>
                  <span className="font-bold text-navy dark:text-white w-4 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="text-gray-500 hover:text-gold"><FiPlus /></button>
                </div>
              </div>
              <button onClick={handleAddToCart} className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${added ? "bg-green-500 text-white" : "bg-gold text-navy hover:bg-gold-dark"}`}>
                {added ? <><FiCheck /> تمت الإضافة</> : <><FiShoppingCart /> أضف للسلة</>}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
