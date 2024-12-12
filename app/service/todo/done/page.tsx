'use client';

import Todo from '@/components/Service/Pages/Todo/Done';
import { useAuthMainCheck } from '@/hooks/Middleware/Main';

export default function TemplatePage() {
  const { userChecked } = useAuthMainCheck();

  if (!userChecked) {
    return null;
  }
  return <Todo />;
}
