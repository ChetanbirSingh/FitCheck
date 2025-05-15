'use client';

import { FormEvent, useState } from 'react';
import { Badge } from './ui/badge';
import { SendHorizonal } from 'lucide-react';

const isValidGitHubUrl = (url: string): boolean => {
  const pattern = /^https:\/\/github\.com\/[^\/\s]+\/[^\/\s]+$/;
  return pattern.test(url.trim());
};

export default function RepoInputBar({
  persona,
  framework,
}: {
  persona: string;
  framework: string;
}) {
  const [repoUrl, setRepoUrl] = useState('');
  const [error, setError] = useState('');

  const handleBlur = () => {
    if (!repoUrl.trim()) return;

    if (!isValidGitHubUrl(repoUrl)) {
      setError('Please enter a valid GitHub repository URL (e.g., https://github.com/user/repo).');
    } else {
      setError('');
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!isValidGitHubUrl(repoUrl)) {
      setError('Please enter a valid GitHub repository URL (e.g., https://github.com/user/repo)');
      return;
    }
    setError('');
    setRepoUrl('');
  };

  return (
    <div className='w-full max-w-3xl mx-auto bg-[rgba(61,61,61,0.2)] rounded-2xl'>
      <form action='/api/github' method='POST' onSubmit={(e) => handleSubmit(e)}>
        <div className='flex justify-center items-center p-3'>
          <input
            type='text'
            placeholder='Enter GitHub repo link...'
            id='url'
            className={'w-2xl px-8 py-2 bg-transparent text-sm outline-none transition-all'}
            name='url'
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            onBlur={handleBlur}
          />
          <div className='px-2'>
            <button
              type='submit'
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
      <div className='ml-10 flex gap-2 p-2'>
        <Badge className='border-[#8a8a8a] text-[#8a8a8a] rounded-full' variant='outline'>
          {framework}
        </Badge>
        <Badge className='border-[#8a8a8a] text-[#8a8a8a] rounded-full' variant='outline'>
          {persona}
        </Badge>
      </div>
      {error && <p className='text-sm text-red-500 text-center pb-2'>{error}</p>}
    </div>
  );
}
