'use client';

import Detail from '@/components/Service/Pages/Selection/Detail';
import { useAuthMainCheck } from '@/hooks/Middleware/Main';

export default function TemplatePage() {
  const { userChecked } = useAuthMainCheck();

  if (!userChecked) {
    return null;
  }
  return <Detail />;
}
