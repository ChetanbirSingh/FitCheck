import useSWR from 'swr';
import { postFetcher } from '@/utils/postFetcher';

export function useRepoFileCode(url: string, files: string[]) {
  const shouldFetch = url && files.length > 0;

  const { data, error, isLoading } = useSWR(
    shouldFetch ? [url, ...files] : null,
    () =>
      postFetcher<Record<string, string>>(
        '/api/fetch-code',
        { url, files },
        'Failed to fetch code'
      ),
  );

  return {
    code: data || {},
    error: error instanceof Error ? error.message : undefined,
    isLoading,
  };
}
