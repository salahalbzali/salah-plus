import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import ScrollToTop from "@/components/ScrollToTop";

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <div className="pt-16">
        <Services />
      </div>
      <ScrollToTop />
    </>
  );
}
