import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/libs/supabase';
import { User } from '@supabase/supabase-js';

export function useAuthAuthCheck(redirectPath: string = '/') {
  const [user, setUser] = useState<User | null>(null);
  const [userChecked, setUserChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        router.push(redirectPath);
      } else {
        setUser(user);
        setUserChecked(true);
      }
    };

    checkUser();
  }, [router, redirectPath]);

  return { user, userChecked };
}
