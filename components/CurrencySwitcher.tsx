"use client";

import { useCurrency, CurrencyType } from "@/lib/CurrencyContext";

export default function CurrencySwitcher({ className = "" }: { className?: string }) {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className={`flex bg-gray-100 dark:bg-navy rounded-xl p-1 border border-gray-200 dark:border-gray-700 ${className}`}>
      {(["YER", "SAR", "USD"] as CurrencyType[]).map((c) => (
        <button
          key={c}
          onClick={() => setCurrency(c)}
          className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
            currency === c
              ? "bg-gold text-navy shadow-sm"
              : "text-gray-500 hover:text-gold"
          }`}
        >
          {c === "YER" ? "يمني" : c === "SAR" ? "سعودي" : "دولار"}
        </button>
      ))}
    </div>
  );
}
