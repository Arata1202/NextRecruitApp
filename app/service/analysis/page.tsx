'use client';

import Analysis from '@/components/Service/Pages/Analysis';
import { useAuthMainCheck } from '@/hooks/Middleware/Main';

export default function AnalysisPage() {
  const { userChecked } = useAuthMainCheck();

  if (!userChecked) {
    return null;
  }
  return <Analysis />;
}
