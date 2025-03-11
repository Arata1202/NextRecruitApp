import { Suspense } from 'react';
import DetailFeature from '@/components/Features/Selection/Detail';

export default function DetailPage() {
  return (
    <Suspense>
      <DetailFeature />
    </Suspense>
  );
}
