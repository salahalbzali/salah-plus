import Navbar from "@/components/Navbar";
import Portfolio from "@/components/Portfolio";
import ScrollToTop from "@/components/ScrollToTop";

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <div className="pt-16">
        <Portfolio />
      </div>
      <ScrollToTop />
    </>
  );
}
