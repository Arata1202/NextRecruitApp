'use client';

import Selection from '@/components/Service/Pages/Selection';
import { useAuthMainCheck } from '@/hooks/Middleware/Main';

export const runtime = 'edge';

export default function SelectionPage() {
  const { userChecked } = useAuthMainCheck();

  if (!userChecked) {
    return null;
  }
  return <Selection />;
}
