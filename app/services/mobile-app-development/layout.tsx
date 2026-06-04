import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mobile App Development",
  description:
    "Looking for mobile app development in Nepal? G R Eight creates custom iOS and Android apps with Flutter, React Native, and scalable architecture.",
  openGraph: {
    title: "Mobile App Development | G R Eight Private Limited",
    description:
      "Build powerful mobile apps with G R Eight Private Limited — iOS, Android, and cross-platform development in Nepal.",
    url: "https://gr8.com.np/services/mobile-app-development/",
  },
  alternates: {
    canonical: "https://gr8.com.np/services/mobile-app-development/",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
