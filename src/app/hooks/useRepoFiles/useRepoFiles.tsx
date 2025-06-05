import useSWR from 'swr';
import { postFetcher } from '@/utils/postFetcher';

export function useRepoFiles(repoUrl: string, techstack: string) {
  const isValid = repoUrl && techstack;

  const { data, error, isLoading, mutate } = useSWR(
    isValid ? [repoUrl, techstack] : null,
    ([url, stack]) =>
      postFetcher<string[]>('/api/extract-files', { url, techstack: stack }, 'Failed to fetch files'),
  );

  return {
    files: data || [],
    error: error instanceof Error ? error.message : undefined,
    isLoading,
    mutate,
  };
}
