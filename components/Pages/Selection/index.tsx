'use client';

import MainLayout from '@/components/Layouts/MainLayout';
import { MagnifyingGlassIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

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
                    <h2 className="text-2xl/7 font-bold sm:truncate sm:text-3xl sm:tracking-tight">
                      選考企業
                    </h2>
                  </div>
                  <div className="flex ml-4 mt-0">
                    <button
                      type="button"
                      className="ml-3 inline-flex items-center rounded-md bg-blue-500 hover:bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                    >
                      追加
                    </button>
                  </div>
                </div>
              </div>
              <div className="pb-5">
                <div className="Search relative mt-2 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MagnifyingGlassIcon aria-hidden="true" className="size-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="検索"
                    className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            {/* メイン */}
            <div className="flex justify-between px-4 sm:px-6 lg:px-8 mt-5">
              <div className="w-full overflow-hidden bg-white shadow sm:rounded-lg mb-5">
                <div>
                  <div className="px-4 py-3 sm:px-6 flex">
                    <h3 className="text-base/7 font-semibold">株式会社アイスタイル</h3>
                    <div className="flex ml-auto">
                      <button type="button" className="hover:text-blue-600">
                        <PencilIcon className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <button type="button" className="ml-3 hover:text-blue-600">
                        <TrashIcon className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div className="px-4 py-3 sm:px-6 border-t border-gray-100">
                    <p className="whitespace-pre-wrap">★★★★★</p>
                  </div>
                </div>
              </div>

              <div className="w-full ml-8 overflow-hidden bg-white shadow sm:rounded-lg mb-5">
                <div>
                  <div className="px-4 py-3 sm:px-6 flex">
                    <h3 className="text-base/7 font-semibold">株式会社DeNA</h3>
                    <div className="flex ml-auto">
                      <button type="button" className="hover:text-blue-600">
                        <PencilIcon className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <button type="button" className="ml-3 hover:text-blue-600">
                        <TrashIcon className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div className="px-4 py-3 sm:px-6 border-t border-gray-100">
                    <p className="whitespace-pre-wrap">★★★★★</p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
