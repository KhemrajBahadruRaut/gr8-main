/** @type {import('next').NextConfig} */
const nextConfig: import("next").NextConfig = {


  // output: 'export',
  // output: 'standalone',
  trailingSlash: true,
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
