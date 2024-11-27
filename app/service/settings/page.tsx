'use client';

import Settings from '@/components/Service/Pages/Settings';
import { useAuthMainCheck } from '@/hooks/Middleware/Main';

export default function SettingsPage() {
  const { userChecked } = useAuthMainCheck();

  if (!userChecked) {
    return null;
  }
  return <Settings />;
}
