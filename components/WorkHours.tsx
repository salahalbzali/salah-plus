"use client";

import { useState, useEffect } from "react";
import { FiClock } from "react-icons/fi";

export default function WorkHours() {
  const [workHours, setWorkHours] = useState({
    start: "9:00 ص",
    end: "9:30 م",
    days: "السبت - الخميس",
    fridayClosed: true,
  });
  const [available, setAvailable] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        
        // تحقق من اليوم والوقت بتوقيت اليمن
        const now = new Date();
        const yemenTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Aden" }));
        const day = yemenTime.getDay();
        const hours = yemenTime.getHours();
        
        if (day === 5) {
          setAvailable(false);
        } else if (hours < 9 || hours >= 21) {
          setAvailable(false);
        } else {
          setAvailable(data.available);
        }
        
        setWorkHours({
          start: data.workHours?.start || "9:00 ص",
          end: data.workHours?.end || "9:30 م",
          days: data.workHours?.days || "السبت - الخميس",
          fridayClosed: data.workHours?.fridayClosed ?? true,
        });
      } catch (error) {
        const now = new Date();
        const yemenTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Aden" }));
        const day = yemenTime.getDay();
        const hours = yemenTime.getHours();
        setAvailable(day !== 5 && hours >= 9 && hours < 21);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-cream dark:bg-navy p-6 sm:p-8 rounded-2xl border border-gray-100 dark:border-gray-800 animate-pulse">
        <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full mb-3"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <div className="bg-cream dark:bg-navy p-6 sm:p-8 rounded-2xl border border-gray-100 dark:border-gray-800">
      <h3 className="text-lg sm:text-xl font-bold text-navy dark:text-white mb-4 sm:mb-6 flex items-center gap-2">
        <FiClock className="text-gold" />
        مواعيد العمل
      </h3>

      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <span className={`w-3 h-3 rounded-full animate-pulse ${
          available ? "bg-green-500" : "bg-red-500"
        }`} />
        <span className={`text-sm font-bold ${
          available ? "text-green-500" : "text-red-500"
        }`}>
          {available ? "🟢 متاح للعمل حالياً" : "🔴 مغلق حالياً"}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400 text-sm">
            {workHours.days}
          </span>
          <span className="text-navy dark:text-white font-bold text-sm">
            {workHours.start} - {workHours.end}
          </span>
        </div>
        <hr className="border-gray-200 dark:border-gray-700" />
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400 text-sm">الجمعة</span>
          <span className="text-red-500 font-bold text-sm">
            {workHours.fridayClosed ? "مغلق" : "متاح"}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-400 dark:text-gray-500">
          {available 
            ? "يمكنك التواصل معنا الآن وسنرد عليك في أقرب وقت"
            : "سنعود إليك في أقرب وقت خلال ساعات العمل"
          }
        </p>
      </div>
    </div>
  );
}
