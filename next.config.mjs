/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL('https://admindpv.newman.id/storage/uploads/**')],
    unoptimized: true
  },
};

export default nextConfig;
