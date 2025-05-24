'use client';

import { motion } from 'framer-motion';
import { Techstack } from '@/app/api/extract-files/route';
import { useState } from 'react';

const techStackInfo: Record<Techstack, { caption: string; icon: string }> = {
  html_css: { caption: 'Static Sites', icon: '🌐' },
  react: { caption: 'Component-based UI', icon: '⚛️' },
  next: { caption: 'Fullstack React', icon: '🚀' },
  vue: { caption: 'Progressive UI', icon: '🖖' },
  svelte: { caption: 'Compiler Magic', icon: '🔥' },
  solid: { caption: 'Fine-grained Reactivity', icon: '🧪' },
  angular: { caption: 'Opinionated Framework', icon: '🛡️' },
};

export default function TechstackSelection({
  handleClick,
}: {
  handleClick: (tech: Techstack) => void;
}) {
  const [selected, setSelected] = useState<Techstack | null>(null);

  return (
    <section className='px-4 py-10 space-y-10 flex justify-center items-center flex-col'>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className='text-center text-2xl font-bold'
      >
        What is your techstack
      </motion.h2>

      <div>
        <h3 className='text-lg font-semibold text-zinc-100 mb-2 px-2'>
          💻 We'll analyze files from:
        </h3>

        <div className='overflow-x-auto scrollbar-hide max-w-5xl'>
          <div
            className='flex gap-4 whitespace-nowrap max-h-100 overflow-y-auto
            [&::-webkit-scrollbar]:h-2
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-zinc-500/20
            [&::-webkit-scrollbar-thumb]:rounded-full
            hover:[&::-webkit-scrollbar-thumb]:bg-zinc-500/30
            dark:[&::-webkit-scrollbar-thumb]:bg-zinc-400/20
            dark:hover:[&::-webkit-scrollbar-thumb]:bg-zinc-400/30
            px-2 py-4'
          >
            {Object.entries(techStackInfo).map(([tech, { caption, icon }], idx) => {
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
                  className={`w-[180px] sm:w-[220px] flex-shrink-0 p-6 rounded-2xl cursor-pointer border bg-zinc-900 border-zinc-700 transition-colors duration-300 ${
                    isSelected ? 'bg-accent-lime' : 'bg-transparent'
                  }`}
                  onClick={() => {
                    setSelected(tech as Techstack);
                    handleClick(tech as Techstack);
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
      </div>
    </section>
  );
}
