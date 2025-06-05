import useSWR from 'swr';

const fetchFiles = async (url: string, techstack: string) => {
  try {
    const res = await fetch('/api/extract-files', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, techstack }),
    });

    if (!res.ok) {
      let message = 'Failed to fetch files';
      try {
        const data = await res.json();
        message = data?.error || message;
      } catch {
        // Ignore non-JSON error responses
      }
      throw new Error(message);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    const fallback = err instanceof Error ? err.message : 'Unexpected error occurred';
    throw new Error(fallback);
  }
};

export function useRepoFiles(repoUrl: string, techstack: string) {
  const isValid = repoUrl && techstack;
  const { data, error, isLoading, mutate } = useSWR(
    isValid ? [repoUrl, techstack] : null,
    ([url, stack]) => fetchFiles(url, stack),
  );

  return {
    files: data || [],
    error: error instanceof Error ? error.message : undefined,
    isLoading,
    mutate,
  };
}
