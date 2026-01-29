/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL('https://admindpv.newman.id/storage/uploads/**')],
    unoptimized: true
    protocol: 'https',
    hostname: 'admin.digitalplace.ai',
  },
};

export default nextConfig;

