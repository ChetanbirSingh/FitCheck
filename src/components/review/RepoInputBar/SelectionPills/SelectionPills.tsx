'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { ModesType } from '@/lib/constants';
import { TechstackTypes } from '@/lib/constants';
import { motion } from 'framer-motion';
import { useReviewContext } from '@/app/hooks/useReviewContext';
import Pill from './Pill';

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
          <Pill key={value + idx}
            {...{ value, updateQuery, idx, queryKey: 'techstack', label, selectedValue: techstack }}
          />
        ))}
      </div>

      <div className='flex flex-wrap gap-3 items-center justify-center mt-4 px-4'>
        {personas.map(({ value, label }, idx) => (
          <Pill key={value + idx}
            {...{ value, updateQuery, idx, queryKey: 'persona', label, selectedValue: persona }}
          />
        ))}
      </div>
    </>
  );
}
