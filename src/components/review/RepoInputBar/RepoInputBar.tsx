'use client';

import { FormEvent, useEffect, useState } from 'react';
import FileChipList from './FileChipList';
import RepoInputForm from './RepoInputForm';
import { useRepoFiles } from '@/app/hooks/useRepoFiles';
import { useRepoFileCode } from '@/app/hooks/useRepoFileCode';
import { useReviewContext } from '@/app/hooks/useReviewContext';
import { AlertCircle, Info } from 'lucide-react';
import SelectionPills from './SelectionPills';
import { ModesType } from '@/lib/constants';
import { TechstackTypes } from '@/lib/constants';
import { usePathname, useRouter } from 'next/navigation';
import { Badge } from '../../ui/badge';

const isValidGitHubUrl = (url: string): boolean => {
  const pattern = /^https:\/\/github\.com\/[^\/\s]+\/[^\/\s]+$/;
  return pattern.test(url.trim());
};

export default function RepoInputBar({
  persona,
  techstack,
}: {
  persona: ModesType;
  techstack: TechstackTypes;
}) {
  const [repoUrl, setRepoUrl] = useState('');
  const [error, setError] = useState('');
  const [filesList, setFilesList] = useState<string[]>([]);
  const [submittedUrl, setSubmittedUrl] = useState('');
  const {
    files,
    error: repoFetchError,
    isLoading: isFetchingRepoFiles,
    mutate: reFetchFiles,
  } = useRepoFiles(submittedUrl, techstack);
  const {
    code,
    error: codeFetchError,
    isLoading: isFetchingRepoCode,
  } = useRepoFileCode(submittedUrl, filesList);
  const { isStreaming, error: reviewError, streamSummary } = useReviewContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (files.length > 0) {
      setFilesList(files);
    }
  }, [files]);

  const handleBlur = () => {
    if (!repoUrl.trim()) return;
    if (!isValidGitHubUrl(repoUrl)) {
      setError('Please enter a valid GitHub repository URL (e.g., https://github.com/user/repo).');
      setRepoUrl('');
    } else {
      setError('');
    }
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isValidGitHubUrl(repoUrl)) {
      setError('Please enter a valid GitHub repository URL (e.g., https://github.com/user/repo).');
      return;
    }
    setSubmittedUrl(repoUrl);
    let freshFiles = filesList;
    if (filesList.length === 0) {
      freshFiles = await reFetchFiles();
      setFilesList(freshFiles);
    }
    try {
      await reFetchFiles();
      if (filesList.length > 0) {
        setRepoUrl('');
        if (!pathname.startsWith('/review/result')) {
          router.push(`/review/result/?persona=${persona}&techstack=${techstack}`);
        }
        streamSummary(code, persona);
        setFilesList([]);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
    setSubmittedUrl(repoUrl);
  }

  const handleRemove = (fileToRemove: string) => {
    setFilesList((prev) => prev.filter((file) => file !== fileToRemove));
  };

  return (
    <>
      <div className='w-full max-w-3xl mx-auto max-h-64 overflow-y-auto'>
        {filesList.length > 0 && <FileChipList result={filesList} onRemoveFiles={handleRemove} />}
      </div>
      <div className='w-full max-w-3xl mx-auto bg-[rgba(61,61,61,0.2)] rounded-2xl pb-2'>
        <RepoInputForm {...{ handleSubmit, repoUrl, setRepoUrl, handleBlur, error, filesList }} />
        <div className='ml-10 flex gap-2 p-2'>
          <Badge className='border-[#8a8a8a] text-[#8a8a8a] rounded-full' variant='outline'>
            {techstack.charAt(0).toUpperCase() + techstack.slice(1).replace('_', ' ')}
          </Badge>
          <Badge className='border-[#8a8a8a] text-[#8a8a8a] rounded-full' variant='outline'>
            {persona.charAt(0).toUpperCase() + persona.slice(1)}
          </Badge>
        </div>
        {isFetchingRepoFiles && (
          <p className='text-sm text-gray-500 text-center pb-2'>Fetching file List...</p>
        )}
        {isFetchingRepoCode && (
          <p className='text-sm text-gray-500 text-center pb-2'>Fetching Code</p>
        )}
        {isStreaming && (
          <p className='text-sm text-gray-500 text-center pb-2'>Reviewing in progress</p>
        )}

        <div className='pb-2 px-2 space-y-2'>
          {filesList.length > 0 && (
            <div className='flex gap-3 text-sm text-blue-400 items-center md:justify-center'>
              <Info className='w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0' />
              <p className='leading-relaxed'>
                Pick new files and hit submit again to get an updated review.
              </p>
            </div>
          )}

          {(error || codeFetchError || repoFetchError || reviewError) && (
            <div className='flex gap-3 text-sm text-red-500 font-medium md:justify-center'>
              <AlertCircle className='w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0' />
              <p className='leading-relaxed'>
                {error || codeFetchError?.message || repoFetchError?.message || reviewError}
              </p>
            </div>
          )}
        </div>
      </div>
      <SelectionPills techstack={techstack} persona={persona} />
    </>
  );
}
