import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the GR8 Pvt. Ltd. team! Explore career opportunities in web development, digital marketing, design, and technology. Build your career with Nepal's growing digital solutions company.",
  openGraph: {
    title: "Careers | GR8 Pvt. Ltd.",
    description:
      "Explore exciting career opportunities at GR8 Pvt. Ltd. Join our team of innovators and digital experts.",
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
