'use client';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // Enables GitHub Flavored Markdown (tables, strikethrough, task lists, autolinks, etc.)
import { useReviewContext } from '@/app/hooks/useReviewContext';
import RepoInputBar from '@/components/review/RepoInputBar/RepoInputBar';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { ModesType } from '@/lib/constants';
import { TechstackTypes } from '@/lib/constants';

export default function ReviewPage() {
  const { output } = useReviewContext();

  const searchParams = useSearchParams();
  const persona = searchParams.get('persona') as ModesType | null;
  const techstack = searchParams.get('techstack') as TechstackTypes | null;

  return (
    <main>
      <header>
        <h1 className='text-center'>Your Review</h1>
      </header>

      <section className='w-full max-w-4xl mx-auto space-y-8'>
        <ReactMarkdown
          children={output}
          remarkPlugins={[remarkGfm]}
          components={{
            h2: ({ children }) => <h2 className='text-lime-400 mt-6 mb-3'>{children}</h2>,
            h3: ({ children }) => <h3 className='text-zinc-100 mt-4 mb-2'>{children}</h3>,
            h4: ({ children }) => <h4 className='text-zinc-200 mt-3 mb-1'>{children}</h4>,
            h5: ({ children }) => <h5 className='text-zinc-200 mt-2 mb-1'>{children}</h5>,
            h6: ({ children }) => <h6 className='text-zinc-200 mt-1 mb-1'>{children}</h6>,
            p: ({ children }) => <p className='text-zinc-400 leading-relaxed mb-4'>{children}</p>,
            ul: ({ children }) => (
              <ul className='list-disc list-inside space-y-2 text-zinc-300 mb-4 bg-zinc-900 border border-zinc-800 rounded-xl p-4 shadow-sm'>
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className='list-decimal list-inside space-y-2 text-zinc-300 mb-4 bg-zinc-900 border border-zinc-800 rounded-xl p-4 shadow-sm'>
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className=' pl-2 list-none flex gap-2 leading-relaxed'>
                <Check className='mt-[2px] text-lime-300 shrink-0' />
                <span>{children}</span>
              </li>
            ),
            blockquote: ({ children }) => (
              <blockquote className='border-l-4 border-lime-500 pl-4 italic text-zinc-400 my-4'>
                {children}
              </blockquote>
            ),
            code: ({ children }) => (
              <code className='bg-zinc-800 text-lime-300 px-1 py-0.5 rounded font-mono'>
                {children}
              </code>
            ),
            pre: ({ children }) => (
              <pre className='bg-zinc-900 text-zinc-100 p-4 rounded-md overflow-x-auto mb-4'>
                {children}
              </pre>
            ),
            a: ({ href, children }) => (
              <Link
                href={href ?? '#'}
                target='_blank'
                rel='noopener noreferrer'
                className='text-lime-400 hover:underline'
              >
                {children}
              </Link>
            ),
          }}
        />
      </section>
      <div className='my-3'>
        {persona && techstack && <RepoInputBar persona={persona} techstack={techstack} />}
      </div>
    </main>
  );
}
