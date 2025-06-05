'use client';
import { motion } from 'framer-motion';

export default function PageHeader({ title }: { title: string }) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {title}
    </motion.h1>
  );
}
