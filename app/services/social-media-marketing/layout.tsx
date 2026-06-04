import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Media Marketing",
  description:
    "G R Eight offers social media marketing in Nepal to grow your brand on Facebook, Instagram, LinkedIn, and other platforms.",
  openGraph: {
    title: "Social Media Marketing | G R Eight Private Limited",
    description:
      "Grow your brand on social media with expert marketing strategies from G R Eight Private Limited",
    url: "https://gr8.com.np/services/social-media-marketing/",
  },
  alternates: {
    canonical: "https://gr8.com.np/services/social-media-marketing/",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
