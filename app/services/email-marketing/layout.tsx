import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Email Marketing Services",
  description:
    "Effective email marketing services in Nepal by GR8 Pvt. Ltd. Design engaging email campaigns, newsletters, and automated sequences that convert subscribers into customers.",
  openGraph: {
    title: "Email Marketing Services | GR8 Pvt. Ltd.",
    description:
      "Drive conversions with targeted email marketing campaigns from GR8 Pvt. Ltd.",
    url: "https://gr8.com.np/services/email-marketing/",
  },
  alternates: {
    canonical: "https://gr8.com.np/services/email-marketing/",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
