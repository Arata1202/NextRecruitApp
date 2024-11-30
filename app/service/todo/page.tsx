'use client';

import Todo from '@/components/Service/Pages/Todo';
import { useAuthMainCheck } from '@/hooks/Middleware/Main';

export default function TemplatePage() {
  const { userChecked } = useAuthMainCheck();

  if (!userChecked) {
    return null;
  }
  return <Todo />;
}
