import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "صلاح بلس | حلول إبداعية وتقنية في مكان واحد",
  description:
    "نحول أفكارك إلى تصاميم احترافية، ونقدم حلولاً تقنية وإبداعية متكاملة. خدمات التصميم الجرافيكي، الهويات البصرية، الكتب التعليمية، العروض التقديمية، وحلول الذكاء الاصطناعي.",
  keywords: [
    "تصميم جرافيكي",
    "هوية بصرية",
    "شعارات",
    "كتب تعليمية",
    "عروض تقديمية",
    "ذكاء اصطناعي",
    "صلاح بلس",
    "خدمات تقنية",
    "تصميم",
  ],
  authors: [{ name: "صلاح بلس" }],
  creator: "صلاح بلس",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "صلاح بلس | حلول إبداعية وتقنية في مكان واحد",
    description:
      "نحول أفكارك إلى تصاميم احترافية، ونقدم حلولاً تقنية وإبداعية متكاملة.",
    type: "website",
    locale: "ar_YE",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "صلاح بلس",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "صلاح بلس | حلول إبداعية وتقنية",
    description:
      "نحول أفكارك إلى تصاميم احترافية، ونقدم حلولاً تقنية وإبداعية متكاملة.",
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
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}