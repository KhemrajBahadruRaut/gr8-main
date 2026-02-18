import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PPC Advertising Services",
  description:
    "Results-driven PPC advertising services in Nepal by GR8 Pvt. Ltd. Google Ads, Facebook Ads, and paid campaign management that maximizes your ROI and drives targeted traffic.",
  openGraph: {
    title: "PPC Advertising Services | GR8 Pvt. Ltd.",
    description:
      "Maximize your ROI with expert PPC advertising from GR8 Pvt. Ltd. — Google Ads, Facebook Ads, and more.",
    url: "https://gr8.com.np/services/ppc/",
  },
  alternates: {
    canonical: "https://gr8.com.np/services/ppc/",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
