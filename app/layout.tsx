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
  title: "GR8 Pvt. Ltd. | Digital Solutions Company",
  description:
    "GR8 Pvt. Ltd. is a leading digital solutions company offering web development, mobile app development, UI/UX design, branding, and IT consulting services. We help businesses grow through modern technology and innovative digital strategies.",
  keywords: [
    "GR8 Pvt. Ltd.",
    "Digital Solutions",
    "Web Development",
    "UI/UX Design",
    "Branding",
    "IT Consulting",
    "Software Development",
    "Digital Marketing",
    "Tech Company Nepal",
  ],
  authors: [{ name: "GR8 Pvt. Ltd." }],
  creator: "GR8 Pvt. Ltd.",
  publisher: "GR8 Pvt. Ltd.",
  robots: "index, follow",
  openGraph: {
    title: "GR8 Pvt. Ltd. | Digital Solutions Company",
    description:
      "We build modern digital products — websites, branding, and enterprise solutions that help businesses grow.",
    url: "https://gr8.com.np",
    siteName: "GR8 Pvt. Ltd.",
    images: [
      {
        url: "https://gr8.com.np/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GR8 Pvt. Ltd. - Digital Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}