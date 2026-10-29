import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "@/app/globals.css";

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
    icon: "/assets/logo.png",
    apple: "/assets/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: "KVADRO KYIV 1 — Прокат квадроциклів у Києві",
    description:
      "Оренда та прогулянки на квадроциклах, ендуро мотоциклах та баггі у Києві (Бортничі). Індивідуальні та групові заїзди, корпоративи, подарункові сертифікати.",
    image: "https://kvadrokyiv1.com.ua/assets/hero-quad.png",
    telephone: "+380984327179",
    url: "https://kvadrokyiv1.com.ua",
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
      latitude: "50.385204",
      longitude: "30.710882",
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
      "https://www.instagram.com/kvadro_kyiv1",
      "https://t.me/Kvadro_kyiv1",
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
