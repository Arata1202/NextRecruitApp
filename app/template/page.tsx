'use client';

import Template from '@/components/Pages/Template';
import { useAuthMainCheck } from '@/hooks/Moddleware/Main';

export default function TemplatePage() {
  const { userChecked } = useAuthMainCheck();

  if (!userChecked) {
    return null;
  }
  return <Template />;
}
