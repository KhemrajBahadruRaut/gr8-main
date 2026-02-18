import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Development Services",
  description:
    "Professional web development services in Nepal by GR8 Pvt. Ltd. We build responsive, modern websites and web applications using the latest technologies. Custom solutions for your business.",
  openGraph: {
    title: "Web Development Services | GR8 Pvt. Ltd.",
    description:
      "Get a modern, responsive website built by GR8 Pvt. Ltd. — custom web development solutions for businesses in Nepal.",
    url: "https://gr8.com.np/services/web-development/",
  },
  alternates: {
    canonical: "https://gr8.com.np/services/web-development/",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
