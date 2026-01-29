/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.digitalplace.ai',
        pathname: '/storage/uploads/**',
      }
    ],
  },
};

export default nextConfig;


