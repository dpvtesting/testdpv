/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      
        new URL('https://admindpv.newman.id/storage/uploads/**')
      
    ],
  },
};

export default nextConfig;




