/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.BACKEND_URL}/api/:path*`,
      },
    ];
  },
  reactStrictMode: true,
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || '',
  images: {
    domains: ['localhost', 'https://trustbank1.vercel.app/'],
    loader: 'default',
    path: '/_next/image',
  },
};

export default nextConfig;