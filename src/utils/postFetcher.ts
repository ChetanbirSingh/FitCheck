
export const postFetcher = async <T>(
  endpoint: string,
  body: Record<string, any>,
  fallbackMsg = 'Request failed'
): Promise<T> => {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      let message = fallbackMsg;
      try {
        const data = await res.json();
        message = data?.error || message;
      } catch {
        // Ignore JSON parse errors
      }
      throw new Error(message);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    const fallback = err instanceof Error ? err.message : fallbackMsg;
    throw new Error(fallback);
  }
};
