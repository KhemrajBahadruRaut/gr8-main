/** @type {import('next').NextConfig} */
const nextConfig: import("next").NextConfig = {

  // /** @type {import('next').NextConfig} */


  output: 'export',
  trailingSlash: true,

  images: {
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
