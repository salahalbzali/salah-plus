"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <div className="lg:hidden fixed bottom-4 left-4 right-4 bg-white dark:bg-navy rounded-full shadow-[0_5px_20px_rgba(0,0,0,0.1)] p-2 z-[100] border border-gray-100 dark:border-gray-800">
      <div className="flex justify-around items-center">
        <Link href="/" className="flex flex-col items-center p-2 text-gray-500 dark:text-gray-400 hover:text-gold transition-colors">
          <span className="text-xs font-bold">الرئيسية</span>
        </Link>
        <Link href="/services" className="flex flex-col items-center p-2 text-gray-500 dark:text-gray-400 hover:text-gold transition-colors">
          <span className="text-xs font-bold">الخدمات</span>
        </Link>
        <Link href="/store" className={`flex flex-col items-center p-2 transition-colors ${pathname === '/store' ? "bg-gold text-navy rounded-full px-4 shadow-md" : "text-gray-500 dark:text-gray-400 hover:text-gold"}`}>
          <span className="text-xs font-bold">المتجر</span>
        </Link>
        <Link href="#contact" className="flex flex-col items-center p-2 bg-gold rounded-full px-4 text-navy shadow-md shadow-gold/20">
          <span className="text-xs font-bold">اتصل بنا</span>
        </Link>
      </div>
    </div>
  );
}
