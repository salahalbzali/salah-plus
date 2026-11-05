"use client";

import { useState, useEffect } from "react";
import { FiPlus, FiTrash2, FiArrowRight } from "react-icons/fi";
import Link from "next/link";

interface Book { id: number; title: string; author: string; price: number; image_url: string; description: string; }

export default function AdminStorePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  const [title, setTitle] = useState(""); const [author, setAuthor] = useState(""); const [price, setPrice] = useState(""); const [imageUrl, setImageUrl] = useState(""); const [description, setDescription] = useState("");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  const fetchBooks = async () => {
    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/books?select=*&order=id.desc`, { headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` } });
      const data = await res.json();
      if (Array.isArray(data)) setBooks(data);
    } catch (error) {}
    setLoading(false);
  };

  useEffect(() => { fetchBooks(); }, []);

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault(); setIsAdding(true);
    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/books`, {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}`, Prefer: "return=minimal" },
        body: JSON.stringify({ title, author, price: Number(price), image_url: imageUrl, description, stock_status: "متوفر" }),
      });
      if (res.ok) {
        alert("تمت إضافة الكتاب بنجاح!");
        setTitle(""); setAuthor(""); setPrice(""); setImageUrl(""); setDescription("");
        fetchBooks();
      }
    } catch (error) {}
    setIsAdding(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("هل أنت متأكد من الحذف؟")) return;
    try {
      await fetch(`${supabaseUrl}/rest/v1/books?id=eq.${id}`, { method: "DELETE", headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` } });
      fetchBooks();
    } catch (error) {}
  };

  return (
    <div className="min-h-screen bg-cream dark:bg-navy pt-24 pb-16" dir="rtl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/admin" className="inline-flex items-center gap-2 text-gray-500 hover:text-gold mb-2 transition-colors"><FiArrowRight /> العودة للوحة التحكم</Link>
          <h1 className="text-3xl font-bold text-navy dark:text-white">إدارة المتجر</h1>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white dark:bg-navy-lighter p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 h-fit">
            <h2 className="text-xl font-bold text-navy dark:text-white mb-4">إضافة كتاب جديد</h2>
            <form onSubmit={handleAddBook} className="space-y-4">
              <input required placeholder="اسم الكتاب" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-cream dark:bg-navy text-navy dark:text-white outline-none focus:border-gold" />
              <input required placeholder="المؤلف" value={author} onChange={e => setAuthor(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-cream dark:bg-navy text-navy dark:text-white outline-none focus:border-gold" />
              <input required type="number" placeholder="السعر" value={price} onChange={e => setPrice(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-cream dark:bg-navy text-navy dark:text-white outline-none focus:border-gold" />
              <input required placeholder="رابط الصورة /books/name.jpg" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-cream dark:bg-navy text-navy dark:text-white outline-none focus:border-gold" dir="ltr" />
              <textarea required placeholder="الوصف" rows={4} value={description} onChange={e => setDescription(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-cream dark:bg-navy text-navy dark:text-white outline-none focus:border-gold" />
              <button type="submit" disabled={isAdding} className="w-full bg-gold text-navy font-bold py-3 rounded-xl hover:bg-gold-dark transition-colors disabled:opacity-50 flex justify-center items-center gap-2">{isAdding ? "جاري الحفظ..." : <><FiPlus /> إضافة الكتاب</>}</button>
            </form>
          </div>
          <div className="lg:col-span-2 bg-white dark:bg-navy-lighter rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            <table className="w-full text-right">
              <thead className="bg-gray-50 dark:bg-navy border-b border-gray-100 dark:border-gray-800 text-gray-500 text-sm"><tr><th className="p-4 font-medium">الكتاب</th><th className="p-4 font-medium">السعر</th><th className="p-4 font-medium">إجراءات</th></tr></thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {books.map(book => (
                  <tr key={book.id} className="hover:bg-gray-50 dark:hover:bg-navy/50 transition-colors">
                    <td className="p-4 flex items-center gap-3"><img src={book.image_url} alt={book.title} className="w-10 h-14 object-cover rounded shadow-sm" /><div><div className="font-bold text-navy dark:text-white text-sm">{book.title}</div><div className="text-xs text-gray-500">{book.author}</div></div></td>
                    <td className="p-4 text-gold font-bold">{book.price} جنيهاً</td>
                    <td className="p-4"><button onClick={() => handleDelete(book.id)} className="text-red-500 bg-red-50 dark:bg-red-900/20 p-2 rounded-lg hover:bg-red-100 transition-colors"><FiTrash2 /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
