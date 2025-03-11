import { Suspense } from 'react';
import FlowFeature from '@/components/Features/Selection/Flow';

export default function FlowPage() {
  return (
    <Suspense>
      <FlowFeature />
    </Suspense>
  );
}
