/** @type {import('next').NextConfig} */
const nextConfig: import("next").NextConfig = {

  // /** @type {import('next').NextConfig} */


  // output: 'export',
  output: 'standalone',
  trailingSlash: true,

  images: {
    domains: [
      "scontent.cdninstagram.com",
      "instagram.fktm10-1.fna.fbcdn.net"
    ],
     unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.unsplash.com",
      },
    ],
  
  },
  
  
};


export default nextConfig;
