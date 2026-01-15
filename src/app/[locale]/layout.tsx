import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Amiri, Cairo, Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
});

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://mumin.ink';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Mumin Hadith Reader | Access Authentic Prophetic Wisdom",
    template: "%s | Mumin Hadith"
  },
  description: "A premium, beautiful experience for reading and studying authentic Hadith collections. Your spiritual companion for the Sunnah. 100% authentic narrations.",
  applicationName: "Mumin Hadith",
  authors: [{ name: "Mumin Team" }],
  generator: "Next.js",
  keywords: ["Hadith", "Prophet Muhammad", "Sunnah", "Sahih Bukhari", "Sahih Muslim", "Islamic Knowledge", "Mumin", "Daily Hadith"],
  referrer: "origin-when-cross-origin",
  creator: "Mumin",
  publisher: "Mumin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: './',
    languages: {
      'en': '/en',
      'ru': '/ru',
      'ar': '/ar',
      'ur': '/ur',
      'tr': '/tr',
      'id': '/id',
      'x-default': '/en',
    },
  },
  openGraph: {
    title: "Mumin Hadith Reader | Access Authentic Prophetic Wisdom",
    description: "Read and study authentic Hadith in a beautiful environment.",
    url: BASE_URL,
    siteName: "Mumin Hadith",
    images: [
      {
        url: "/og-image.png", // This will be handled by dynamic opengraph-image.tsx mostly, but good to have a fallback
        width: 1200,
        height: 630,
        alt: "Mumin Hadith Reader",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mumin Hadith Reader",
    description: "Connect with the Prophetic Wisdom.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Mumin Hadith",
  },
};

export const viewport: Viewport = {
  themeColor: "#064e3b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

import { StructuredData, generateSearchSchema } from "@/components/StructuredData";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import { GlobalPanels } from '@/components/GlobalPanels';
import { ThemeApplier } from '@/components/ThemeApplier';
import { Analytics } from '@/components/Analytics';

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <head>
        <StructuredData data={generateSearchSchema(BASE_URL)} />
      </head>
      <body
        suppressHydrationWarning
        className={cn(
          "min-h-screen font-body antialiased",
          inter.variable,
          playfair.variable,
          amiri.variable,
          cairo.variable,
          poppins.variable
        )}
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ThemeApplier />
          <Analytics />
          {children}
          <GlobalPanels />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
