import type { Metadata, Viewport } from 'next';
import './globals.css';
import './learning.css';
import './tutorial.css';

export const metadata: Metadata = {
  title: 'Kompô — Compostagem em casa',
  description: 'Aprenda sobre Bokashi, consulte resíduos e acompanhe sua jornada de compostagem.',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icons/icon-192.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: { url: '/icons/apple-touch-icon.png', sizes: '180x180' },
  },
  appleWebApp: { capable: true, title: 'Kompô', statusBarStyle: 'default' },
};

export const viewport: Viewport = { themeColor: '#2e4631' };

export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body>{children}</body></html>;}
