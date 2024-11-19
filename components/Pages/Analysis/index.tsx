'use client';

import MainLayout from '@/components/Layouts/MainLayout';

export default function Calendar() {
  return (
    <>
      <div>
        <MainLayout />
        <div className="lg:pl-72">
          <main className="">
            {/* タイトル */}
            <div className="bg-white px-4 sm:px-6 lg:px-8">
              <div className="py-10 md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                  <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    自己分析
                  </h2>
                </div>
                <div className="mt-4 flex md:ml-4 md:mt-0">
                  <button
                    type="button"
                    className="ml-3 inline-flex items-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                  >
                    追加
                  </button>
                </div>
              </div>
            </div>

            {/* メインコンテンツ */}
            <div className="px-4 sm:px-6 lg:px-8 mt-10">
              <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                <div className="px-4 py-3 sm:px-6">
                  <h3 className="text-base/7 font-semibold text-gray-900">長所</h3>
                </div>
                <div className="px-4 py-3 sm:px-6 border-t border-gray-100">qaa</div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
