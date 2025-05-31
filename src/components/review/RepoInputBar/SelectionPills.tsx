'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { ModesType } from '@/lib/constants';
import { TechstackTypes } from '@/lib/constants';
import { motion } from 'framer-motion';
import { useReviewContext } from '@/app/hooks/useReviewContext';

const personas = [
  { value: 'mentor', label: '🧠 Mentor' },
  { value: 'recruiter', label: '📋 Recruiter' },
  { value: 'senior', label: '🧑‍💼 Senior' },
  { value: 'uiux', label: '🎨 UI/UX' },
  { value: 'peer', label: '🤝 Peer' },
];

const techstacks = [
  { value: 'react', label: 'React' },
  { value: 'angular', label: 'Angular' },
  { value: 'next', label: 'Next.js' },
  { value: 'vue', label: 'Vue' },
  { value: 'html_css', label: 'HTML/CSS' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'Solid' },
];

export default function SelectionPills({
  techstack,
  persona,
}: {
  techstack: TechstackTypes;
  persona: ModesType;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isStreaming } = useReviewContext();

  const updateQuery = useCallback(
    (key: string, value: string) => {
      const url = new URLSearchParams(searchParams.toString());
      url.set(key, value);
      router.push(`${pathname}?${url.toString()}`);
    },
    [searchParams],
  );

  return (
    <>
      <div className='flex flex-wrap gap-3 items-center justify-center mt-6 px-4'>
        {techstacks.map(({ value, label }, idx) => (
          <motion.button
            key={value}
            onClick={() => !isStreaming && updateQuery('techstack', value)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className={`px-4 py-1.5 text-sm rounded-full transition-all border
              ${
                techstack === value
                  ? 'bg-[rgba(163,230,53,0.47)] text-white border-lime-400'
                  : 'bg-transparent text-zinc-400 border-zinc-600 hover:border-lime-400 hover:text-white'
              }
              ${isStreaming ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            disabled={isStreaming}
          >
            {label}
          </motion.button>
        ))}
      </div>

      <div className='flex flex-wrap gap-3 items-center justify-center mt-4 px-4'>
        {personas.map(({ value, label }, idx) => (
          <motion.button
            key={value}
            onClick={() => !isStreaming && updateQuery('persona', value)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className={`px-4 py-1.5 text-sm rounded-full transition-all border
              ${
                persona === value
                  ? 'bg-[rgba(163,230,53,0.47)] text-white border-lime-400'
                  : 'bg-transparent text-zinc-400 border-zinc-600 hover:border-lime-400 hover:text-white'
              } 
                  ${isStreaming ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            disabled={isStreaming}
          >
            {label}
          </motion.button>
        ))}
      </div>
    </>
  );
}
