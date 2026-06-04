import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Development Services",
  description:
    "Professional web development services in Nepal. G R Eight builds responsive websites, custom web applications, and scalable digital solutions for businesses.",
  openGraph: {
    title: "Web Development Services | G R Eight Private Limited",
    description:
      "Get a modern, responsive website built by G R Eight Private Limited — custom web development solutions for businesses in Nepal.",
    url: "https://gr8.com.np/services/web-development/",
  },
  alternates: {
    canonical: "https://gr8.com.np/services/web-development/",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
