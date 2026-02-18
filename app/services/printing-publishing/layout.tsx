import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Printing & Publishing Services",
  description:
    "Professional printing and publishing services in Nepal by GR8 Pvt. Ltd. Business cards, brochures, banners, catalogs, packaging design, and high-quality print production.",
  openGraph: {
    title: "Printing & Publishing Services | GR8 Pvt. Ltd.",
    description:
      "High-quality printing and publishing solutions from GR8 Pvt. Ltd. — business cards, brochures, banners, and more.",
    url: "https://gr8.com.np/services/printing-publishing/",
  },
  alternates: {
    canonical: "https://gr8.com.np/services/printing-publishing/",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
