import { renderHook, waitFor } from '@testing-library/react';
import { useRepoFiles } from '@/app/hooks/useRepoFiles/useRepoFiles';

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('useRepoFiles', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockUrl = 'https://github.com/test/test';
  const mockTechstack = 'nextjs';
  const mockedFiles = ['/src/app/page.tsx', '/sec/app/about/page.tsx'];

  test('returns files when fetch is successful', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockedFiles,
    });

    const { result } = renderHook(() => useRepoFiles(mockUrl, mockTechstack));
    await waitFor(() => {
      expect(result.current.files).toEqual(mockedFiles);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeUndefined();
    });
  });

  test('returns error when fetch fails', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'mocked error' }),
    });

    const { result } = renderHook(() => useRepoFiles('https://github.com/test/test', 'java'));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe('mocked error');
    });
  });

  test('returns fallback error message when fetch fails without error message', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => {
        throw new Error('Invalid JSON');
      },
    });

    const { result } = renderHook(() => useRepoFiles('https://github.com/test/test', 'java'));

    await waitFor(() => {
      const err = result.current.error;
      expect(result.current.isLoading).toBe(false);
      expect(err).toBe('Failed to fetch files');
    });
  });
});
