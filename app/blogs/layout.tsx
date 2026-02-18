import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Read the latest insights, tips, and trends in digital marketing, web development, SEO, and technology from GR8 Pvt. Ltd. Stay informed with expert articles.",
  openGraph: {
    title: "Blogs | GR8 Pvt. Ltd.",
    description:
      "Stay updated with the latest digital marketing, web development, and technology insights from GR8 Pvt. Ltd.",
    url: "https://gr8.com.np/blogs/",
  },
  alternates: {
    canonical: "https://gr8.com.np/blogs/",
  },
};

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
