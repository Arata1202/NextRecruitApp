'use client';

import { usePathname } from 'next/navigation';
import MainLayout from '@/components/Common/Layouts/MainLayout';
import AuthRedirect from '@/components/Common/Auth/AuthRedirect';

type Props = {
  children: React.ReactNode;
};

const AUTH_ROUTE_PREFIX = '/service/auth';

export default function ServiceShell({ children }: Props) {
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith(AUTH_ROUTE_PREFIX);

  return (
    <AuthRedirect requireAuth={!isAuthRoute}>
      {!isAuthRoute && <MainLayout />}
      {children}
    </AuthRedirect>
  );
}
