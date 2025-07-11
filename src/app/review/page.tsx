import ReviewSetup from '@/components/review/ReviewSetup/ReviewSetup';
import { Suspense } from 'react';

export default function ReviewPage() {
  return (
    <Suspense fallback={<div className='min-h-screen'></div>}>
      <ReviewSetup />
    </Suspense>
  );
}
