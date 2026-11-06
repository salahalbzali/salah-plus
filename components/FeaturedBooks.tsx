"use client";

import { motion } from "framer-motion";
import { FiArrowLeft, FiShoppingCart, FiStar } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { booksData, Book } from "@/lib/books";
import { useCurrency } from "@/lib/CurrencyContext";
import { useCart } from "@/lib/CartContext";

export default function FeaturedBooks() {
  const books = booksData.slice(0, 4);
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddAndGoToCart = (e: React.MouseEvent, book: Book) => {
    e.preventDefault();
    addToCart(book);
    router.push("/cart");
  };

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
            <motion.div 
              key={book.id} 
              initial={{ opacity: 0, y: 40 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: index * 0.1 }} 
              className="group bg-white dark:bg-navy-lighter rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl hover:shadow-gold/10 transition-all duration-300 flex flex-col"
            >
              {/* صورة الكتاب مع الشارة والتأثير */}
              <Link href={`/store/${book.id}`} className="block relative aspect-square w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img src={book.image_url} alt={book.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                {book.badge && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
                    {book.badge}
                  </div>
                )}
              </Link>

              <div className="p-5 flex flex-col flex-grow">
                {/* التقييم بالنجوم */}
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
                  
                  {/* 👈 الأزرار: التفاصيل والسلة */}
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
