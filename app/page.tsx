'use client';

import Home from '@/components/Pages/Home';
import { useAuthMainCheck } from '@/hooks/Moddleware/Main';

export default function HomePage() {
  const { userChecked } = useAuthMainCheck();

  if (!userChecked) {
    return null;
  }
  return <Home />;
}
