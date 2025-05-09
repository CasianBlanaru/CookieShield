/** @type {import('next').NextConfig} */

// Verwendung eines dynamischen Import-Wrappers für bessere Kompatibilität
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const NextPWA = require('next-pwa');

const withPWA = NextPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
});

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  transpilePackages: ['ajv'],
  experimental: {
    // Modern bundle for modern browsers
    optimizeCss: true,
  },
};

// PWA-Konfiguration anwenden
export default withPWA(nextConfig); 