/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
    unoptimized: true,
    qualities: [75, 100],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-icons'],
  },
};

module.exports = nextConfig;
