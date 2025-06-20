'use client';
import { SendHorizonal } from 'lucide-react';
import { useReviewContext } from '@/app/hooks/useReviewContext/useReviewContext';

type RepoInputFormProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  repoUrl: string;
  setRepoUrl: (url: string) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error: string | null;
  filesList: string[];
};

export default function RepoInputForm({
  handleSubmit,
  repoUrl,
  setRepoUrl,
  handleBlur,
  error,
  filesList,
}: RepoInputFormProps) {
  const { isStreaming } = useReviewContext();
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor='url' className='sr-only'>
          GitHub repository URL
        </label>
        <div className='flex justify-center items-center p-3'>
          <input
            type='text'
            placeholder='Enter GitHub repo link...'
            id='url'
            className={`w-2xl px-8 py-2 bg-transparent text-sm outline-none transition-all 
              ${filesList.length > 0 || isStreaming ? 'cursor-not-allowed' : 'cursor-auto'}`}
            name='url'
            disabled={filesList.length > 0 ? true : false || isStreaming}
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            onBlur={handleBlur}
          />
          <div className='px-2'>
            <button
              type='submit'
              aria-label='Submit GitHub repository URL'
              className={`h-12 w-12 flex items-center justify-center rounded-full 
  ${
    repoUrl && !error
      ? 'bg-white hover:opacity-60 cursor-pointer'
      : 'bg-[rgba(255,255,255,0.1)] cursor-not-allowed'
  } transition`}
              disabled={!!error || !repoUrl.trim()}
            >
              <SendHorizonal
                className={`w-5 h-5 text-black transition-transform duration-300 ease-in-out
      ${repoUrl && !error ? 'rotate-0' : 'rotate-270'}`}
              />
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
