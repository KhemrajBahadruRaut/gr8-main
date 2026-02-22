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
    type: "website",
    siteName: "GR8 Pvt. Ltd.",
    images: [
      {
        url: "https://gr8.com.np/mainlogo/GR8-Nepal-Private-Limited-Logo.webp",
        alt: "GR8 Pvt. Ltd.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blogs | GR8 Pvt. Ltd.",
    description:
      "Stay updated with the latest digital marketing, web development, and technology insights from GR8 Pvt. Ltd.",
    images: ["https://gr8.com.np/mainlogo/GR8-Nepal-Private-Limited-Logo.webp"],
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
