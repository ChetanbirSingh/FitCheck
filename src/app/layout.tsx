import type { Metadata } from 'next';
import { Inter, Geist } from 'next/font/google';

import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  fallback: ['Arial', 'sans-serif'],
});

export const metadata: Metadata = {
  title: 'FitCheck',
  description: 'Built for devs. Paste your portfolio, pick a reviewer, get instant feedback.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className}`}>{children}</body>
    </html>
  );
}
