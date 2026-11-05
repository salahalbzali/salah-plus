"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiCreditCard, FiCopy, FiCheck, FiUser } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useCart } from "@/lib/CartContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

const paymentMethods = [
  {
    id: "jawali",
    name: "محفظة جوالي (Jawali)",
    number: "775307315", // 👈 ضع رقم محفظتك هنا
    desc: "تحويل فوري عبر تطبيق جوالي",
    image: "/payments/jawali.png",
  },
  {
    id: "jaib",
    name: "محفظة جيب (Jaib)",
    number: "775307315", // 👈 ضع رقم محفظتك هنا
    desc: "تحويل فوري عبر تطبيق جيب",
    image: "/payments/jaib.png",
  },
  {
    id: "kuraimi",
    name: "محفظة حاسب كريمي (Kuraimi)",
    number: "2030941", // 👈 ضع رقم محفظتك هنا
    desc: "تحويل فوري عبر محفظة بنك الكريمي",
    image: "/payments/kuraimi.png",
  },
];

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const router = useRouter();
  
  const [selectedPayment, setSelectedPayment] = useState<string>("jawali");
  const [copied, setCopied] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return alert("الرجاء إدخال الاسم ورقم الهاتف");
    setIsSubmitting(true);
    
    const payment = paymentMethods.find((p) => p.id === selectedPayment);
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

    // حفظ الطلب في قاعدة البيانات
    try {
      await fetch(`${supabaseUrl}/rest/v1/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "apikey": supabaseKey, "Authorization": `Bearer ${supabaseKey}`, "Prefer": "return=minimal" },
        body: JSON.stringify({ customer_name: customerName, customer_phone: customerPhone, total_price: cartTotal, items: cart, payment_method: payment?.name, status: "جديد" }),
      });
    } catch (error) { console.error(error); }

    // فتح واتساب
    let message = `مرحباً صلاح بلس، طلب جديد:\n\n👤 الاسم: ${customerName}\n📱 الهاتف: ${customerPhone}\n\n`;
    cart.forEach((item) => { message += `📚 ${item.title} - الكمية: ${item.quantity} - السعر: ${item.price * item.quantity} جنيهاً\n`; });
    message += `\n💰 الإجمالي: ${cartTotal} جنيهاً\n💳 طريقة الدفع: ${payment?.name}\n📤 يرجى إرسال صورة الإيصال.`;

    window.open(`https://wa.me/967775307315?text=${encodeURIComponent(message)}`, "_blank");
    
    setTimeout(() => { clearCart(); router.push("/store"); setIsSubmitting(false); }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-cream dark:bg-navy pt-32 pb-16 flex flex-col items-center justify-center" dir="rtl">
        <FiShoppingBag className="text-6xl text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold text-navy dark:text-white mb-4">سلة التسوق فارغة</h1>
        <Link href="/store" className="bg-gold text-navy px-6 py-3 rounded-xl font-bold hover:bg-gold-dark transition-colors">تصفح الكتب الآن</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream dark:bg-navy pt-24 pb-16" dir="rtl">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-navy dark:text-white mb-2">سلة التسوق</h1>
          <p className="text-gray-500 dark:text-gray-400">لديك {cart.length} عنصر في السلة</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-white dark:bg-navy-lighter p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <h3 className="text-lg font-bold text-navy dark:text-white mb-4 flex items-center gap-2"><FiUser className="text-gold" /> بيانات المستلم</h3>
              <div className="space-y-4">
                <input type="text" required value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-cream dark:bg-navy border border-gray-200 dark:border-gray-700 focus:border-gold outline-none text-navy dark:text-white" placeholder="الاسم الثلاثي" />
                <input type="tel" required value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-cream dark:bg-navy border border-gray-200 dark:border-gray-700 focus:border-gold outline-none text-navy dark:text-white" placeholder="رقم الهاتف (واتساب)" dir="ltr" />
              </div>
            </div>

            <div className="bg-white dark:bg-navy-lighter p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <h3 className="text-lg font-bold text-navy dark:text-white mb-4 flex items-center gap-2"><FiCreditCard className="text-gold" /> طريقة الدفع</h3>
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <label key={method.id} className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${selectedPayment === method.id ? "border-gold bg-gold/5" : "border-gray-200 dark:border-gray-700"}`}>
                    <input type="radio" name="payment" value={method.id} checked={selectedPayment === method.id} onChange={(e) => setSelectedPayment(e.target.value)} className="mt-1 accent-gold" />
                    <div className="w-10 h-10 rounded-lg bg-gray-50 dark:bg-navy flex items-center justify-center p-1 border border-gray-100 dark:border-gray-700 flex-shrink-0">
                      <img src={method.image} alt={method.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-grow">
                      <div className="font-bold text-navy dark:text-white text-sm">{method.name}</div>
                      <div className="text-xs text-gray-500 mb-1">{method.desc}</div>
                      {selectedPayment === method.id && (
                        <div className="flex items-center gap-2 mt-2">
                          <div className="text-sm font-bold bg-cream dark:bg-navy px-2 py-1 rounded text-gold flex-grow select-all break-all">{method.number}</div>
                          <button onClick={(e) => { e.preventDefault(); copyToClipboard(method.number); }} className="p-1.5 bg-gold/10 text-gold rounded hover:bg-gold hover:text-navy transition-colors">
                            {copied ? <FiCheck size={16} /> : <FiCopy size={16} />}
                          </button>
                        </div>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-navy-lighter rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
              {cart.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row items-center gap-4 p-4 border-b border-gray-100 dark:border-gray-800 last:border-0">
                  <img src={item.image_url} alt={item.title} className="w-20 h-20 aspect-square object-cover rounded-lg" />
                  <div className="flex-grow text-center sm:text-right">
                    <h3 className="font-bold text-navy dark:text-white text-sm line-clamp-1">{item.title}</h3>
                    <div className="text-gold font-bold text-sm mt-1">{item.price} جنيهاً</div>
                  </div>
                  <div className="flex items-center gap-3 bg-cream dark:bg-navy px-2 py-1 rounded-lg border border-gray-200 dark:border-gray-700">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-gray-500 hover:text-gold"><FiMinus size={14} /></button>
                    <span className="font-bold text-navy dark:text-white text-sm w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-gray-500 hover:text-gold"><FiPlus size={14} /></button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"><FiTrash2 size={18} /></button>
                </div>
              ))}
            </div>

            <div className="bg-white dark:bg-navy-lighter p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <div className="flex justify-between items-center mb-4 text-gray-600 dark:text-gray-400">
                <span>المجموع الفرعي</span>
                <span className="font-bold text-navy dark:text-white">{cartTotal} جنيهاً</span>
              </div>
              <div className="border-t border-gray-100 dark:border-gray-800 pt-4 mb-6 flex justify-between items-center">
                <span className="text-lg font-bold text-navy dark:text-white">الإجمالي</span>
                <span className="text-2xl font-black text-gold">{cartTotal} جنيهاً</span>
              </div>
              <button onClick={handleCheckout} disabled={isSubmitting} className="w-full bg-[#25D366] text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-colors disabled:opacity-50">
                {isSubmitting ? "جاري المعالجة..." : <><FaWhatsapp size={22} /> تأكيد الطلب عبر واتساب</>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
