import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Email Marketing Services",
  description:
    "G R Eight offers email marketing services in Nepal including campaigns, newsletters, and automation to boost engagement and conversions.",
  openGraph: {
    title: "Email Marketing Services | G R Eight Private Limited",
    description:
      "Drive conversions with targeted email marketing campaigns from G R Eight Private Limited",
    url: "https://gr8.com.np/services/email-marketing/",
  },
  alternates: {
    canonical: "https://gr8.com.np/services/email-marketing/",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
