'use client';

import { FormEvent, useState } from 'react';
import { Badge } from './ui/badge';
import FileChipList from './FileChipList';
import RepoInputForm from './RepoInputForm';

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
  const [filesList, setFilesList] = useState<string[]>([]);

  const handleBlur = () => {
    if (!repoUrl.trim()) return;

    if (!isValidGitHubUrl(repoUrl)) {
      setError('Please enter a valid GitHub repository URL (e.g., https://github.com/user/repo).');
    } else {
      setError('');
    }
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setRepoUrl('');

    if (!isValidGitHubUrl(repoUrl)) {
      setError('Please enter a valid GitHub repository URL (e.g., https://github.com/user/repo).');
      return;
    }

    try {
      const response = await fetch('/api/extract-files', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: repoUrl,
          techstack: framework,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setFilesList([]);
        throw new Error(data.error);
      }

      setFilesList(data);
    } catch (err) {
      setError(String(err));
    }
  }

  const handleRemove = (fileToRemove: string) => {
    setFilesList((prev) => prev.filter((file) => file !== fileToRemove));
  };

  return (
    <div className='w-full max-w-3xl mx-auto bg-[rgba(61,61,61,0.2)] rounded-2xl'>
      <div className='max-h-64 overflow-y-auto pr-2'>
        {filesList.length > 0 && <FileChipList result={filesList} onRemoveFiles={handleRemove} />}
      </div>
      <RepoInputForm {... {handleSubmit, repoUrl, setRepoUrl, handleBlur, error} } />
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
