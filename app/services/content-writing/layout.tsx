import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Content Writing Services",
  description:
    "Professional content writing services in Nepal by GR8 Pvt. Ltd. SEO-optimized blog posts, website copy, articles, and marketing content that engages your audience and drives traffic.",
  openGraph: {
    title: "Content Writing Services | GR8 Pvt. Ltd.",
    description:
      "Engage your audience with professional content writing from GR8 Pvt. Ltd. — SEO-optimized and conversion-focused.",
    url: "https://gr8.com.np/services/content-writing/",
  },
  alternates: {
    canonical: "https://gr8.com.np/services/content-writing/",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
