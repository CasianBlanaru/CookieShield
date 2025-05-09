/** @type {import('next').NextConfig} */

// Konfiguration für Tailwind v4
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