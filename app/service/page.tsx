'use client';

import DashBoard from '@/components/Service/Pages/Dashboard';
import { useAuthMainCheck } from '@/hooks/Middleware/Main';

export default function DashBoardPage() {
  const { userChecked } = useAuthMainCheck();

  if (!userChecked) {
    return null;
  }
  return (
    <>
      <DashBoard />
    </>
  );
}
