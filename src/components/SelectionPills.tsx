'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { ModesType } from '@/lib/constants';
import { TechstackTypes } from '@/lib/constants';

const personas = [
  { value: 'mentor', label: '🧠 Mentor' },
  { value: 'recruiter', label: '📋 Recruiter' },
  { value: 'senior', label: '🧑‍💼 Senior' },
  { value: 'uiux', label: '🎨 UI/UX' },
  { value: 'peer', label: '🤝 Peer' },
];

const frameworks = [
  { value: 'react', label: 'React' },
  { value: 'angular', label: 'Angular' },
  { value: 'next', label: 'Next.js' },
  { value: 'vue', label: 'Vue' },
  { value: 'html_css', label: 'HTML/CSS' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'solid' },
];

export default function SelectionPills({
  framework,
  persona,
}: {
  framework: TechstackTypes;
  persona: ModesType;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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
        {frameworks.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => updateQuery('techstack', value)}
            className={`px-4 py-1.5 text-sm rounded-full transition-all border cursor-pointer
              ${
                framework === value
                  ? 'bg-[rgba(163,230,53,0.47)] text-white border-lime-400'
                  : 'bg-transparent text-zinc-400 border-zinc-600 hover:border-lime-400 hover:text-white'
              }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className='flex flex-wrap gap-3 items-center justify-center mt-4 px-4'>
        {personas.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => updateQuery('persona', value)}
            className={`px-4 py-1.5 text-sm rounded-full transition-all border cursor-pointer
              ${
                persona === value
                  ? 'bg-[rgba(163,230,53,0.47)] text-white border-lime-400'
                  : 'bg-transparent text-zinc-400 border-zinc-600 hover:border-lime-400 hover:text-white'
              }`}
          >
            {label}
          </button>
        ))}
      </div>
    </>
  );
}
