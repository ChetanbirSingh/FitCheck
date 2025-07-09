'use client';
import { motion } from 'framer-motion';

const text = 'BUILT FOR DEVS. NO FORMS. JUST RESULTS.';

export default function TaglineSection() {
  return (
    <section className='md:py-25 py-10'>
      <div className='bg-accent-lime h-46 overflow-hidden relative'>
        <motion.div
          className='absolute top-1/2 -translate-y-1/2 text-[128px] font-extrabold whitespace-nowrap'
          animate={{ x: ['60%', '-100%'] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
            duration: 10,
          }}
        >
          <h2 className='sr-only'>{text}</h2>
          <span aria-hidden='true'>{text}</span>
        </motion.div>
      </div>
    </section>
  );
}
