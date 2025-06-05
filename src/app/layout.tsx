import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "GiftReco - Topluluk Destekli Hediye Önerileri",
  description:
    "Gerçek kullanıcıların deneyimleriyle en iyi hediye fikirlerini keşfedin. Sosyal kanıt ile desteklenen, güvenilir hediye önerileri.",
  keywords:
    "hediye, hediye önerisi, hediye fikirleri, doğum günü hediyesi, özel gün hediyeleri",
  authors: [{ name: "GiftReco Team" }],
  openGraph: {
    title: "GiftReco - Topluluk Destekli Hediye Önerileri",
    description:
      "Gerçek kullanıcıların deneyimleriyle en iyi hediye fikirlerini keşfedin.",
    url: "https://giftreco.com",
    siteName: "GiftReco",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GiftReco - Hediye Önerisi Platformu",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GiftReco - Topluluk Destekli Hediye Önerileri",
    description:
      "Gerçek kullanıcıların deneyimleriyle en iyi hediye fikirlerini keşfedin.",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#7c3aed" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />

        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "GiftReco",
              description: "Topluluk destekli hediye öneri platformu",
              url: "https://giftreco.com",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://giftreco.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-purple-600 text-white px-4 py-2 rounded-lg z-50"
        >
          Ana içeriğe geç
        </a>

        <div id="main-content">{children}</div>

        {/* Global notification container */}
        <div
          id="notifications"
          className="fixed top-4 right-4 z-50 space-y-2"
        ></div>
      </body>
    </html>
  );
}
