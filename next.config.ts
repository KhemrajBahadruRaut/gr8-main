    /** @type {import('next').NextConfig} */
    const nextConfig: import('next').NextConfig = {
        images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      // Add other domains if needed
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
    ],
  },
    };

    export default nextConfig;
