import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Have a project in mind? Contact G R Eight for professional web development, digital marketing, SEO, design, and technology services.",
  openGraph: {
    title: "G R Eight Private Limited",
    description:
      "Reach out to G R Eight Private Limited for all your digital solution needs. We're here to help your business grow.",
    url: "https://gr8.com.np/contact/",
  },
  alternates: {
    canonical: "https://gr8.com.np/contact/",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
