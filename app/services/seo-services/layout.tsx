import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO Services",
  description:
    "G R Eight offers SEO services in Nepal including on-page, off-page, technical, and local SEO to improve rankings, traffic, and online visibility.",
  openGraph: {
    title: "SEO Services in Nepal | G R Eight Private Limited",
    description:
      "Improve your Google ranking with expert SEO services by G R Eight Private Limited — driving organic traffic for businesses in Nepal.",
    url: "https://gr8.com.np/services/seo-services/",
  },
  alternates: {
    canonical: "https://gr8.com.np/services/seo-services/",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
