/** @type {import('next').NextConfig} */

// Einfache Konfiguration ohne PWA für stabile Vercel-Builds
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ['ajv'],
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig; 