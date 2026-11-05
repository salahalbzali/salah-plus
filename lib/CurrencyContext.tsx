"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type CurrencyType = "YER" | "SAR" | "USD";

// أسعار الصرف التقريبية (يمكنك تعديلها لاحقاً)
// كم يساوي الريال اليمني مقابل العملات الأخرى
const EXCHANGE_RATES = {
  YER: 1,
  SAR: 140,  // 1 ريال سعودي = 140 ريال يمني
  USD: 533,  // 1 دولار أمريكي = 530 ريال يمني
};

const CURRENCY_NAMES = {
  YER: "ريال يمني",
  SAR: "ريال سعودي",
  USD: "دولار",
};

interface CurrencyContextType {
  currency: CurrencyType;
  setCurrency: (c: CurrencyType) => void;
  formatPrice: (priceInYER: number) => string;
  getRawPrice: (priceInYER: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyType>("YER");

  // دالة لتحويل السعر من اليمني إلى العملة المختارة
  const getRawPrice = (priceInYER: number) => {
    return priceInYER / EXCHANGE_RATES[currency];
  };

  // دالة لتنسيق السعر وإضافة اسم العملة
  const formatPrice = (priceInYER: number) => {
    const converted = getRawPrice(priceInYER);
    // تقريب الأرقام العشرية للدولار والسعودي
    const rounded = currency === "YER" ? Math.round(converted) : Math.round(converted * 100) / 100;
    return `${rounded.toLocaleString("en-US")} ${CURRENCY_NAMES[currency]}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, getRawPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error("useCurrency must be used within CurrencyProvider");
  return context;
}
