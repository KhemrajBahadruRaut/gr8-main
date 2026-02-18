import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Graphics Designing",
  description:
    "Creative graphics design services in Nepal by GR8 Pvt. Ltd. Logo design, brand identity, social media graphics, print materials, and visual content that makes your brand stand out.",
  openGraph: {
    title: "Graphics Designing | GR8 Pvt. Ltd.",
    description:
      "Stand out with stunning graphic designs from GR8 Pvt. Ltd. — logos, branding, and visual content.",
    url: "https://gr8.com.np/services/graphics-designing/",
  },
  alternates: {
    canonical: "https://gr8.com.np/services/graphics-designing/",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
