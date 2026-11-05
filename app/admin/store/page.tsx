"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiLock, FiArrowRight, FiShoppingBag, FiExternalLink, FiActivity, FiSettings } from "react-icons/fi";
import Link from "next/link";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  
  // حالة الإحصائيات (اختياري إذا أردت عرضها هنا)
  const [stats, setStats] = useState({ projects: 0, clients: 0, services: 0 });
  const [loading, setLoading] = useState(false);

  // كلمة المرور للدخول (يمكنك تغييرها من هنا)
  const ADMIN_PASSWORD = "salah2026";

  const handleLogin = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      // حفظ حالة الدخول في المتصفح حتى لا يطلب كلمة المرور كل مرة
      localStorage.setItem("salah-admin-auth", "true");
    } else {
      alert("كلمة المرور غير صحيحة");
    }
  };

  // التحقق من تسجيل الدخول المسبق
  useEffect(() => {
    const auth = localStorage.getItem("salah-admin-auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // جلب الإحصائيات من API
  useEffect(() => {
    if (isAuthenticated) {
      const fetchStats = async () => {
        try {
          const res = await fetch("/api/settings");
          const data = await res.json();
          if (data.stats) setStats(data.stats);
        } catch (error) {}
      };
      fetchStats();
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem("salah-admin-auth");
    setIsAuthenticated(false);
    setPasswordInput("");
  };

  // شاشة تسجيل الدخول
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream dark:bg-navy" dir="rtl">
        <div className="bg-white dark:bg-navy-lighter p-8 rounded-2xl shadow-xl text-center w-full max-w-sm border border-gray-100 dark:border-gray-800">
          <FiLock className="text-gold text-5xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-navy dark:text-white mb-6">🔐 صلاحيات المدير</h2>
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="أدخل كلمة المرور"
            className="w-full px-4 py-3 rounded-xl mb-4 text-center bg-cream dark:bg-navy border border-gray-200 dark:border-gray-700 text-navy dark:text-white focus:border-gold outline-none"
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />
          <button 
            onClick={handleLogin} 
            className="w-full bg-gold-gradient text-navy font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-gold/20 transition-all"
          >
            دخول
          </button>
        </div>
      </div>
    );
  }

  // شاشة لوحة التحكم
  return (
    <div className="min-h-screen bg-cream dark:bg-navy pt-24 pb-16" dir="rtl">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* رأس الصفحة */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-navy dark:text-white flex items-center gap-2">
              <FiActivity className="text-gold" /> لوحة التحكم
            </h1>
            <p className="text-gray-500 mt-1">مرحباً بك يا صلاح، ماذا تريد أن تفعل اليوم؟</p>
          </div>
          <button onClick={handleLogout} className="bg-red-50 text-red-500 px-4 py-2 rounded-xl hover:bg-red-100 transition-colors text-sm font-bold">
            تسجيل الخروج
          </button>
        </div>

        {/* بطاقات الإحصائيات */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-navy-lighter p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 text-center">
            <div className="text-3xl font-black text-gold mb-1">{stats.projects}+</div>
            <div className="text-sm text-gray-500">مشروع</div>
          </div>
          <div className="bg-white dark:bg-navy-lighter p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 text-center">
            <div className="text-3xl font-black text-gold mb-1">{stats.clients}+</div>
            <div className="text-sm text-gray-500">عميل</div>
          </div>
          <div className="bg-white dark:bg-navy-lighter p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 text-center">
            <div className="text-3xl font-black text-gold mb-1">{stats.services}</div>
            <div className="text-sm text-gray-500">خدمات</div>
          </div>
        </div>

        {/* أزرار الإدارة */}
        <div className="grid sm:grid-cols-2 gap-4">
          
          {/* إدارة المتجر */}
          <Link href="/admin/store" className="group bg-white dark:bg-navy-lighter p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:border-gold/50 transition-all flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gold/10 text-gold rounded-xl flex items-center justify-center group-hover:bg-gold group-hover:text-navy transition-colors">
                <FiShoppingBag size={24} />
              </div>
              <div>
                <div className="font-bold text-navy dark:text-white text-lg">إدارة متجر الكتب</div>
                <div className="text-xs text-gray-500">إضافة، تعديل، أو حذف الكتب</div>
              </div>
            </div>
            <FiArrowRight className="text-gray-300 group-hover:text-gold transition-colors" />
          </Link>

          {/* إعدادات الموقع (Supabase) */}
          <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="group bg-white dark:bg-navy-lighter p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:border-gold/50 transition-all flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <FiSettings size={24} />
              </div>
              <div>
                <div className="font-bold text-navy dark:text-white text-lg">الطلبات والبيانات</div>
                <div className="text-xs text-gray-500">عرض الطلبات في Supabase</div>
              </div>
            </div>
            <FiExternalLink className="text-gray-300 group-hover:text-blue-500 transition-colors" />
          </a>

          {/* العودة للموقع */}
          <Link href="/" className="sm:col-span-2 bg-navy dark:bg-white text-white dark:text-navy font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:shadow-lg transition-all">
            <FiExternalLink /> العودة إلى الموقع الرئيسي
          </Link>
        </div>

      </div>
    </div>
  );
}
