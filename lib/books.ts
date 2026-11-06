export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  image_url: string;
  description: string;
  badge?: string;      // شارة الكتاب (مثل: الأكثر مبيعاً)
  rating: number;      // التقييم
  reviewsCount: number; // عدد المقيمين
}

export const booksData: Book[] = [
  {
    id: 1,
    title: "المرشد العملي في برمجة C++",
    author: "م. صلاح عبده البزالي",
    price: 3500,
    image_url: "/books/cpp.jpg",
    description: "🚀 رحلتك الشاملة لاحتراف البرمجة بلغة C++\n\n📚 ماذا ستتعلم في هذا الكتاب؟\n• أساسيات لغة C++ والمفاهيم البرمجية الصحيحة.\n• البرمجة كائنية التوجه (OOP) وفهمها بعمق.\n• التعامل مع هياكل البيانات (Data Structures).\n• بناء أنظمة وبرمجيات متكاملة من الصفر.\n• تطبيقات عملية وأمثلة واقعية لتثبيت المفهوم.",
    badge: "الأكثر مبيعاً",
    rating: 5,
    reviewsCount: 42
  },
  {
    id: 2,
    title: "تطوير واجهات المستخدم Front-End",
    author: "م. صلاح عبده البزالي",
    price: 3200,
    image_url: "/books/frontend.jpg",
    description: "💻 بوابتك لعالم تصميم وبرمجة واجهات الويب الحديثة\n\n🛠️ ماذا ستتقن في هذا الجزء؟\n• HTML5 و CSS3 لبناء وتنسيق الهياكل الأساسية.\n• JavaScript ES6+ لإضافة التفاعل والحيوية.\n• إتقان أطر عمل حديثة مثل React.js و Next.js.\n• إدارة الأكواد باستخدام Git و GitHub.\n• بناء مشاريع واجهات مستخدم (UI) متكاملة ومتجاوبة.",
    badge: "جديد",
    rating: 4.8,
    reviewsCount: 28
  },
  {
    id: 3,
    title: "تطوير الأنظمة المتكاملة Back-End",
    author: "م. صلاح عبده البزالي",
    price: 3000,
    image_url: "/books/backend.jpg",
    description: "⚙️ أسس بناء الخوادم وقواعد البيانات الاحترافية\n\n🛡️ ماذا ستتقن في هذا الجزء؟\n• بناء خوادم قوية باستخدام Node.js و Express.\n• التعامل مع قواعد بيانات MongoDB بكفاءة عالية.\n• تصميم وبناء واجهات برمجة التطبيقات (RESTful APIs).\n• أنظمة المصادقة والأمان (Authentication & Authorization).\n• اختبار التطبيقات (Testing) ورفعها (Deployment).",
    badge: "متقدم",
    rating: 4.9,
    reviewsCount: 35
  },
  {
    id: 4,
    title: "Python والذكاء الاصطناعي",
    author: "م. صلاح عبده البزالي",
    price: 2500,
    image_url: "/books/python.jpg",
    description: "🧠 من أساسيات Python إلى آفاق الذكاء الاصطناعي\n\n🤖 ماذا ستتعلم في هذه الرحلة؟\n• أساسيات لغة Python وأساليب البرمجة الذكية.\n• مفاهيم التعلم الآلي (Machine Learning) وكيفية تطبيقها.\n• التعمق في التعلم العميق (Deep Learning) والشبكات العصبية.\n• بناء تطبيقات ذكية قادرة على التحليل والتنبؤ.\n• مشاريع عملية في تحليل البيانات والرؤية الحاسوبية.",
    badge: "الأكثر طلباً",
    rating: 5,
    reviewsCount: 56
  },
];
