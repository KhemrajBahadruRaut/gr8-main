// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/app/LayoutWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gr8.com.np"),
  title: {
    default: "GR8 Pvt. Ltd. | Digital Solutions Company in Nepal",
    template: "%s | GR8 Pvt. Ltd.",
  },
  description:
    "GR8 Pvt. Ltd. is a leading digital solutions company in Nepal offering web development, mobile app development, UI/UX design, SEO, branding, and IT consulting services. We help businesses grow through modern technology and innovative digital strategies.",
  keywords: [
    "GR8 Pvt. Ltd.",
    "Digital Solutions Nepal",
    "Web Development Nepal",
    "UI/UX Design",
    "Branding",
    "IT Consulting Nepal",
    "Software Development",
    "Digital Marketing Nepal",
    "SEO Services Nepal",
    "Mobile App Development Nepal",
    "Tech Company Nepal",
    "Graphics Design Nepal",
  ],
  authors: [{ name: "GR8 Pvt. Ltd." }],
  creator: "GR8 Pvt. Ltd.",
  publisher: "GR8 Pvt. Ltd.",
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
  openGraph: {
    title: "GR8 Pvt. Ltd. | Digital Solutions Company in Nepal",
    description:
      "We build modern digital products — websites, branding, and enterprise solutions that help businesses grow.",
    url: "https://gr8.com.np",
    siteName: "GR8 Pvt. Ltd.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GR8 Pvt. Ltd. - Digital Solutions Company in Nepal",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GR8 Pvt. Ltd. | Digital Solutions Company in Nepal",
    description:
      "We build modern digital products — websites, branding, and enterprise solutions that help businesses grow.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://gr8.com.np",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

// JSON-LD structured data for Organization
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "GR8 Pvt. Ltd.",
  url: "https://gr8.com.np",
  logo: "https://gr8.com.np/mainlogo/gr8logo.png",
  description:
    "GR8 Pvt. Ltd. is a leading digital solutions company in Nepal offering web development, mobile app development, UI/UX design, SEO, branding, and IT consulting services.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "NP",
  },
  sameAs: [],
  foundingDate: "2024",
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    minValue: 5,
    maxValue: 20,
  },
  serviceArea: {
    "@type": "Place",
    name: "Nepal",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Digital Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Web Development",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Mobile App Development",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "SEO Services",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Digital Marketing",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Graphics Designing",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "UI/UX Design",
        },
      },
    ],
  },
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
