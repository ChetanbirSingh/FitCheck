import { X, File } from 'lucide-react';
import { Badge } from './ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

export default function FileChipList({
  result,
  onRemoveFiles,
}: {
  result: string[];
  onRemoveFiles: (file: string) => void;
}) {
  return (
    <div className='flex flex-wrap gap-1'>
      {result.map((item, idx) => (
        <TooltipProvider key={idx}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge className='rounded-full bg-gray-100 border border-gray-300 shadow-sm'>
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
            </TooltipTrigger>
            <TooltipContent className='z-[999] bg-white text-black shadow-md '>
              <p>{item}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
}
