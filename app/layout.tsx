import './globals.css';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import type { Metadata } from 'next';
import { Montserrat, Work_Sans } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-montserrat',
});

const worksans = Work_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-worksans',
});

export const metadata: Metadata = {
  title: 'NeoVifta - Soutien pour l\'éco-anxiété',
  description: 'NeoVifta aide les jeunes à surmonter l\'éco-anxiété à travers le soutien, l\'action et la communauté.',
  icons: {
    icon: [{ url: '/favicon.ico' }],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌿</text></svg>"
        />
      </head>
      <body className={`${montserrat.variable} ${worksans.variable} font-sans bg-background`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow pt-16">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
