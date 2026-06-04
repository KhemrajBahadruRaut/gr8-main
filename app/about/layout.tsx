import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about GR8 Pvt. Ltd., our story, mission, values, and the team driving innovation in digital solutions across Nepal. Meet our leadership and discover what makes us different.",
  openGraph: {
    title: "About Us | G R Eight Private Limited",
    description:
      "Learn about GR8 Pvt. Ltd., our story, mission, values, and the talented team behind our digital solutions.",
    url: "https://gr8.com.np/about/",
  },
  alternates: {
    canonical: "https://gr8.com.np/about/",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
