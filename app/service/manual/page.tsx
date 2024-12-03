'use client';

import Manual from '@/components/Service/Pages/Manual';
import { useAuthMainCheck } from '@/hooks/Middleware/Main';

export default function ManualPage() {
  const { userChecked } = useAuthMainCheck();

  if (!userChecked) {
    return null;
  }
  return <Manual />;
}
