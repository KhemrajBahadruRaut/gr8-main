import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Media Marketing",
  description:
    "Strategic social media marketing services in Nepal by GR8 Pvt. Ltd. Grow your brand presence on Facebook, Instagram, LinkedIn, and more with data-driven campaigns.",
  openGraph: {
    title: "Social Media Marketing | GR8 Pvt. Ltd.",
    description:
      "Grow your brand on social media with expert marketing strategies from GR8 Pvt. Ltd.",
    url: "https://gr8.com.np/services/social-media-marketing/",
  },
  alternates: {
    canonical: "https://gr8.com.np/services/social-media-marketing/",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
