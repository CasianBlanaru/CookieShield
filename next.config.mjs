/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';

// Konfiguration für Tailwind v3
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  transpilePackages: ['ajv'],
  poweredByHeader: false,
  experimental: {
    // Modern bundle for modern browsers
    optimizeCss: true,
  },
  
  // Öffentliche Ressourcen korrekt behandeln
  async headers() {
    return [
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Content-Type',
            value: 'application/json',
          },
        ],
      },
    ];
  },
};

// PWA-Konfiguration hinzufügen
const pwaConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
});

export default pwaConfig(nextConfig); 