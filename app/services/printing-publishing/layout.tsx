import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Printing & Publishing Services",
  description:
    "G R Eight offers printing and publishing services in Nepal including business cards, brochures, banners, catalogs, and packaging design.",
  openGraph: {
    title: "Printing & Publishing Services | G R Eight Private Limited",
    description:
      "High-quality printing and publishing solutions from G R Eight Private Limited — business cards, brochures, banners, and more.",
    url: "https://gr8.com.np/services/printing-publishing/",
  },
  alternates: {
    canonical: "https://gr8.com.np/services/printing-publishing/",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
