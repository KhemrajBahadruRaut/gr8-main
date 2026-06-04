import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Content Writing Services",
  description:
    "Professional content writing in Nepal by G R Eight. SEO blogs, articles, and website copy that attract traffic and grow your business.",
  openGraph: {
    title: "Content Writing Services | G R Eight Private Limited",
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
