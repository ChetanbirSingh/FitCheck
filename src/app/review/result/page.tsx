import ReviewOutput from '@/components/review/result/ResultSection';
import { Suspense } from 'react';

export default function ReviewPage() {
  return (
    <Suspense fallback={<div className='min-h-screen'></div>}>
      <ReviewOutput />
    </Suspense>
  );
}
