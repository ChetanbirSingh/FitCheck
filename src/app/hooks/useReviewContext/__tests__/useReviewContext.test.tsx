import { renderHook, act } from '@testing-library/react';
import { ReviewProvider, useReviewContext } from '../useReviewContext';
import { TextDecoder, TextEncoder } from 'util';

// TextEncoder is used in this test (for mockStreamChunk)
// TextDecoder is used in the hook (streamSummary)
// Both are built-in in browsers but missing in Jest's Node environment, so we assign them from 'util'
Object.assign(global, { TextDecoder, TextEncoder });

const mockFetch = jest.fn();
global.fetch = mockFetch;

// Create a fake stream reader that returns chunks of encoded text
function fakeReader(text: string) {
  const words = text.split(' ');

  // Encode each word and add a space after it (except for the last one)
  const chunks = words.map((word, i) =>
    new TextEncoder().encode(i < words.length - 1 ? word + ' ' : word),
  );

  let index = 0;

  return {
    // This mock simulates reader.read() being called repeatedly by the hook (in a loop)
    // Each call returns one chunk from the chunks array until it's done
    read: () => {
      return new Promise((resolve) => {
        if (index < chunks.length) {
          resolve({ value: chunks[index++], done: false });
        } else {
          resolve({ value: undefined, done: true });
        }
      });
    },
  };
}

describe('useReviewContext (simple test)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('updates output with streamed chunks', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      body: {
        getReader: () => fakeReader('Hello, this is a test.'),
      },
    });

    // Wrap the hook in the ReviewProvider context
    const wrapper = ({ children }: any) => <ReviewProvider>{children}</ReviewProvider>;

    const { result } = renderHook(() => useReviewContext(), { wrapper });

    // Tell React we're about to update state — wait for all updates to finish before assertions
    await act(() => result.current.streamSummary('some code', 'MENTOR'));

    expect(result.current.output).toBe('Hello, this is a test.');
    expect(result.current.isStreaming).toBe(false);
    expect(result.current.error).toBe('');
  });

  test('sets error when fetch fails', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'mocked error' }),
    });

    const wrapper = ({ children }: any) => <ReviewProvider>{children}</ReviewProvider>;
    const { result } = renderHook(() => useReviewContext(), { wrapper });

    await act(() => result.current.streamSummary('some code', 'MENTOR'));

    expect(result.current.output).toBe('');
    expect(result.current.isStreaming).toBe(false);
    expect(result.current.error).toBe('mocked error');
  });

  test('sets fallback error when res.json() is not available', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: () => {
        throw new Error('res.json is not a function');
      },
    });

    const wrapper = ({ children }: any) => <ReviewProvider>{children}</ReviewProvider>;
    const { result } = renderHook(() => useReviewContext(), { wrapper });

    await act(() => result.current.streamSummary('some code', 'MENTOR'));

    expect(result.current.output).toBe('');
    expect(result.current.isStreaming).toBe(false);
    expect(result.current.error).toBe('Something went wrong');
  });
});
