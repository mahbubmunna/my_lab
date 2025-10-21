import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // Defines a list of allowed external domains for Image components
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/**',
      },
      // You can add other placeholder/external image domains here if needed
      // e.g., { hostname: 'picsum.photos' },
      // e.g., { hostname: 'images.unsplash.com' },
    ],
  },
  compiler: {
    styledComponents: true, // enables SWC transform for styled-components
  },
};

export default nextConfig;
