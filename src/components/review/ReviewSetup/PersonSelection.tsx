'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ModesType } from '@/lib/constants';

type ModesStructure = {
  mode: ModesType;
  icon: string;
  caption: string;
};

const modes: ModesStructure[] = [
  {
    mode: 'mentor',
    icon: '🧠',
    caption: 'Growth-focused, honest feedback',
  },
  {
    mode: 'recruiter',
    icon: '📋',
    caption: 'Hireability & red flags check',
  },
  {
    mode: 'senior',
    icon: '🧑‍💼',
    caption: 'Engineering-level readiness review',
  },
  {
    mode: 'designer',
    icon: '🎨',
    caption: 'Visual design & UX critique only',
  },
  {
    mode: 'peer',
    icon: '🤝',
    caption: 'Friendly dev-to-dev review',
  },
];

export default function PersonSelection({
  handleClick,
  selected,
}: {
  handleClick: (mode: ModesType) => void;
  selected: ModesType | null;
}) {
  return (
    <div id='choose-persona-section'>
      <h2 id='choose-persona-heading'>Who do you want feedback from?</h2>

      <div className='flex justify-center items-center gap-4 flex-wrap p-7'>
        {modes.map(({ mode, icon, caption }, idx) => {
          const isSelected = selected === mode;
          return (
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1 * idx,
                duration: 0.6,
                ease: 'easeOut',
              }}
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.06 }}
              className={`w-full md:w-[300px] lg:w-[400px] h-auto flex flex-col justify-center items-center p-9 cursor-pointer rounded-l transition-colors duration-300 hover:bg-[rgba(163,230,53,0.47)] ${
                isSelected ? 'bg-accent-lime' : 'bg-transparent'
              }`}
              onClick={() => handleClick(mode)}
            >
              <span
                className='text-[64px] md:text-[80px] mb-4'
                role='img'
                aria-label={`${mode.charAt(0).toUpperCase() + mode.slice(1)} icon`}
              >
                {icon}
              </span>
              <span className='text-[12px] z-10 text-zinc-200'>{caption}</span>
              <h3 className='text-2xl font-bold z-10 text-white'>
                {mode.charAt(0).toUpperCase() + mode.slice(1)} Mode
              </h3>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
