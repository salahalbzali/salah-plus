import Navbar from "@/components/Navbar";
import Blog from "@/components/Blog";
import ScrollToTop from "@/components/ScrollToTop";

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <div className="pt-16">
        <Blog />
      </div>
      <ScrollToTop />
    </>
  );
}
