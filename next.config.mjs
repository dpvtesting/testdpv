/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.digitalplace.ai',
      },
    ],
  },
  // THIS IS THE MAGIC PART
  async rewrites() {
    return [
      {
        source: '/storage/uploads/:path*',
        destination: 'https://admin.digitalplace.ai/storage/uploads/:path*',
      },
    ];
  },
};

export default nextConfig;
