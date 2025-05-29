'use client';
import { X, File } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { motion, AnimatePresence } from 'framer-motion'; // AnimatePresence makes exit animations easy

export default function FileChipList({
  result,
  onRemoveFiles,
}: {
  result: string[];
  onRemoveFiles: (file: string) => void;
}) {
  return (
    <div className='flex flex-wrap gap-1'>
      <AnimatePresence>
        {result.map((item, idx) => (
          <TooltipProvider key={item}>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{
                    x: [0, -10, 10, -10, 10, 0],
                    opacity: 0,
                    transition: { duration: 0.4, ease: 'easeInOut' },
                  }}
                >
                  <Badge className='rounded-full bg-gray-100 border border-gray-300 shadow-sm flex items-center gap-1 px-2'>
                    <File className='w-3 h-3 text-gray-500' />
                    <span className='truncate max-w-[80px] text-gray-700'>{item}</span>
                    <button
                      type='button'
                      onClick={() => onRemoveFiles(item)}
                      className='text-gray-400 hover:text-red-600 transition-colors cursor-pointer'
                    >
                      <X className='w-3 h-3' />
                    </button>
                  </Badge>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent className='z-[999] bg-white text-black shadow-md'>
                <p>{item}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </AnimatePresence>
    </div>
  );
}
