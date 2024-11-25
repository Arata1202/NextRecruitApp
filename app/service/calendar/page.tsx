'use client';

import Calendar from '@/components/Service/Pages/Calendar';
import { useAuthMainCheck } from '@/hooks/Moddleware/Main';

export default function CalendarPage() {
  const { userChecked } = useAuthMainCheck();

  if (!userChecked) {
    return null;
  }
  return <Calendar />;
}
