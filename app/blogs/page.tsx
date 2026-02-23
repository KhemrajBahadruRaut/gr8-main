import type { Metadata } from "next";
import BlogsClient from "./BlogsClient";

const DEFAULT_OG_IMAGE =
  "https://gr8.com.np/mainlogo/GR8-Nepal-Private-Limited-Logo.webp";

export const metadata: Metadata = {
  title: "Blogs | GR8 Nepal",
  description:
    "Explore our latest articles and insights on digital marketing, technology, and business growth.",
  alternates: {
    canonical: "https://gr8.com.np/blogs/",
  },
  openGraph: {
    title: "Blogs | GR8 Nepal",
    description:
      "Explore our latest articles and insights on digital marketing, technology, and business growth.",
    url: "https://gr8.com.np/blogs/",
    type: "website",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        alt: "GR8 Nepal Blogs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blogs | GR8 Nepal",
    description:
      "Explore our latest articles and insights on digital marketing, technology, and business growth.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function BlogsPage() {
  return <BlogsClient />;
}
