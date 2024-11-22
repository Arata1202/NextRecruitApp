'use client';

import Detail from '@/components/Pages/Selection/Detail';
import { useAuthMainCheck } from '@/hooks/Moddleware/Main';

export default function TemplatePage() {
  const { userChecked } = useAuthMainCheck();

  if (!userChecked) {
    return null;
  }
  return <Detail />;
}
