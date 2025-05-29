'use client';

import { motion } from 'framer-motion';
import { TechstackTypes } from '@/lib/constants';
import { useState } from 'react';

type TechstackInfo = {
  tech: TechstackTypes;
  caption: string;
  icon: string;
};

const techStackInfo: TechstackInfo[] = [
  { tech: 'html_css', caption: 'Static Sites', icon: '🌐' },
  { tech: 'react', caption: 'Component-based UI', icon: '⚛️' },
  { tech: 'next', caption: 'Fullstack React', icon: '🚀' },
  { tech: 'vue', caption: 'Progressive UI', icon: '🖖' },
  { tech: 'svelte', caption: 'Compiler Magic', icon: '🔥' },
  { tech: 'solid', caption: 'Fine-grained Reactivity', icon: '🧪' },
  { tech: 'angular', caption: 'Opinionated Framework', icon: '🛡️' },
];

export default function TechstackSelection({
  handleClick,
}: {
  handleClick: (tech: TechstackTypes) => void;
}) {
  const [selected, setSelected] = useState<TechstackTypes | null>(null);

  return (
    <section className='px-4 py-10 space-y-10 flex justify-center items-center flex-col'>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        What is your techstack
      </motion.h2>

      <div className='w-full max-w-6xl'>
        <p className='mb-4 px-2'>💻 We'll analyze files from:</p>
        <div
          className='flex gap-4 whitespace-nowrap max-h-100 overflow-y-auto px-2 py-4
            [&::-webkit-scrollbar]:h-2
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-zinc-500/20
            [&::-webkit-scrollbar-thumb]:rounded-full
            hover:[&::-webkit-scrollbar-thumb]:bg-zinc-500/30
            dark:[&::-webkit-scrollbar-thumb]:bg-zinc-400/20
            dark:hover:[&::-webkit-scrollbar-thumb]:bg-zinc-400/30'
        >
          {techStackInfo.map(({ tech, caption, icon }, idx) => {
            const isSelected = selected === tech;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1 * idx,
                  duration: 0.6,
                  ease: 'easeOut',
                }}
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.06 }}
                className={`md:w-[250px] sm:w-[200px] p-6 sm:p-6 rounded-2xl cursor-pointer border transition-colors duration-300 flex-shrink-0 ${
                  isSelected
                    ? 'bg-accent-lime border-accent-lime/60'
                    : 'bg-zinc-900 border-zinc-700'
                }`}
                onClick={() => {
                  setSelected(tech as TechstackTypes);
                  handleClick(tech as TechstackTypes);
                }}
              >
                <span className='text-5xl mb-3'>{icon}</span>
                <span className='text-xs text-zinc-300'>{caption}</span>
                <h3 className='text-lg font-bold text-white mt-1'>
                  {tech.replace('_', ' ').toUpperCase()}
                </h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
