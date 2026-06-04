import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the privacy policy of G R Eight Private Limited Learn how we collect, use, and protect your personal data when you use our website and services.",
  openGraph: {
    title: "Privacy Policy | G R Eight Private Limited",
    description:
      "Learn how G R Eight Private Limited handles your personal data and privacy.",
    url: "https://gr8.com.np/privacy/",
  },
  alternates: {
    canonical: "https://gr8.com.np/privacy/",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
