'use client';

import Template from '@/components/Service/Pages/Template';
import { useAuthMainCheck } from '@/hooks/Middleware/Main';

export const runtime = 'edge';

export default function TemplatePage() {
  const { userChecked } = useAuthMainCheck();

  if (!userChecked) {
    return null;
  }
  return <Template />;
}
