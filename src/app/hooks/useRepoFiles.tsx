import useSWR from 'swr';

const fetchFiles = async (url: string, techstack: string) => {
  const res = await fetch('/api/extract-files', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, techstack }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch files');
  return data;
};

export function useRepoFiles(repoUrl: string, techstack: string) {
  const isValid = repoUrl && techstack;
  const { data, error, isLoading } = useSWR(
    isValid ? [repoUrl, techstack] : null,
    ([url, stack]) => fetchFiles(url, stack)
  );

  return {
    files: data || [],
    error,
    isLoading,
  };
}
