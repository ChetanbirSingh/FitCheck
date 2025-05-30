import ReviewSetup from '@/components/review/ReviewSetup/ReviewSetup';
import { Suspense } from 'react';

export default function ReviewPage() {
  return (
    <Suspense>
      <ReviewSetup />
    </Suspense>
  );
}
