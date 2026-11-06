import { portfolioItems } from "@/lib/data";
import { notFound } from "next/navigation";
import { FiArrowRight, FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return portfolioItems.map((item) => ({
    id: item.id,
  }));
}

export default function ProjectDetailsPage({ params }: { params: { id: string } }) {
  const project = portfolioItems.find((a) => a.id === params.id);
  
  if (!project) notFound();

  const currentIndex = portfolioItems.findIndex((a) => a.id === params.id);
  const nextProject = portfolioItems[currentIndex + 1] || null;
  const prevProject = portfolioItems[currentIndex - 1] || null;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-cream dark:bg-navy pt-24 pb-16" dir="rtl">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* زر الرجوع */}
          <div className="mb-6">
            <a href="/#portfolio" className="inline-flex items-center gap-2 text-gray-500 hover:text-gold transition-colors font-medium">
              <FiArrowRight />
              <span>العودة إلى معرض الأعمال</span>
            </a>
          </div>

          {/* صورة المشروع */}
          <div className="relative w-full h-64 sm:h-96 md:h-[500px] rounded-3xl overflow-hidden mb-8 shadow-xl">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          </div>

          {/* تفاصيل المشروع */}
          <div className="bg-white dark:bg-navy-lighter p-6 sm:p-10 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-4 py-1.5 rounded-full text-sm font-bold bg-gold/10 text-gold">
                {project.category}
              </span>
              {project.tags.map(tag => (
                <span key={tag} className="text-xs text-gray-400 bg-gray-50 dark:bg-navy px-2 py-1 rounded-md">
                  #{tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-navy dark:text-white mb-6 leading-tight">
              {project.title}
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 font-medium mb-8 pb-8 border-b border-gray-100 dark:border-gray-800">
              {project.description}
            </p>

            <h3 className="text-2xl font-bold text-gold mb-4 flex items-center gap-2">
              <FiCheckCircle /> تفاصيل المشروع
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-loose mb-10 whitespace-pre-line">
              {project.details || project.description}
            </p>

            {/* دعوة لاتخاذ إجراء */}
            <div className="bg-cream dark:bg-navy p-6 sm:p-8 rounded-2xl text-center border border-gold/20">
              <h4 className="text-xl font-bold text-navy dark:text-white mb-3">هل تريد مشروعاً مشابهاً؟</h4>
              <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">فريقنا جاهز لتحويل فكرتك إلى واقع بلمسة إبداعية مميزة.</p>
              <Link href="/#contact" className="btn-primary inline-flex items-center gap-2">
                اطلب خدمتك الآن
                <FiArrowLeft />
              </Link>
            </div>
          </div>

          {/* المشاريع السابقة والتالية */}
          <div className="grid sm:grid-cols-2 gap-4 mt-8">
            {nextProject && (
              <Link href={`/portfolio/${nextProject.id}`} className="group p-4 rounded-xl bg-white dark:bg-navy-lighter border border-gray-200 dark:border-gray-700 hover:border-gold/30 transition-all">
                <div className="flex items-center gap-2 text-gold text-sm mb-2">
                  <FiArrowRight />
                  <span>المشروع التالي</span>
                </div>
                <h3 className="font-bold text-navy dark:text-white group-hover:text-gold transition-colors">
                  {nextProject.title}
                </h3>
              </Link>
            )}
            
            {prevProject && (
              <Link href={`/portfolio/${prevProject.id}`} className="group p-4 rounded-xl bg-white dark:bg-navy-lighter border border-gray-200 dark:border-gray-700 hover:border-gold/30 transition-all sm:text-left text-right">
                <div className="flex items-center gap-2 text-gold text-sm mb-2 sm:justify-end justify-start">
                  <span>المشروع السابق</span>
                  <FiArrowLeft />
                </div>
                <h3 className="font-bold text-navy dark:text-white group-hover:text-gold transition-colors">
                  {prevProject.title}
                </h3>
              </Link>
            )}
          </div>

        </article>
      </div>
      <Footer />
    </>
  );
}
