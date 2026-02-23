import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help Center",
  description:
    "Find answers to common questions, browse support topics, and contact GR8 support.",
  alternates: {
    canonical: "https://gr8.com.np/resources/help-center/",
  },
};

export default function HelpCenterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
