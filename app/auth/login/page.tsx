'use client';

import { supabase } from '@/libs/supabase';
import { User } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Login from '@/components/Auth/Login';

export default function LoginPage() {
  const router = useRouter();
  const [, setUser] = useState<User | null>(null);
  const [userChecked, setUserChecked] = useState(false);
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        router.push('/');
      } else {
        setUser(user);
        setUserChecked(true);
      }
    };
    checkUser();
  });
  if (!userChecked) {
    return null;
  }
  return <Login />;
}
