import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Script from "next/script";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Days From Today - Calculate Future Dates Fast & Easy",
  description: "Calculate what date it will be X days from today. Free online calculator with business days, holidays, and multiple date formats. Instant results for any number of days.",
  keywords: "days from today, date calculator, future date, business days calculator, business days from today, days ahead calculator",
  authors: [{ name: "Days From Today" }],
  creator: "Days From Today",
  publisher: "Days From Today",
  openGraph: {
    title: "Days From Today - Calculate Future Dates Fast & Easy",
    description: "Calculate what date it will be X days from today. Free online calculator with business days, holidays, and multiple date formats.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Days From Today",
    description: "Calculate what date it will be X days from today. Free online calculator with instant results.",
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
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://daysfromtoday.app" />
        <meta name="theme-color" content="#3B82F6" />
      </head>
      <body
        className={`${geist.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-CMN4W44SDF" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CMN4W44SDF');
          `}
        </Script>
        
        <ThemeProvider>
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
