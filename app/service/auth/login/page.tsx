'use client';

import Login from '@/components/Service/Auth/Login';
import { useAuthAuthCheck } from '@/hooks/Moddleware/Auth';

export default function LoginPage() {
  const { userChecked } = useAuthAuthCheck();
  if (!userChecked) {
    return null;
  }
  return <Login />;
}
