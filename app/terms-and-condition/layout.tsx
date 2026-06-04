import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Read the terms and conditions of G R Eight Private Limited Understand the rules and guidelines that govern your use of our website and digital services.",
  openGraph: {
    title: "Terms & Conditions | GR8 Pvt. Ltd.",
    description:
      "Terms and conditions governing the use of G R Eight Private Limited website and services.",
    url: "https://gr8.com.np/terms-and-condition/",
  },
  alternates: {
    canonical: "https://gr8.com.np/terms-and-condition/",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
