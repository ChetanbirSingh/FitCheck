import useSWR from 'swr';

const fetchCode = async (url: string, files: string[]) => {
  const res = await fetch('/api/fetch-code', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, files }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch code');
  return data;
};

export function useRepoFileCode(url: string, files: string[]) {
  const shouldFetch = url && files.length > 0;

  const { data, error, isLoading } = useSWR(
    shouldFetch ? [url, ...files] : null,
    () => fetchCode(url, files)
  );

  return {
    code: data || {},
    error,
    isLoading,
  };
}
