import { articles } from "@/lib/articles";
import { notFound } from "next/navigation";
import { FiCalendar, FiClock, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { FaXTwitter, FaWhatsapp, FaFacebook } from "react-icons/fa6";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export function generateStaticParams() {
  return articles.map((article) => ({
    id: article.id,
  }));
}

// دالة مساعدة لتنسيق النصوص العريضة (Markdown Bold **text**)
const renderInlineText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="text-gold font-bold">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

// دالة مساعدة لتحليل وتنسيق كل سطر في محتوى المقال بناءً على بادئته أو نوعه
const renderContentBlock = (paragraph: string, index: number) => {
  const trimmed = paragraph.trim();
  if (!trimmed) return <div key={index} className="h-4"></div>;

  // 1. العناوين المرقمة أو الكلمات المفتاحية المخصصة (مثل المقدمة والخلاصة)
  if (/^(\d+\.|[^\w\s]+\s*\d+\.)/.test(trimmed) || trimmed === 'الخلاصة' || trimmed === 'المقدمة') {
    return (
      <h2 key={index} className="text-2xl sm:text-3xl font-black mt-10 mb-5 text-gold border-r-4 border-gold pr-4 bg-gold/5 py-2 rounded-l-lg">
        {renderInlineText(trimmed)}
      </h2>
    );
  }

  // 2. العناوين الفرعية التي تبدأ بـ ##
  if (trimmed.startsWith('## ')) {
    return (
      <h2 key={index} className="text-2xl sm:text-3xl font-black mt-10 mb-4 text-gold border-r-4 border-gold pr-4">
        {renderInlineText(trimmed.replace('## ', ''))}
      </h2>
    );
  }

  // 3. الأسئلة (التي تنتهي بعلامة استفهام)
  if (trimmed.endsWith('؟')) {
    return (
      <h3 key={index} className="text-xl sm:text-2xl font-bold mt-8 mb-4 text-gold">
        {renderInlineText(trimmed)}
      </h3>
    );
  }

  // 4. الاقتباسات
  if (trimmed.startsWith('> ')) {
    return (
      <blockquote key={index} className="border-r-4 border-gold bg-gold/5 rounded-xl px-6 py-5 my-5">
        <p className="text-lg text-gray-600 dark:text-gray-400 italic leading-relaxed">
          {renderInlineText(trimmed.replace('> ', ''))}
        </p>
      </blockquote>
    );
  }

  // 5. القوائم النقطية
  if (trimmed.startsWith('- ')) {
    return (
      <div key={index} className="flex items-start gap-3 mr-6 mb-3 text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
        <span className="text-gold font-bold mt-1">•</span>
        <div>{renderInlineText(trimmed.replace('- ', ''))}</div>
      </div>
    );
  }

  // 6. الفقرات العادية الافتراضية
  return (
    <p key={index} className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-loose mb-5">
      {renderInlineText(trimmed)}
    </p>
  );
};

export default async function ArticlePage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const resolvedParams = await params;
  const article = articles.find((a) => a.id === resolvedParams.id);
  
  if (!article) notFound();

  const currentIndex = articles.findIndex((a) => a.id === resolvedParams.id);
  const nextArticle = articles[currentIndex + 1] || null;
  const prevArticle = articles[currentIndex - 1] || null;

  const shareUrl = `https://salah-plus-l7lb.vercel.app/blog/${article.id}`;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-cream dark:bg-navy pt-24 pb-16" dir="rtl">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* زر الرجوع إلى المدونة */}
          <div className="mb-6">
            <a
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gold transition-colors"
            >
              <FiArrowRight />
              <span>الرجوع إلى المدونة</span>
            </a>
          </div>

          {/* صورة المقال البارزة */}
          <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden mb-8">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 rounded-full text-sm font-bold bg-gold text-navy">
                {article.category}
              </span>
            </div>
          </div>

          {/* رأس المقال والمعلومات التعريفية */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gold mb-4 leading-tight">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
              <span className="flex items-center gap-2">
                <img
                  src="/author.jpg"
                  alt={article.author}
                  className="w-10 h-10 rounded-full object-cover border-2 border-gold"
                />
                <span className="font-bold text-navy dark:text-white">{article.author}</span>
              </span>
              <span className="flex items-center gap-1">
                <FiCalendar className="text-gold" />
                {article.date}
              </span>
              <span className="flex items-center gap-1">
                <FiClock className="text-gold" />
                {article.readTime}
              </span>
            </div>
          </div>

          {/* محتوى المقال */}
          <div className="max-w-none mb-12">
            {article.content.split('\n').map((paragraph, i) => renderContentBlock(paragraph, i))}
          </div>

          {/* أيقونات مشاركة المقال */}
          <div className="flex items-center justify-center gap-4 py-8 border-t border-b border-gray-200 dark:border-gray-700 mb-8">
            <span className="text-gray-500 dark:text-gray-400 text-sm">شارك المقال:</span>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white hover:scale-110 transition-transform">
              <FaFacebook />
            </a>
            <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${article.title}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white hover:scale-110 transition-transform">
              <FaXTwitter />
            </a>
            <a href={`https://wa.me/?text=${article.title}%20${shareUrl}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white hover:scale-110 transition-transform">
              <FaWhatsapp />
            </a>
          </div>

          {/* التنقل بين المقالات (السابق والتالي) */}
          <div className="grid sm:grid-cols-2 gap-4">
            {nextArticle && (
              <Link href={`/blog/${nextArticle.id}`} className="group p-4 rounded-xl bg-white dark:bg-navy-lighter border border-gray-200 dark:border-gray-700 hover:border-gold/30 transition-all">
                <div className="flex items-center gap-2 text-gold text-sm mb-2">
                  <FiArrowRight />
                  <span>المقال التالي</span>
                </div>
                <h3 className="font-bold text-navy dark:text-white group-hover:text-gold transition-colors">
                  {nextArticle.title}
                </h3>
              </Link>
            )}
            
            {prevArticle && (
              <Link href={`/blog/${prevArticle.id}`} className="group p-4 rounded-xl bg-white dark:bg-navy-lighter border border-gray-200 dark:border-gray-700 hover:border-gold/30 transition-all sm:text-left text-right">
                <div className="flex items-center gap-2 text-gold text-sm mb-2 sm:justify-end justify-start">
                  <span>المقال السابق</span>
                  <FiArrowLeft />
                </div>
                <h3 className="font-bold text-navy dark:text-white group-hover:text-gold transition-colors">
                  {prevArticle.title}
                </h3>
              </Link>
            )}
          </div>
        </article>
      </div>
    </>
  );
}
