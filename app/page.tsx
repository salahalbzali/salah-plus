import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import FeaturedBooks from "@/components/FeaturedBooks";
import AboutAuthor from "@/components/AboutAuthor";
import Testimonials from "@/components/Testimonials";
import Blog from "@/components/Blog";
import FAQ from "@/components/FAQ"; // 👈 1. تم إضافة هذا الاستيراد
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Portfolio />
        <FeaturedBooks />
        <AboutAuthor />
        <Testimonials />
        <Blog />
        <FAQ /> {/* 👈 2. تم إضافة المكون هنا */}
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
