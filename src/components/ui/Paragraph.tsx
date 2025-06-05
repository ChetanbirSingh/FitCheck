import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export default function Paragraph({ children }: { children: ReactNode }) {
  return (
    <motion.p
      className='text-lg text-zinc-300 leading-relaxed'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.6 }}
    >
      {children}
    </motion.p>
  );
}
