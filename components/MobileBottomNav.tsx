ط"use client";

export default function MobileBottomNav() {
  return (
    <div className="lg:hidden fixed bottom-4 left-4 right-4 bg-white dark:bg-navy rounded-full shadow-lg p-2 z-50">
      <div className="flex justify-around items-center">
        <a href="/#home" className="flex flex-col items-center p-2 text-gray-500 dark:text-gray-400">
          <span className="text-xs">الرئيسية</span>
        </a>
        <a href="/#services" className="flex flex-col items-center p-2 text-gray-500 dark:text-gray-400">
          <span className="text-xs">الخدمات</span>
        </a>
        <a href="/#contact" className="flex flex-col items-center p-2 bg-gold rounded-full px-4 text-navy">
          <span className="text-xs font-bold">اتصل بنا</span>
        </a>
      </div>
    </div>
  );
}
