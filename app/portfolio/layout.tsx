import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore GR8 Pvt. Ltd.'s portfolio of successful digital projects including websites, mobile apps, branding, and digital marketing campaigns delivered for clients across Nepal.",
  openGraph: {
    title: "Portfolio | G R Eight Private Limited",
    description:
      "See our work — successful digital projects delivered for businesses across Nepal.",
    url: "https://gr8.com.np/portfolio/",
  },
  alternates: {
    canonical: "https://gr8.com.np/portfolio/",
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
