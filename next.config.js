/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        // pathname: '/image/upload/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        // pathname: '/image/upload/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        // pathname: '/image/upload/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com/a',
        port: '',
        // pathname: '/image/upload/**',
      },
    ],
  },
}

module.exports = nextConfig
