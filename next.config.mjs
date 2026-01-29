/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      
        new URL('https://admin.digitalplace.ai/storage/uploads/**')
      
    ],
  },
};

export default nextConfig;





