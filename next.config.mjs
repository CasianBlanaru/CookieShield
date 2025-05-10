/** @type {import('next').NextConfig} */

// Konfiguration für Tailwind v3
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ['ajv'],
  swcMinify: true,
  poweredByHeader: false,
  
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

export default nextConfig; 