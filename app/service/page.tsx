'use client';

import DashBoard from '@/components/Service/Pages/Dashboard';
import { useAuthMainCheck } from '@/hooks/Middleware/Main';
import { OneSignalInitial } from '@/libs/OneSignalInitial';

export default function DashBoardPage() {
  const { userChecked } = useAuthMainCheck();

  if (!userChecked) {
    return null;
  }
  return (
    <>
      <OneSignalInitial />
      <DashBoard />
    </>
  );
}
