'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import MainLayout from '@/components/Layouts/MainLayout';
import { supabase } from '@/libs/supabase';
import {
  DocumentTextIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';

interface SelectionDetail {
  id: number;
  description: string;
  selectiondetailtitle: { title: string }[]; // 配列に変更
}

export default function SelectionDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  const [filteredAnalyses, setFilteredAnalyses] = useState<
    { id: number; title: string; description: string }[]
  >([]);

  useEffect(() => {
    if (!id) {
      router.push('/selection');
      return;
    }

    const fetchData = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          router.push('/selection');
          return;
        }

        const { data, error } = await supabase
          .from('selectiondetail')
          .select(
            `
            id,
            description,
            selectiondetailtitle (
              title
            )
          `,
          )
          .eq('selection_id', id);

        if (error || !data || data.length === 0) {
          console.error('Error or no data:', error);
          router.push('/selection');
          return;
        }

        console.log('Raw Supabase Data:', data);

        // 修正：selectiondetailtitle がオブジェクトの場合の処理
        const formattedData = data.map((detail: any) => ({
          id: detail.id,
          title: detail.selectiondetailtitle?.title || 'タイトルなし',
          description: detail.description || '説明なし',
        }));

        console.log('Formatted Data:', formattedData);

        setFilteredAnalyses(formattedData);
      } catch (err) {
        console.error('Unexpected Error:', err);
        router.push('/selection');
      }
    };

    fetchData();
  }, [id, router]);

  const handleNavigateToDetail = (id: string) => {
    console.log(`Navigate to detail page for ID: ${id}`);
  };

  const openEditModal = (analysis: { id: string; title: string; description: string }) => {
    console.log(`Open edit modal for: ${analysis.title}`);
  };

  const openDeleteModal = (analysis: { id: string; title: string; description: string }) => {
    console.log(`Open delete modal for: ${analysis.title}`);
  };

  return (
    <>
      <MainLayout />
      <div className="lg:pl-72">
        <main>
          {/* タイトル */}
          <div className="bg-white px-4 sm:px-6 lg:px-8 MobileHeader">
            <div>
              <div className="flex items-center justify-between TitleBanner">
                <div className="min-w-0 flex-1">
                  <div className="flex">
                    <h2 className="text-2xl/7 font-bold sm:truncate sm:text-3xl sm:tracking-tight">
                      選考企業
                    </h2>
                  </div>
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
            <div>
              <div className="pb-5 flex">
                <div className="w-full Search relative mt-2 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MagnifyingGlassIcon aria-hidden="true" className="size-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="検索"
                    className="block w-full rounded-md border-0 py-1.5 pl-10 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 sm:px-6 lg:px-8 mt-5">
            {filteredAnalyses.map((analysis) => (
              <div key={analysis.id} className="overflow-hidden bg-white shadow sm:rounded-lg mb-5">
                <div>
                  <div className="px-4 py-3 sm:px-6 flex">
                    <h3 className="text-base/7 font-semibold">{analysis.title}</h3>
                    <div className="flex ml-auto">
                      <button type="button" className="hover:text-blue-600">
                        <DocumentTextIcon className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <button type="button" className="ml-3 hover:text-blue-600">
                        <PencilIcon className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <button type="button" className="ml-3 hover:text-blue-600">
                        <TrashIcon className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div className="px-4 py-3 sm:px-6 border-t border-gray-100">
                    <p className="whitespace-pre-wrap">{analysis.description}</p>
                    <p className="flex justify-end text-gray-500 text-sm mt-1">
                      {analysis.description.replace(/\s/g, '').length} 文字
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
