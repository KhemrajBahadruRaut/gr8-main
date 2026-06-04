import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PPC Advertising Services",
  description:
    "G R Eight offers PPC services in Nepal including Google Ads and Facebook Ads management to increase traffic and improve ROI.",
  openGraph: {
    title: "PPC Advertising Services | G R Eight Private Limited",
    description:
      "Maximize your ROI with expert PPC advertising from G R Eight Private Limited — Google Ads, Facebook Ads, and more.",
    url: "https://gr8.com.np/services/ppc/",
  },
  alternates: {
    canonical: "https://gr8.com.np/services/ppc/",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
