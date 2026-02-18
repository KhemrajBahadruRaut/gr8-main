import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the privacy policy of GR8 Pvt. Ltd. Learn how we collect, use, and protect your personal data when you use our website and services.",
  openGraph: {
    title: "Privacy Policy | GR8 Pvt. Ltd.",
    description:
      "Learn how GR8 Pvt. Ltd. handles your personal data and privacy.",
    url: "https://gr8.com.np/privacy/",
  },
  alternates: {
    canonical: "https://gr8.com.np/privacy/",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
