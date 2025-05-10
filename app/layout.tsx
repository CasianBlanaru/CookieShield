import './globals.css';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: 'CookieShield - Advanced GDPR/DSGVO Cookie Consent Solution',
  description: 'CookieShield helps websites comply with GDPR/DSGVO regulations by providing an advanced and customizable cookie consent solution.',
  manifest: '/manifest.json',
  icons: [
    { rel: 'icon', url: '/favicon/favicon.ico' },
    { rel: 'apple-touch-icon', url: '/favicon/apple-touch-icon.png' },
  ],
};

export const viewport: Viewport = {
  themeColor: '#5364fc',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
