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
  details?: string; // 👈 تمت إضافة هذا الحقل
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  author: string;
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
    image: "/services/educational-books.jpg",
    features: ["تنسيق المحتوى التعليمي", "تصميم أغلفة الكتب", "الرسوم التوضيحية", "تخطيط الصفحات الداخلية"],
  },
  {
    id: "branding",
    title: "الهويات البصرية والشعارات",
    description: "بناء هويات بصرية متكاملة تعكس روح علامتك التجارية وتميزها في السوق.",
    icon: FiStar,
    image: "/services/branding.jpg",
    features: ["تصميم الشعارات", "الألوان المؤسسية", "الخطوط والأنماط", "دليل الهوية البصرية"],
  },
  {
    id: "office-services",
    title: "الخدمات المكتبية",
    description: "حلول مكتبية متكاملة تشمل الطباعة، التغليف، التجهيز، والخدمات اللوجستية المكتبية.",
    icon: FiPrinter,
    image: "/services/office-services.jpg",
    features: ["طباعة عالية الجودة", "تغليف احترافي", "تجهيز الملفات", "خدمات النسخ والمسح"],
  },
  {
    id: "presentations",
    title: "العروض التقديمية الاحترافية",
    description: "عروض تقديمية مبهرة بتصاميم عصرية ورسوم بيانية توصل أفكارك بوضوح وإقناع.",
    icon: FiMonitor,
    image: "/services/presentations.jpg",
    features: ["عروض بوربوينت احترافية", "رسوم بيانية تفاعلية", "إنفوجرافيك", "عروض الفيديو القصيرة"],
  },
  {
    id: "tech-support",
    title: "الصيانة والدعم التقني",
    description: "دعم تقني شامل للأجهزة والأنظمة والشبكات مع حلول سريعة وموثوقة.",
    icon: FiTool,
    image: "/services/tech-support.jpg",
    features: ["صيانة الأجهزة", "إعداد الشبكات", "استكشاف الأخطاء", "دعم فني عن بعد"],
  },
  {
    id: "ai-solutions",
    title: "حلول الذكاء الاصطناعي",
    description: "توظيف أحدث تقنيات الذكاء الاصطناعي لتطوير أعمالك وأتمتة عملياتك بكفاءة.",
    icon: FiCpu,
    image: "/services/ai-solutions.jpg",
    features: ["تطبيقات ChatGPT", "أتمتة المهام", "تحليل البيانات", "توليد المحتوى الذكي"],
  },
];

