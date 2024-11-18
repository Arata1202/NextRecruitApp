'use client';

import Analysis from '@/components/Pages/Analysis';
import { useAuthMainCheck } from '@/hooks/Moddleware/Main';

export default function AnalysisPage() {
  const { userChecked } = useAuthMainCheck();

  if (!userChecked) {
    return null;
  }
  return <Analysis />;
}
