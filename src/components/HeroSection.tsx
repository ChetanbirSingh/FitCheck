'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const icons = ['🧠', '📋', '🧑‍💼', '🎨', '🤝'];

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const router = useRouter();
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % icons.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section>
      <div className='flex flex-col items-center justify-center'>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='text-8xl text-center md:pt-25 pt-10'
        >
          {icons[index]}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='max-w-3xl pt-10'
        >
          Get Honest AI Feedback on Your Portfolio
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='max-w-3xl leading-relaxed'
        >
          Get personalized insights from an AI trained to think like recruiters, mentors, senior
          devs, and designers — so you can upgrade your portfolio with confidence and purpose.
        </motion.p>
        <div className='flex gap-4 pt-5'>
          <motion.button
            className='inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl cursor-pointer 
            bg-white text-black font-semibold text-base shadow-md hover:shadow-lg hover:bg-gray-300'
            type='button'
            initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
              delay: 0.2,
            }}
            onClick={() => router.push('/review')}
          >
            Review
          </motion.button>
          <motion.button
            className='inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl cursor-pointer 
            text-white font-semibold text-base  bg-accent-lime'
            type='button'
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('https://github.com/ChetanbirSingh/FitCheck')}
          >
            Github Repo
          </motion.button>
        </div>
      </div>
    </section>
  );
}
