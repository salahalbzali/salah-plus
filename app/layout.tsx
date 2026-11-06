import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import ChatBot from "@/components/ChatBot";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";
import MobileBottomNav from "@/components/MobileBottomNav";
import Schema from "./schema";
import { CartProvider } from "@/lib/CartContext";
import { CurrencyProvider } from "@/lib/CurrencyContext";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "صلاح بلس | تصميم جرافيكي وهوية بصرية احترافية في اليمن",
  description: "صلاح بلس - خدمات تصميم جرافيكي وهوية بصرية احترافية في اليمن. تصميم شعارات، عروض تقديمية، كتب تعليمية، وحلول ذكاء اصطناعي.",
  keywords: ["تصميم جرافيكي", "هوية بصرية", "شعارات", "كتب تعليمية", "ذكاء اصطناعي", "اليمن", "صلاح بلس"],
  authors: [{ name: "صلاح بلس" }],
  creator: "صلاح بلس",
  icons: { icon: "/favicon.ico", shortcut: "/favicon.ico", apple: "/favicon.ico" },
  openGraph: {
    title: "صلاح بلس | تصميم جرافيكي وهوية بصرية احترافية في اليمن",
    description: "خدمات تصميم جرافيكي وهوية بصرية احترافية في اليمن.",
    type: "website", locale: "ar_YE",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "صلاح بلس" }],
  },
  twitter: {
    card: "summary_large_image", title: "صلاح بلس | تصميم جرافيكي وهوية بصرية في اليمن",
    description: "خدمات تصميم جرافيكي وهوية بصرية احترافية في اليمن.", images: ["/logo.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#F8FAFC" }, { media: "(prefers-color-scheme: dark)", color: "#0F172A" }],
  width: "device-width", initialScale: 1, maximumScale: 5, userScalable: true,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-512x512.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="application-name" content="صلاح بلس" />
        <meta name="google-site-verification" content="gaD1sbl3GPTI-YUYirBXUwU_78oIV5Xia04wqJTkEIs" />
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
      </head>
      <body>
        <Schema />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <CurrencyProvider>
            <CartProvider>
              {children}
              
              {/* 👈 التواصل والفوتر يظهران في كل الصفحات تلقائياً */}
              <Contact />
              <Footer />
              
              <ChatBot />
              <WhatsAppButton />
              <ScrollToTop />
              <MobileBottomNav />
            </CartProvider>
          </CurrencyProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
