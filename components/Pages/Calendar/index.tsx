'use client';

import MainLayout from '@/components/Layouts/MainLayout';

export default function Calendar() {
  return (
    <>
      <div>
        <MainLayout />
        <div className="lg:pl-72">
          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8 font-bold text-3xl">カレンダー</div>
          </main>
        </div>
      </div>
    </>
  );
}
