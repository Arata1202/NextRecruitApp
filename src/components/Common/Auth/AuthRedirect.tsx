'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/libs/supabase';

type AuthRedirectProps = {
  requireAuth: boolean; // true: 認証が必要, false: 認証不要（未認証のみアクセス可能）
  children: React.ReactNode;
};

export default function AuthRedirect({ requireAuth, children }: AuthRedirectProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (requireAuth && !user && pathname !== '/service/auth/login') {
        // 認証が必要なページで未認証の場合、ログインページにリダイレクト
        router.replace('/service/auth/login');
        return;
      } else if (!requireAuth && user && pathname.startsWith('/service/auth')) {
        // 認証不要なページ（auth関連）で認証済みの場合、/serviceにリダイレクト
        router.replace('/service');
        return;
      }

      // 認証チェック完了、ページを表示
      setIsLoading(false);
    };

    checkAuth();
  }, [pathname, requireAuth, router]);

  if (isLoading) {
    return null;
  }

  return <>{children}</>;
}
