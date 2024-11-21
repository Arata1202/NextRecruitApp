'use client';

import SelectionDetail from '@/components/Pages/SelectionDetail';
import { useAuthMainCheck } from '@/hooks/Moddleware/Main';

export default function SelectionDetailPage() {
  const { userChecked } = useAuthMainCheck();

  if (!userChecked) {
    return null;
  }
  return <SelectionDetail />;
}
