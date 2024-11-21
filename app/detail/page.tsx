'use client';

import Detail from '@/components/Pages/Detail';
import { useAuthMainCheck } from '@/hooks/Moddleware/Main';

export default function DetailPage() {
  const { userChecked } = useAuthMainCheck();

  if (!userChecked) {
    return null;
  }
  return <Detail />;
}
