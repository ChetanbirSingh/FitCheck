import useSWR from 'swr';

const fetchCode = async (url: string, files: string[]) => {
  try {
    const res = await fetch('/api/fetch-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, files }),
    });

    if (!res.ok) {
      let message = 'Failed to fetch code';
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

export function useRepoFileCode(url: string, files: string[]) {
  const shouldFetch = url && files.length > 0;

  const { data, error, isLoading } = useSWR(shouldFetch ? [url, ...files] : null, () =>
    fetchCode(url, files),
  );

  return {
    code: data || {},
    error: error instanceof Error ? error.message : undefined,
    isLoading,
  };
}
