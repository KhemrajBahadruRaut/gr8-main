import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO Services",
  description:
    "Boost your website's Google ranking with professional SEO services from GR8 Pvt. Ltd. in Nepal. On-page SEO, off-page SEO, technical SEO, and local SEO strategies that deliver results.",
  openGraph: {
    title: "SEO Services | GR8 Pvt. Ltd.",
    description:
      "Improve your Google ranking with expert SEO services by GR8 Pvt. Ltd. — driving organic traffic for businesses in Nepal.",
    url: "https://gr8.com.np/services/seo-services/",
  },
  alternates: {
    canonical: "https://gr8.com.np/services/seo-services/",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
