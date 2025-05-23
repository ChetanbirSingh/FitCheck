'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface ReviewType {
  output: string;
  isStreaming: boolean;
  error: string;
  streamSummary: (code: any, persona: string) => {};
  reset: () => void;
}

const ReviewContext = createContext<ReviewType | null>(null);

export const ReviewProvider = ({ children }: { children: ReactNode }) => {
  const [output, setOutput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState('');

  const reset = () => {
    setOutput('');
    setError('');
    setIsStreaming(false);
  };

  const streamSummary = async (code: any, persona: string) => {
    reset();
    setIsStreaming(true);

    try {
      const res = await fetch('/api/gpt-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, persona }),
      });
      // Get the reader from the streamed response body
      const reader = res.body?.getReader();
      // Set up a decoder to turn binary to readable text
      const decoder = new TextDecoder();

      if (!reader) throw new Error('Unable to read AI response. Please try again later.');
      // read stream chunk by chunk
      while (true) {
        // read the next chunk
        const { done, value } = await reader.read();
        if (done) break;
        // convert bytes to string
        const chunk = decoder.decode(value);
        setOutput((prev) => prev + chunk);
      }

      setIsStreaming(false);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      setIsStreaming(false);
    }
  };

  return (
    <ReviewContext.Provider value={{ output, isStreaming, error, streamSummary, reset }}>
      {children}
    </ReviewContext.Provider>
  );
};

export function useReviewContext() {
  const context = useContext(ReviewContext);
  if (!context) throw new Error('useReviewContext must be used within a ReviewContext');
  return context;
}
