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
  metadataBase: new URL('https://fitcheck-pi.vercel.app'),
  title: 'FitCheck | AI Code Reviewer for Developers',
  description:
    'FitCheck is an AI-powered code review tool for developers. Paste your GitHub repo, choose a reviewer persona like Mentor or Recruiter, and get tailored feedback to elevate your project or portfolio to industry standards.',
  keywords: [
    'FitCheck',
    'AI code review',
    'developer portfolio feedback',
    'GitHub project review',
    'Next.js',
    'TypeScript',
    'OpenAI',
    'frontend review',
    'persona-based feedback',
    'developer tools',
  ],
  openGraph: {
    title: 'FitCheck | AI Code Reviewer for Developers',
    description:
      'AI-powered GitHub repo reviewer that simulates feedback from roles like Mentor, Recruiter, and Senior Developer. Level up your code and portfolio with real-world expectations.',
    url: 'https://fitcheck-pi.vercel.app',
    siteName: 'FitCheck',
    images: [
      {
        url: '/banner.webp',
        width: 1200,
        height: 630,
        alt: 'FitCheck Homepage',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FitCheck | AI Code Reviewer for Developers',
    description:
      'Drop your GitHub repo, pick a reviewer persona, and get instant, personalized feedback. Perfect for devs polishing their portfolio or prepping for interviews.',
    images: ['/banner.webp'],
  },
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
