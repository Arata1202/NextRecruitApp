'use client';

import Flow from '@/components/Service/Pages/Selection/Flow';
import { useAuthMainCheck } from '@/hooks/Moddleware/Main';

export default function TemplatePage() {
  const { userChecked } = useAuthMainCheck();

  if (!userChecked) {
    return null;
  }
  return <Flow />;
}
