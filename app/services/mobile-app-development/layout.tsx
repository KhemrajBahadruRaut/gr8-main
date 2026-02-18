import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mobile App Development",
  description:
    "Professional mobile app development services in Nepal by GR8 Pvt. Ltd. iOS, Android, and cross-platform app development using React Native, Flutter, and modern frameworks.",
  openGraph: {
    title: "Mobile App Development | GR8 Pvt. Ltd.",
    description:
      "Build powerful mobile apps with GR8 Pvt. Ltd. — iOS, Android, and cross-platform development in Nepal.",
    url: "https://gr8.com.np/services/mobile-app-development/",
  },
  alternates: {
    canonical: "https://gr8.com.np/services/mobile-app-development/",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
