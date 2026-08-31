import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { LanguageProvider } from '@/components/LanguageProvider';
import { profile } from '@/content.config';

export const metadata: Metadata = {
  title: `${profile.name} — Software Developer & GIS Programmer`,
  description:
    'CS graduate from Middle East College (Coventry University). Full-stack developer and GIS programmer based in Muscat, Oman. NBO Hackathon 3rd place.',
  keywords: ['Rawan Al Siyabi', 'Software Developer', 'GIS Programmer', 'ArcGIS', 'Swift', 'JavaScript', 'Oman', 'Muscat'],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — Software Developer & GIS Programmer`,
    description: 'Full-stack developer and GIS programmer based in Muscat, Oman.',
    url: 'https://rawanalsiyabi.dev',
    siteName: profile.name,
    locale: 'en_US',
    type: 'profile',
  },
  twitter: {
    card: 'summary',
    title: `${profile.name} — Software Developer`,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="amber" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Cairo supports both Arabic and Latin — perfect for bilingual */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfilePage',
              mainEntity: {
                '@type': 'Person',
                name: profile.name,
                jobTitle: profile.role,
                email: profile.email,
                telephone: profile.phone,
                url: 'https://rawanalsiyabi.dev',
                address: { '@type': 'PostalAddress', addressLocality: 'Muscat', addressCountry: 'OM' },
              },
            }),
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
