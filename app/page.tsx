import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import FeaturedBooks from "@/components/FeaturedBooks";
import Blog from "@/components/Blog";
import Testimonials from "@/components/Testimonials";
import AboutAuthor from "@/components/AboutAuthor";
import FAQ from "@/components/FAQ";
import ScrollToTop from "@/components/ScrollToTop";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services limit={3} />     {/* 3 خدمات فقط */}
        <FeaturedBooks />
        <Portfolio limit={3} />    {/* 3 مشاريع فقط */}
        <Testimonials />
        <AboutAuthor />
        <Blog limit={3} />         {/* 3 مقالات فقط */}
        <FAQ limit={4} />          {/* 4 أسئلة فقط */}
      </main>
      <ScrollToTop />
    </>
  );
}
