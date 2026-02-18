import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with GR8 Pvt. Ltd. for web development, digital marketing, SEO, graphics design, and IT consulting services in Nepal. Let's discuss your project today.",
  openGraph: {
    title: "Contact Us | GR8 Pvt. Ltd.",
    description:
      "Reach out to GR8 Pvt. Ltd. for all your digital solution needs. We're here to help your business grow.",
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
