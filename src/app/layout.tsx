import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReviewProvider } from './hooks/useReviewContext/useReviewContext';
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
  description:
    'FitCheck is an AI-powered code review tool built for developers. Simply paste your GitHub repo, select a reviewer persona like Mentor or Recruiter, and receive instant, tailored feedback to improve your portfolio or project for real-world job expectations.',
  keywords: [
    'FitCheck',
    'AI code review',
    'developer tools',
    'Next.js',
    'TypeScript',
    'OpenAI',
    'portfolio feedback',
    'GitHub repo review',
    'frontend feedback',
    'persona review',
  ],
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
