'use client';
import { useReviewContext } from '@/app/hooks/useReviewContext/useReviewContext';
import { motion } from 'framer-motion';

interface PillInterface {
  value: string;
  updateQuery: (queryKey: string, value: string) => void;
  idx: number;
  queryKey: 'techstack' | 'persona';
  label: string;
  selectedValue: string;
}

export default function Pill({
  value,
  updateQuery,
  idx,
  queryKey,
  label,
  selectedValue,
}: PillInterface) {
  const { isStreaming } = useReviewContext();
  return (
    <motion.button
      onClick={() => !isStreaming && updateQuery(queryKey, value)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3, delay: idx * 0.05 }}
      className={`px-4 py-1.5 text-sm rounded-full transition-all border
              ${
                selectedValue === value
                  ? 'bg-[rgba(163,230,53,0.47)] text-white border-lime-400'
                  : 'bg-transparent text-zinc-400 border-zinc-600 hover:border-lime-400 hover:text-white'
              }
              ${isStreaming ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      disabled={isStreaming}
    >
      {label}
    </motion.button>
  );
}
