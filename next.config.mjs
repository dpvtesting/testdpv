/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admindpv.newman.id',
        pathname: '/storage/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'admin.digitalplace.ai',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
