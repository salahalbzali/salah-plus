"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useCountUp } from "@/hooks/useCountUp";
import { FiBriefcase, FiUsers, FiGrid, FiEye } from "react-icons/fi";

const icons = [FiBriefcase, FiUsers, FiGrid, FiEye];

export default function Stats() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [stats, setStats] = useState({ projects: 0, clients: 0, services: 0, visitors: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        if (data.stats) {
          setStats(prev => ({ ...prev, ...data.stats }));
        }
      } catch (error) {
        setStats(prev => ({ ...prev, projects: 500, clients: 300, services: 7 }));
      }

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

      if (supabaseUrl && supabaseKey) {
        // 👈 تحقق إذا كان هذا المتصفح زار من قبل
        const hasVisited = localStorage.getItem("salah-has-visited");

        if (!hasVisited) {
          // زائر جديد - زيادة العداد
          try {
            const getRes = await fetch(
              `${supabaseUrl}/rest/v1/visitors?select=count&id=eq.1`,
              {
                headers: {
                  "apikey": supabaseKey,
                  "Authorization": `Bearer ${supabaseKey}`,
                },
              }
            );
            
            const getData = await getRes.json();
            const currentCount = getData?.[0]?.count || 0;
            const newCount = currentCount + 1;

            await fetch(`${supabaseUrl}/rest/v1/visitors?id=eq.1`, {
              method: "PATCH",
              headers: {
                "apikey": supabaseKey,
                "Authorization": `Bearer ${supabaseKey}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ count: newCount }),
            });

            // 👈 علم هذا المتصفح كزائر سابق
            localStorage.setItem("salah-has-visited", "true");
            
            setStats(prev => ({ ...prev, visitors: newCount }));
          } catch (error) {
            const stored = localStorage.getItem("salah-visitor-count");
            const current = stored ? parseInt(stored) : 0;
            setStats(prev => ({ ...prev, visitors: current }));
          }
        } else {
          // زائر سابق - جلب العدد فقط
          try {
            const getRes = await fetch(
              `${supabaseUrl}/rest/v1/visitors?select=count&id=eq.1`,
              {
                headers: {
                  "apikey": supabaseKey,
                  "Authorization": `Bearer ${supabaseKey}`,
                },
              }
            );
            
            const getData = await getRes.json();
            const currentCount = getData?.[0]?.count || 0;
            setStats(prev => ({ ...prev, visitors: currentCount }));
          } catch (error) {
            const stored = localStorage.getItem("salah-visitor-count");
            const current = stored ? parseInt(stored) : 0;
            setStats(prev => ({ ...prev, visitors: current }));
          }
        }
      } else {
        const stored = localStorage.getItem("salah-visitor-count");
        const current = stored ? parseInt(stored) : 0;
        setStats(prev => ({ ...prev, visitors: current }));
      }

      setLoading(false);
    }
    fetchData();
  }, []);

  const projectsCount = useCountUp(stats.projects, 2.5, inView);
  const clientsCount = useCountUp(stats.clients, 2.5, inView);
  const servicesCount = useCountUp(stats.services, 2.5, inView);
  const visitorsCount = useCountUp(stats.visitors, 2.5, inView);

  const statsData = [
    { id: "projects", count: projectsCount, suffix: "+", label: "مشروع", icon: icons[0] },
    { id: "clients", count: clientsCount, suffix: "+", label: "عميل", icon: icons[1] },
    { id: "services", count: servicesCount, suffix: "", label: "خدمات متكاملة", icon: icons[2] },
    { id: "visitors", count: visitorsCount, suffix: "+", label: "زائر", icon: icons[3] },
  ];

  if (loading) {
    return (
      <section className="py-12 sm:py-16 md:py-20 bg-white dark:bg-navy-lighter text-center">
        <div className="animate-pulse text-gold text-xl">⏳ جاري تحميل الإحصائيات...</div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white dark:bg-navy-lighter relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "linear-gradient(45deg, #D4AF37 1px, transparent 1px)",
            backgroundSize: "25px 25px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="relative group"
              >
                <div className="text-center p-4 sm:p-6 md:p-8 rounded-2xl bg-cream dark:bg-navy border border-gray-100 dark:border-gray-800 hover:border-gold/30 transition-all duration-500">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-10 h-10 sm:w-12 md:w-14 mx-auto mb-3 sm:mb-4 rounded-2xl bg-gold/10 flex items-center justify-center"
                  >
                    <Icon className="text-gold text-lg sm:text-xl" />
                  </motion.div>

                  <motion.div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-navy dark:text-white mb-2">
                    <motion.span>{stat.count}</motion.span>
                    {stat.suffix}
                  </motion.div>

                  <div className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm md:text-base font-medium">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
