import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReviewProvider } from './hooks/useReviewContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
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
      <body className={`${inter.className}`}>
        <Navbar />
        <ReviewProvider>
          <div className='bg-black'>
            <main className='bg-background rounded-b-[50px]'>{children}</main>
          </div>
        </ReviewProvider>
        <Footer />
      </body>
    </html>
  );
}
