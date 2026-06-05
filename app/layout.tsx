import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import ChatBot from "@/components/ChatBot";

export const metadata: Metadata = {
  title: "صلاح بلس | تصميم جرافيكي وهوية بصرية احترافية في اليمن",
  description:
    "صلاح بلس - خدمات تصميم جرافيكي وهوية بصرية احترافية في اليمن. تصميم شعارات، عروض تقديمية، كتب تعليمية، وحلول ذكاء اصطناعي. اطلب خدمتك الآن",
  keywords: [
    // كلمات عامة
    "تصميم جرافيكي",
    "هوية بصرية",
    "شعارات",
    "كتب تعليمية",
    "عروض تقديمية",
    "ذكاء اصطناعي",
    "خدمات تقنية",
    "تصميم",
    
    // كلمات تستهدف اليمن
    "تصميم جرافيكي اليمن",
    "مصمم جرافيك يمني",
    "خدمات تصميم اليمن",
    "هوية تجارية اليمن",
    "شعارات احترافية اليمن",
    "عروض بوربوينت اليمن",
    "تصميم كتب اليمن",
    "ذكاء اصطناعي اليمن",
    "حلول تقنية اليمن",
    "خدمات الكترونية اليمن",
    "تصميم هوية بصرية صنعاء",
    "مصمم شعارات عدن",
    "خدمات تصميم تعز",
    
    // كلمات تجارية
    "صلاح بلس",
    "وكالة تصميم",
    "حلول إبداعية",
    "تسويق رقمي",
    "برمجيات",
    "أتمتة",
    "ChatGPT",
    "Midjourney",
    
    // كلمات طويلة
    "افضل مصمم جرافيك في اليمن",
    "تصميم هوية تجارية احترافية",
    "اسعار تصميم الشعارات في اليمن",
    "خدمات تصميم جرافيكي اون لاين",
    "كيف اسوي عرض تقديمي احترافي",
  ],
  authors: [{ name: "صلاح بلس" }],
  creator: "صلاح بلس",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "صلاح بلس | تصميم جرافيكي وهوية بصرية احترافية في اليمن",
    description:
      "خدمات تصميم جرافيكي وهوية بصرية احترافية في اليمن. تصميم شعارات، عروض تقديمية، كتب تعليمية، وحلول ذكاء اصطناعي.",
    type: "website",
    locale: "ar_YE",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "صلاح بلس - خدمات تصميم جرافيكي في اليمن",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "صلاح بلس | تصميم جرافيكي وهوية بصرية في اليمن",
    description:
      "خدمات تصميم جرافيكي وهوية بصرية احترافية في اليمن. تصميم شعارات، عروض تقديمية، وحلول ذكاء اصطناعي.",
    images: ["/logo.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8FAFC" },
    { media: "(prefers-color-scheme: dark)", color: "#0F172A" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <meta name="application-name" content="صلاح بلس" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="صلاح بلس" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Google Search Console */}
        <meta name="google-site-verification" content="gaD1sbl3GPTI-YUYirBXUwU_78oIV5Xia04wqJTkEIs" />
        
        {/* Turnstile */}
        <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <ChatBot />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
