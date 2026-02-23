/** @type {import('next').NextConfig} */
const nextConfig: import("next").NextConfig = {
  // output: 'export',
  // output: 'standalone',
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/blogs",
        has: [{ type: "query", key: "slug", value: "(?<slug>.*)" }],
        destination: "/blogs/:slug/",
        permanent: true,
      },
      {
        source: "/blogs/",
        has: [{ type: "query", key: "slug", value: "(?<slug>.*)" }],
        destination: "/blogs/:slug/",
        permanent: true,
      },
      {
        source: "/services/pay-per-click",
        destination: "/services/ppc/",
        permanent: true,
      },
      {
        source: "/services/pay-per-click/",
        destination: "/services/ppc/",
        permanent: true,
      },
      {
        source: "/docs",
        destination: "/resources/help-center/",
        permanent: true,
      },
      {
        source: "/docs/",
        destination: "/resources/help-center/",
        permanent: true,
      },
      {
        source: "/videos",
        destination: "/resources/help-center/",
        permanent: true,
      },
      {
        source: "/videos/",
        destination: "/resources/help-center/",
        permanent: true,
      },
      {
        source: "/community",
        destination: "/resources/help-center/",
        permanent: true,
      },
      {
        source: "/community/",
        destination: "/resources/help-center/",
        permanent: true,
      },
    ];
  },
  images: {
    unoptimized: true,

    remotePatterns: [
      // Instagram CDN
      {
        protocol: "https",
        hostname: "scontent.cdninstagram.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "instagram.fktm10-1.fna.fbcdn.net",
        pathname: "/**",
      },

      // Unsplash
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
