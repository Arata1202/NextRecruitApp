'use client';

import MainLayout from '@/components/Service/Layouts/MainLayout';

export default function Home() {
  return (
    <>
      <div>
        <MainLayout />
        <div className="lg:pl-72">
          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8 font-bold text-3xl">ダッシュボード</div>
          </main>
        </div>
      </div>
    </>
  );
}
