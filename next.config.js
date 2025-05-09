/** @type {import('next').NextConfig} */

// Einfache CommonJS-Version ohne Dynamic Imports
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

// Prüfen, ob next-pwa erfolgreich importiert werden kann
let withPWA;
try {
  withPWA = require('next-pwa');
  module.exports = withPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development'
  })(nextConfig);
} catch (e) {
  console.warn('next-pwa konnte nicht geladen werden:', e.message);
  module.exports = nextConfig;
} 