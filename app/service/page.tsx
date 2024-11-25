'use client';

import DashBoard from '@/components/Pages/Dashboard';
import { useAuthMainCheck } from '@/hooks/Moddleware/Main';

export default function DashBoardPage() {
  const { userChecked } = useAuthMainCheck();

  if (!userChecked) {
    return null;
  }
  return <DashBoard />;
}
