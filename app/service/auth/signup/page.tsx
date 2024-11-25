'use client';

import SignUp from '@/components/Service/Auth/SignUp';
import { useAuthAuthCheck } from '@/hooks/Moddleware/Auth';

export default function SignUpPage() {
  const { userChecked } = useAuthAuthCheck();
  if (!userChecked) {
    return null;
  }
  return <SignUp />;
}
