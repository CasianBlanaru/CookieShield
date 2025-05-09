/** @type {import('next').NextConfig} */

// Einfache Konfiguration ohne PWA für stabile Vercel-Builds
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ['ajv'],
  swcMinify: true,
  poweredByHeader: false,
};

module.exports = nextConfig; 