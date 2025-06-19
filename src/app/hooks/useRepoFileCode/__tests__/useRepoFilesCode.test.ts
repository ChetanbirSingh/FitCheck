import { renderHook, waitFor } from '@testing-library/react';
import { useRepoFileCode } from '@/app/hooks/useRepoFileCode/useRepoFileCode';

const mockFetch = jest.fn();

describe('useRepoFileCode', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockedFiles = ['/src/app/page.tsx', '/docs/README.md'];

  const mockedData = {
    '/src/app/page.tsx': { code: 'mocked body' },
    '/docs/README.md': { code: 'mocked body' },
  };

  test('returns code when fetch is successful', async () => {
    // Mock a successful fetch response that returns our fake code data
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockedData,
    });

    // Override the global fetch with our mock
    global.fetch = mockFetch;

    // Call the hook with a valid repo URL and file list
    const { result } = renderHook(() =>
      useRepoFileCode('https://github.com/test/test', mockedFiles),
    );

    // Wait for SWR to finish the fetch and update state
    await waitFor(() => {
      expect(result.current.code).toEqual(mockedData);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeUndefined();
    });
  });

  test('returns error when fetch fails', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'mocked error' }),
    });

    const { result } = renderHook(() =>
      useRepoFileCode('https://github.com/test/test', ['src/index.ts']),
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe('mocked error');
    });
  });

  test('returns fallback error message when fetch fails without error message', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => {
        throw new Error('Invalid Json');
      },
    });

    const { result } = renderHook(() =>
      useRepoFileCode('https://github.com/test/test', ['src/index.ts']),
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe('Failed to fetch code');
    });
  });
});
