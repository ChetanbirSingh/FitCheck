'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface ModesStructure {
  [key: string]: {
    icon: string;
    caption: string;
  };
}

const modes: ModesStructure = {
  mentor: {
    icon: '🧠',
    caption: 'Growth-focused, honest feedback',
  },
  recruiter: {
    icon: '📋',
    caption: 'Hireability & red flags check',
  },
  senior: {
    icon: '🧑‍💼',
    caption: 'Engineering-level readiness review',
  },
  designer: {
    icon: '🎨',
    caption: 'Visual design & UX critique only',
  },
  peer: {
    icon: '🤝',
    caption: 'Friendly dev-to-dev review',
  },
};

export default function PersonSelection() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  return (
    <section id='choose-persona-section'>
      <motion.h2
        id='choose-persona-heading'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className='text-center mb-6 text-2xl font-semibold'
      >
        Choose Persona
      </motion.h2>

      <div className='flex justify-center items-center gap-4 flex-wrap'>
        {Object.entries(modes).map(([mode, { icon, caption }], idx) => {
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
              className={`flex flex-col justify-center items-center p-6 cursor-pointer rounded-3xl transition-colors duration-300 ${
                isSelected ? 'bg-[rgba(163,230,53,0.47)]' : 'bg-transparent'
              }`}
              onClick={() => {
                setSelected(mode);
                setTimeout(() => {
                  router.push(`?persona=${mode}`);
                }, 300);
              }}
            >
              <span
                className='text-6xl font-bold mb-2 z-10'
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
    </section>
  );
}
