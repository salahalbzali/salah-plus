import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import FeaturedBooks from "@/components/FeaturedBooks";
import Portfolio from "@/components/Portfolio";
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
        <Services />
        <FeaturedBooks />
        <Portfolio />
        <Testimonials />
        <AboutAuthor />
        <FAQ />
      </main>
      <ScrollToTop />
    </>
  );
}
