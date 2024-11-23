'use client';

import MainLayout from '@/components/Layouts/MainLayout';
import { CalendarDaysIcon } from '@heroicons/react/20/solid';

export default function Calendar() {
  return (
    <>
      <div>
        <MainLayout />
        <div className="lg:pl-72">
          <main className="">
            {/* タイトル */}
            <div className="bg-white px-4 sm:px-6 lg:px-8 MobileHeader">
              <div>
                <div className="flex items-center justify-between TitleBanner">
                  <div className="min-w-0 flex-1">
                    <div className="flex">
                      <CalendarDaysIcon className="TitleIcon mr-1" aria-hidden="true" />
                      <h2 className="text-2xl/7 font-bold sm:truncate sm:text-3xl sm:tracking-tight">
                        カレンダー
                      </h2>
                    </div>
                  </div>
                  {/* <div className="flex ml-4 mt-0">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="ml-3 inline-flex items-center rounded-md bg-blue-500 hover:bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                    >
                      追加
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
            {/* メインコンテンツ */}
            <div className="px-4 sm:px-6 lg:px-8 mt-5">メインエリア</div>
          </main>
        </div>
      </div>
    </>
  );
}
