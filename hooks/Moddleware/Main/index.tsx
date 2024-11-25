import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/libs/supabase';
import { User } from '@supabase/supabase-js';

export function useAuthMainCheck() {
  const [user, setUser] = useState<User | null>(null);
  const [userChecked, setUserChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push('/service/auth/login');
      } else {
        setUser(user);
        setUserChecked(true);
      }
    };

    checkUser();
  }, [router]);

  return { user, userChecked };
}
