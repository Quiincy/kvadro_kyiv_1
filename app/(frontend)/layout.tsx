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

export const metadata: Metadata = {
  metadataBase: new URL("https://kvadrokyiv1.com.ua"),
  title: "KVADRO KYIV 1 — Прокат квадроциклів, ендуро та баггі у Києві | Бортничі",
  description:
    "Екстремальний та сімейний прокат квадроциклів, ендуро мотоциклів і баггі в Києві (Бортничі). Мальовничі лісові траси, піщані схили, нове захисне екіпірування, інструктаж. Бронюйте заїзд онлайн або за тел: +380 (98) 432-71-79.",
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
    url: "https://kvadrokyiv1.com.ua",
    siteName: "KVADRO KYIV 1",
    images: [
      {
        url: "/assets/hero-quad.png",
        width: 1200,
        height: 630,
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
    images: ["/assets/hero-quad.png"],
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
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