export const portfolioItems: PortfolioItem[] = [
  {
    id: "1",
    title: "هوية بصرية لشركة تقنية",
    category: "هوية بصرية",
    description: "تصميم هوية بصرية كاملة لشركة ناشئة في مجال التقنية.",
    image: "/portfolio/1.jpg",
    tags: ["شعار", "هوية", "ألوان مؤسسية"],
    details: "قمنا بتصميم هوية بصرية متكاملة لشركة تقنية ناشئة، شملت تصميم الشعار بأسلوب عصري يعكس التطور التقني، واختيار لوحة ألوان مؤسسية تجمع بين الأزرق والرمادي، بالإضافة إلى تصميم دليل الهوية البصرية والقرطاسية والمطبوعات الرسمية.",
  },
  {
    id: "2",
    title: "كتاب تعليمي تفاعلي",
    category: "كتب تعليمية",
    description: "تصميم وتنسيق كتاب تعليمي لمادة العلوم للصف الثامن.",
    image: "/portfolio/2.jpg",
    tags: ["تعليم", "تنسيق", "رسوم توضيحية"],
    details: "تم العمل على تصميم وتنسيق كتاب العلوم للصف الثامن بأسلوب يجمع بين الجاذبية البصرية وسهولة القراءة. تضمن العمل تخطيط الصفحات، تصميم الرسوم التوضيحية والإنفوجرافيك التعليمي، واختيار خطوط واضحة تناسب الطلاب وتسهل عليهم استيعاب المعلومات.",
  },
  {
    id: "3",
    title: "حملة تسويقية متكاملة",
    category: "تصميم جرافيكي",
    description: "تصميم مواد حملة تسويقية لإطلاق منتج جديد.",
    image: "/portfolio/3.jpg",
    tags: ["تسويق", "سوشيال ميديا", "إعلانات"],
    details: "صممنا حزمة تسويقية متكاملة لإطلاق منتج جديد في السوق. شملت الحملة تصميم منشورات السوشيال ميديا (انستغرام، تويتر، فيسبوك)، بنرات إعلانية للمواقع، بالإضافة إلى تصميم البروشورات التعريفية بالمنتج.",
  },
  {
    id: "4",
    title: "عرض تقديمي لمؤتمر",
    category: "عروض تقديمية",
    description: "عرض تقديمي احترافي لمؤتمر اقتصادي دولي.",
    image: "/portfolio/4.jpg",
    tags: ["بوربوينت", "مؤتمر", "إنفوجرافيك"],
    details: "قمنا بإعداد عرض تقديمي احترافي لمؤتمر اقتصادي دولي. تميز العرض بتصميم عصري، استخدام رسوم بيانية تفاعلية لعرض البيانات الاقتصادية، وتنسيق النصوص بطريقة تسهل على الجمهور متابعة المحتوى وتفاعله.",
  },
  {
    id: "5",
    title: "تطبيق ذكاء اصطناعي",
    category: "ذكاء اصطناعي",
    description: "تطوير بوت ذكي لخدمة العملاء باستخدام ChatGPT.",
    image: "/portfolio/5.jpg",
    tags: ["AI", "ChatGPT", "أتمتة"],
    details: "قمنا بتطوير وبرمجة بوت ذكي لخدمة العملاء باستخدام تقنيات الذكاء الاصطناعي (ChatGPT API). البوت قادر على فهم استفسارات العملاء، الرد عليها تلقائياً على مدار الساعة، وتوجيههم للخدمات المناسبة، مما وفر على الشركة الكثير من الوقت والجهد.",
  },
  {
    id: "6",
    title: "طباعة وتغليف فاخر",
    category: "خدمات مكتبية",
    description: "مشروع طباعة وتغليف فاخر لمجموعة كتب قانونية.",
    image: "/portfolio/6.jpg",
    tags: ["طباعة", "تغليف", "فاخر"],
    details: "تم تنفيذ مشروع طباعة وتغليف لمجموعة كتب قانونية بجودة عالية. استخدمنا ورقاً فاخراً وتغليفاً مقوى (Hardcover) مع طباعة الأسماء بأحرف ذهبية، مما أعطى الكتب طابعاً رسمياً وفخماً يليق بالمحتوى القانوني.",
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "ai-tools-2026",
    title: "أدوات الذكاء الاصطناعي الأكثر تأثيرًا في عام 2026",
    excerpt: "دليل شامل لأهم أدوات الذكاء الاصطناعي التي تقود المشهد التقني في 2026.",
    date: "2026-05-20",
    category: "ذكاء اصطناعي",
    readTime: "10 دقائق",
    image: "/blog/ai-tools-2026.jpg",
    author: "صلاح بلس",
  },
  {
    id: "choose-brand-identity",
    title: "كيف تختار الهوية البصرية المناسبة لعلامتك التجارية؟",
    excerpt: "دليل عملي لاختيار هوية بصرية احترافية تعكس شخصية علامتك التجارية.",
    date: "2026-05-15",
    category: "هوية بصرية",
    readTime: "5 دقائق",
    image: "/blog/1.jpg",
    author: "صلاح بلس",
  },
  {
    id: "design-trends-2026",
    title: "أحدث اتجاهات التصميم الجرافيكي لعام 2026",
    excerpt: "اكتشف أهم 8 اتجاهات في التصميم الجرافيكي لعام 2026.",
    date: "2026-05-10",
    category: "تصميم جرافيكي",
    readTime: "6 دقائق",
    image: "/blog/2.jpg",
    author: "صلاح بلس",
  },
  {
    id: "ai-productivity",
    title: "كيف تستخدم الذكاء الاصطناعي لمضاعفة إنتاجيتك في 2026؟",
    excerpt: "اكتشف أفضل أدوات الذكاء الاصطناعي التي ستوفر عليك ساعات من العمل وتساعدك على إنجاز مهامك باحترافية.",
    date: "2026-11-10",
    category: "ذكاء اصطناعي",
    readTime: "5 دقائق",
    image: "/blog/ai-productivity.jpg",
    author: "صلاح بلس",
  },
  {
    id: "branding-for-startups",
    title: "لماذا تعتبر الهوية البصرية أهم استثمار لمشروعك الناشئ؟",
    excerpt: "الهوية البصرية ليست مجرد شعار، بل هي قصة علامتك التجارية. تعرف على كيفية بناء هوية تترك أثراً في العملاء.",
    date: "2026-11-08",
    category: "هوية بصرية",
    readTime: "6 دقائق",
    image: "/blog/branding-startup.jpg",
    author: "صلاح بلس",
  },
  {
    id: "programming-roadmap",
    title: "دليلك الشامل لبدء رحلتك في عالم البرمجة من الصفر",
    excerpt: "لا تعرف من أين تبدأ في البرمجة؟ إليك خارطة الطريق لاختيار لغة البرمجة المناسبة وكيف تصبح محترفاً.",
    date: "2026-11-05",
    category: "برمجة وتطوير",
    readTime: "8 دقائق",
    image: "/blog/programming-guide.jpg",
    author: "صلاح بلس",
  },
];

export const stats: Stat[] = [
  { id: "projects", value: 500, suffix: "+", label: "مشروع", prefix: "+" },
  { id: "clients", value: 300, suffix: "+", label: "عميل", prefix: "+" },
  { id: "services", value: 7, suffix: "", label: "خدمات متكاملة", prefix: "+" },
];

export const socialLinks = {
  facebook: "https://www.facebook.com/share/1b3hZEpeW5/",
  x: "https://x.com/SALA1PLUS",
  instagram: "https://www.instagram.com/salahh.plus?igsh=MXM0emtmaWFvOGVuZA==",
  whatsapp: "https://wa.me/967775307315",
  email: "salahplus2026@gmail.com",
};
