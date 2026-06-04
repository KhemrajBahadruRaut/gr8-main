import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join G R Eight and build your future in web development, digital marketing, SEO, design, and technology. Explore opportunities to learn, grow.",
  openGraph: {
    title: "Careers | G R Eight Private Limited",
    description:
      "Explore exciting career opportunities at G R Eight Private Limited Join our team of innovators and digital experts.",
    url: "https://gr8.com.np/careers/",
  },
  alternates: {
    canonical: "https://gr8.com.np/careers/",
  },
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
