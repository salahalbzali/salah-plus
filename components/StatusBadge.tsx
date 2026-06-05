"use client";

import { useState, useEffect } from "react";

export default function StatusBadge() {
  const [available, setAvailable] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        
        // 👈 تحقق من اليوم
        const today = new Date().getDay(); // 0=أحد, 5=جمعة, 6=سبت
        
        if (today === 5) {
          // الجمعة - مغلق دائماً
          setAvailable(false);
        } else {
          // باقي الأيام - حسب الإعدادات
          setAvailable(data.available);
        }
      } catch (error) {
        // الجمعة مغلق
        const today = new Date().getDay();
        setAvailable(today !== 5);
      }
      setLoading(false);
    }
    fetchStatus();
  }, []);

  if (loading) {
    return (
      <>
        <span className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-400 rounded-full animate-pulse" />
        <span className="text-xs sm:text-sm font-bold text-navy dark:text-white whitespace-nowrap">
          جاري التحميل...
        </span>
      </>
    );
  }

  return (
    <>
      <span className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full animate-pulse ${
        available ? "bg-green-500" : "bg-red-500"
      }`} />
      <span className="text-xs sm:text-sm font-bold text-navy dark:text-white whitespace-nowrap">
        {available ? "متاح للعمل الحر" : "مشغول حالياً"}
      </span>
    </>
  );
}
