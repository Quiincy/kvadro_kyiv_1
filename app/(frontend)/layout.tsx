import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import "@/app/globals.css";
import { defaultFaqs, defaultSettings } from "@/lib/defaultData";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
  display: "swap",
});

const rawUrl = process.env.NEXT_PUBLIC_SERVER_URL || "";
const siteUrl =
  rawUrl && !rawUrl.includes("localhost") && !rawUrl.includes("kvadro-kyiv-1.vercel.app")
    ? rawUrl
    : "https://kvadrokyiv1-lake.vercel.app";

const ogImageUrl = `${siteUrl}/assets/og-image.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Прокат квадроциклів, мото та баггі у Києві | KVADRO KYIV 1",
  description:
    "Прокат квадроциклів, ендуро та баггі у лісових трасах Києва. Нове екіпірування, навчання та напої безкоштовно. Бронюйте драйвовий відпочинок онлайн!",
  alternates: {
    canonical: siteUrl,
  },
  keywords: [
    "прокат квадроциклів київ",
    "оренда квадроцикла київ",
    "квадроцикли бортничі",
    "катання на квадроциклах",
    "прокат баггі київ",
    "ендуро мотопрогулянка київ",
    "подарунковий сертифікат на квадроцикл",
    "активний відпочинок київ",
  ],
  authors: [{ name: "KVADRO KYIV 1" }],
  creator: "KVADRO KYIV 1",
  publisher: "KVADRO KYIV 1",
  formatDetection: {
    telephone: true,
    address: true,
  },
  openGraph: {
    title: "KVADRO KYIV 1 — Прокат квадроциклів, ендуро та баггі у Києві",
    description:
      "Драйвові прогулянки лісовими трасами Бортничів. Потужні квадроцикли 250-500сс, ендуро мотоцикли, безпечні баггі. Безкоштовне екіпірування та напої на фініші!",
    url: siteUrl,
    siteName: "KVADRO KYIV 1",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Прокат квадроциклів у Києві KVADRO KYIV 1",
      },
    ],
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KVADRO KYIV 1 — Прокат квадроциклів у Києві",
    description:
      "Драйвові прогулянки на квадроциклах, мото та баггі у лісі біля Києва. Замовляйте онлайн!",
    images: [ogImageUrl],
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
  icons: {
    icon: [
      { url: "/assets/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/logo.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/assets/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SportsActivityLocation",
        "@id": `${siteUrl}/#organization`,
        name: "KVADRO KYIV 1 — Прокат квадроциклів у Києві",
        description:
          "Оренда та прогулянки на квадроциклах, ендуро мотоциклах та баггі у Києві (Бортничі). Індивідуальні та групові заїзди, корпоративи, подарункові сертифікати.",
        image: `${siteUrl}/assets/hero-quad.webp`,
        telephone: defaultSettings.phoneRaw,
        url: siteUrl,
        priceRange: "1400 - 5200 UAH",
        address: {
          "@type": "PostalAddress",
          streetAddress: "вул. Лісова 76К",
          addressLocality: "Київ, Дарницький район (Бортничі)",
          addressRegion: "Київська область",
          addressCountry: "UA",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: String(defaultSettings.coordinates.lat),
          longitude: String(defaultSettings.coordinates.lng),
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5.0",
          bestRating: "5",
          worstRating: "1",
          reviewCount: "48",
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "09:00",
            closes: "20:00",
          },
        ],
        sameAs: [
          defaultSettings.instagram,
          defaultSettings.telegram,
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/#faq`,
        mainEntity: defaultFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      },
    ],
  };

  return (
    <html lang="uk" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${montserrat.variable} bg-[#0B0E14] text-slate-100 antialiased selection:bg-[#FF5722] selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
