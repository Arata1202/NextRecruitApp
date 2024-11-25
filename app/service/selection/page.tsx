'use client';

import Selection from '@/components/Service/Pages/Selection';
import { useAuthMainCheck } from '@/hooks/Moddleware/Main';

export default function SelectionPage() {
  const { userChecked } = useAuthMainCheck();

  if (!userChecked) {
    return null;
  }
  return <Selection />;
}
