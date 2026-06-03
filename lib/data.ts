import {
  FiPenTool,
  FiBook,
  FiStar,
  FiPrinter,
  FiMonitor,
  FiTool,
  FiCpu,
} from "react-icons/fi";
import { IconType } from "react-icons";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: IconType;
  image?: string;
  features: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
}

export interface Stat {
  id: string;
  value: number;
  suffix: string;
  label: string;
  prefix?: string;
}

export const services: Service[] = [
  {
    id: "graphic-design",
    title: "التصميم الجرافيكي",
    description: "تصاميم إبداعية احترافية تشمل المنشورات، البروشورات، البنرات، والمواد التسويقية بجودة عالية.",
    icon: FiPenTool,
    image: "/services/graphic-design.jpg",
    features: ["تصميم منشورات السوشيال ميديا", "تصميم البروشورات والكتيبات", "البانرات الإعلانية", "تغطية الفعاليات"],
  },
  {
    id: "educational-books",
    title: "تصميم الكتب التعليمية",
    description: "تصميم كتب ومناهج تعليمية بمعايير احترافية تجمع بين الجاذبية البصرية وسهولة القراءة.",
    icon: FiBook,
    image: "/services/educational-books.webp",
    features: ["تنسيق المحتوى التعليمي", "تصميم أغلفة الكتب", "الرسوم التوضيحية", "تخطيط الصفحات الداخلية"],
  },
  {
    id: "branding",
    title: "الهويات البصرية والشعارات",
    description: "بناء هويات بصرية متكاملة تعكس روح علامتك التجارية وتميزها في السوق.",
    icon: FiStar,
    image: "/services/branding.webp",
    features: ["تصميم الشعارات", "الألوان المؤسسية", "الخطوط والأنماط", "دليل الهوية البصرية"],
  },
  {
    id: "office-services",
    title: "الخدمات المكتبية",
    description: "حلول مكتبية متكاملة تشمل الطباعة، التغليف، التجهيز، والخدمات اللوجستية المكتبية.",
    icon: FiPrinter,
    image: "/services/office-services.webp",
    features: ["طباعة عالية الجودة", "تغليف احترافي", "تجهيز الملفات", "خدمات النسخ والمسح"],
  },
  {
    id: "presentations",
    title: "العروض التقديمية الاحترافية",
    description: "عروض تقديمية مبهرة بتصاميم عصرية ورسوم بيانية توصل أفكارك بوضوح وإقناع.",
    icon: FiMonitor,
    image: "/services/presentations.webp",
    features: ["عروض بوربوينت احترافية", "رسوم بيانية تفاعلية", "إنفوجرافيك", "عروض الفيديو القصيرة"],
  },
  {
    id: "tech-support",
    title: "الصيانة والدعم التقني",
    description: "دعم تقني شامل للأجهزة والأنظمة والشبكات مع حلول سريعة وموثوقة.",
    icon: FiTool,
    image: "/services/tech-support.webp",
    features: ["صيانة الأجهزة", "إعداد الشبكات", "استكشاف الأخطاء", "دعم فني عن بعد"],
  },
  {
    id: "ai-solutions",
    title: "حلول الذكاء الاصطناعي",
    description: "توظيف أحدث تقنيات الذكاء الاصطناعي لتطوير أعمالك وأتمتة عملياتك بكفاءة.",
    icon: FiCpu,
    image: "/services/ai-solutions.webp",
    features: ["تطبيقات ChatGPT", "أتمتة المهام", "تحليل البيانات", "توليد المحتوى الذكي"],
  },
];

export const portfolioItems: PortfolioItem[] = [
  {
    id: "1",
    title: "هوية بصرية لشركة تقنية",
    category: "هوية بصرية",
    description: "تصميم هوية بصرية كاملة لشركة ناشئة في مجال التقنية.",
    image: "/portfolio/1.webp",
    tags: ["شعار", "هوية", "ألوان مؤسسية"],
  },
  {
    id: "2",
    title: "كتاب تعليمي تفاعلي",
    category: "كتب تعليمية",
    description: "تصميم وتنسيق كتاب تعليمي لمادة العلوم للصف الثامن.",
    image: "/portfolio/2.webp",
    tags: ["تعليم", "تنسيق", "رسوم توضيحية"],
  },
  {
    id: "3",
    title: "حملة تسويقية متكاملة",
    category: "تصميم جرافيكي",
    description: "تصميم مواد حملة تسويقية لإطلاق منتج جديد.",
    image: "/portfolio/3.webp",
    tags: ["تسويق", "سوشيال ميديا", "إعلانات"],
  },
  {
    id: "4",
    title: "عرض تقديمي لمؤتمر",
    category: "عروض تقديمية",
    description: "عرض تقديمي احترافي لمؤتمر اقتصادي دولي.",
    image: "/portfolio/4.webp",
    tags: ["بوربوينت", "مؤتمر", "إنفوجرافيك"],
  },
  {
    id: "5",
    title: "تطبيق ذكاء اصطناعي",
    category: "ذكاء اصطناعي",
    description: "تطوير بوت ذكي لخدمة العملاء باستخدام ChatGPT.",
    image: "/portfolio/5.webp",
    tags: ["AI", "ChatGPT", "أتمتة"],
  },
  {
    id: "6",
    title: "طباعة وتغليف فاخر",
    category: "خدمات مكتبية",
    description: "مشروع طباعة وتغليف فاخر لمجموعة كتب قانونية.",
    image: "/portfolio/6.webp",
    tags: ["طباعة", "تغليف", "فاخر"],
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "كيف تختار الهوية البصرية المناسبة لعلامتك التجارية؟",
    excerpt: "دليلك الشامل لاختيار الألوان والخطوط والعناصر البصرية التي تعكس شخصية علامتك التجارية.",
    date: "2026-05-15",
    category: "هوية بصرية",
    readTime: "5 دقائق",
    image: "/blog/1.webp",
  },
  {
    id: "2",
    title: "أحدث اتجاهات التصميم الجرافيكي لعام 2026",
    excerpt: "اكتشف أحدث صيحات التصميم الجرافيكي التي ستسيطر على الساحة الإبداعية هذا العام.",
    date: "2026-05-10",
    category: "تصميم جرافيكي",
    readTime: "7 دقائق",
    image: "/blog/2.webp",
  },
  {
    id: "3",
    title: "الذكاء الاصطناعي في خدمة المصممين: أدوات لا غنى عنها",
    excerpt: "تعرف على أهم أدوات الذكاء الاصطناعي التي يمكن أن تضاعف إنتاجيتك كمصمم.",
    date: "2026-05-05",
    category: "ذكاء اصطناعي",
    readTime: "6 دقائق",
    image: "/blog/3.webp",
  },
];

export const stats: Stat[] = [
  { id: "projects", value: 500, suffix: "+", label: "مشروع", prefix: "+" },
  { id: "clients", value: 300, suffix: "+", label: "عميل", prefix: "+" },
  { id: "services", value: 7, suffix: "", label: "خدمات متكاملة", prefix: "+" },
];

export const socialLinks = {
  facebook: "https://facebook.com/salahplus",
  x: "https://x.com/salahplus",
  instagram: "https://instagram.com/salahplus",
  whatsapp: "https://wa.me/967775307315",
  email: "salah201617@gmail.com",
};
