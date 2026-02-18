import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merchandise",
  description:
    "Shop official GR8 Pvt. Ltd. merchandise. Browse our collection of branded items and accessories.",
  openGraph: {
    title: "Merchandise | GR8 Pvt. Ltd.",
    description: "Shop official GR8 Pvt. Ltd. merchandise and branded items.",
    url: "https://gr8.com.np/merchendise/",
  },
  alternates: {
    canonical: "https://gr8.com.np/merchendise/",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
