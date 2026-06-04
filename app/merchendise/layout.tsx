import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merchandise",
  description:
    "Explore official G R Eight merchandise including branded apparel, corporate gifts, and exclusive products for professionals and enthusiasts.",
  openGraph: {
    title: "Merchandise | G R Eight Private Limited",
    description: "Shop official G R Eight Private Limited merchandise and branded items.",
    url: "https://gr8.com.np/merchendise/",
  },
  alternates: {
    canonical: "https://gr8.com.np/merchendise/",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
