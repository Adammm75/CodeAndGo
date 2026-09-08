import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import type { ReactNode } from 'react';

import { AnalyticsBridge } from '@/components/AnalyticsBridge';
import { BrandIntro } from '@/components/BrandIntro';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { JsonLd } from '@/components/JsonLd';
import { MotionDirector } from '@/components/MotionDirector';
import { site, siteUrl } from '@/data/site';
import { organizationJsonLd } from '@/lib/seo';

import './globals.css';

/* Polices auto-hébergées à la construction : aucune requête vers un tiers à
   l'exécution, et une police système de repli déclarée dans globals.css. */
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  weight: ['500', '600'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — ${site.promise}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.founder.name }],
  creator: site.founder.name,
  publisher: site.name,
  keywords: [
    'agence web',
    'création site internet',
    'développeur web freelance',
    'refonte de site',
    'référencement SEO',
    'e-commerce',
    'solutions IA',
    'France',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: siteUrl,
    siteName: site.name,
    title: `${site.name} — ${site.promise}`,
    description: site.description,
    images: [
      {
        url: site.brand.ogImage,
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.tagline}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.promise}`,
    description: site.description,
    images: [site.brand.ogImage],
  },
  /* Le favicon etait le logo d'origine : 1,3 Mo telecharges par chaque
     navigateur a la premiere visite, pour une icone de 16 px. */
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48' },
      { url: '/brand/icon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/brand/icon-192.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: [{ url: '/brand/apple-touch-icon.png', sizes: '180x180' }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  formatDetection: { telephone: true, email: true },
};

export const viewport: Viewport = {
  themeColor: '#050810',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Sans JavaScript, les blocs à révéler doivent rester visibles. */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <JsonLd data={organizationJsonLd()} />
        <BrandIntro />
        <MotionDirector />

        <a href="#contenu" className="skip-link">
          Aller au contenu principal
        </a>

        <Header />

        <main id="contenu" className="page-main">
          {children}
        </main>

        <Footer />
        <AnalyticsBridge />
      </body>
    </html>
  );
}
