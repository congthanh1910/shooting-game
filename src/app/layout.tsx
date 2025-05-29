import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

const font = Inter({ variable: '--font-inter', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Shooting game',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${font.variable} font-sans antialiased`}>
        <NuqsAdapter>{children}</NuqsAdapter>
      </body>
    </html>
  );
}
