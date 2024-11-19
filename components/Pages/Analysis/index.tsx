'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/libs/supabase';
import MainLayout from '@/components/Layouts/MainLayout';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

type Analysis = {
  id: number;
  title: string;
  description: string;
};

type AnalysisTitle = {
  id: number;
  title: string;
};

export default function Calendar() {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [analysisTitles, setAnalysisTitles] = useState<AnalysisTitle[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ titleId: '', description: '' });

  // ユーザー取得
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error('Error fetching session:', error);
        return;
      }

      setUserId(session?.user.id || null);
    };

    fetchUser();
  }, []);

  // データ取得
  useEffect(() => {
    if (!userId) return;

    const fetchAnalyses = async () => {
      try {
        const { data, error } = await supabase
          .from('analysis')
          .select(
            `
            id,
            title_id (
              title
            ),
            description
          `,
          )
          .eq('supabaseauth_id', userId)
          .order('id', { ascending: true });

        if (error) throw error;

        const formattedData = data.map((item: any) => ({
          id: item.id,
          title: item.title_id.title,
          description: item.description,
        }));

        setAnalyses(formattedData);
      } catch (error) {
        console.error('Error fetching analyses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyses();
  }, [userId]);

  // AnalysisTitle データ取得
  useEffect(() => {
    const fetchAnalysisTitles = async () => {
      try {
        const { data, error } = await supabase
          .from('analysistitle')
          .select('id, title')
          .order('id', { ascending: true });

        if (error) throw error;

        setAnalysisTitles(data);
      } catch (error) {
        console.error('Error fetching analysis titles:', error);
      }
    };

    fetchAnalysisTitles();
  }, []);

  // データ追加
  const handleAddAnalysis = async () => {
    if (!userId || !formData.titleId) {
      console.error('User ID or Title ID is missing');
      return;
    }

    try {
      // title_id の検証
      const { data: titleData, error: titleError } = await supabase
        .from('analysistitle')
        .select('id')
        .eq('id', formData.titleId);

      if (!titleData || titleData.length === 0) {
        console.error('Invalid title_id: Does not exist in analysistitle table.');
        return;
      }

      // データ挿入
      const { data, error } = await supabase
        .from('analysis')
        .insert([
          {
            supabaseauth_id: userId,
            title_id: parseInt(formData.titleId), // 整数型に変換
            description: formData.description,
          },
        ])
        .select();

      if (error) {
        console.error('Supabase error:', error.message);
        return;
      }

      if (data && data.length > 0) {
        const addedAnalysis = data[0];
        const title = analysisTitles.find((t) => t.id === parseInt(formData.titleId))?.title || '';
        setAnalyses((prev) => [
          ...prev,
          { id: addedAnalysis.id, title, description: formData.description },
        ]);
      } else {
        console.warn('No data returned from insert.');
      }

      setFormData({ titleId: '', description: '' });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding analysis:', error);
    }
  };

  return (
    <>
      <div>
        <MainLayout />
        <div className="lg:pl-72">
          <main className="">
            {/* タイトル */}
            <div className="bg-white px-4 sm:px-6 lg:px-8">
              <div className="py-10 flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    自己分析
                  </h2>
                </div>
                <div className="flex ml-4 mt-0">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="ml-3 inline-flex items-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                  >
                    追加
                  </button>
                </div>
              </div>
            </div>

            {/* メインコンテンツ */}
            <div className="px-4 sm:px-6 lg:px-8 mt-10">
              {analyses.map((analysis) => (
                <div
                  key={analysis.id}
                  className="overflow-hidden bg-white shadow sm:rounded-lg mb-5"
                >
                  <div>
                    <div className="px-4 py-3 sm:px-6">
                      <h3 className="text-base/7 font-semibold text-gray-900">{analysis.title}</h3>
                    </div>
                    <div className="px-4 py-3 sm:px-6 border-t border-gray-100">
                      <p className="text-gray-600">{analysis.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* モーダル */}
      <Transition.Root show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setIsModalOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  自己分析を追加
                </Dialog.Title>
                <div className="mt-4">
                  <select
                    value={formData.titleId}
                    onChange={(e) => setFormData({ ...formData, titleId: e.target.value })}
                    className="w-full rounded-md border border-gray-300 p-2 mb-4"
                  >
                    <option value="">タイトルを選択</option>
                    {analysisTitles.map((title) => (
                      <option key={title.id} value={title.id}>
                        {title.title}
                      </option>
                    ))}
                  </select>
                  <textarea
                    placeholder="説明"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full rounded-md border border-gray-300 p-2"
                  />
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="mr-2 rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
                  >
                    キャンセル
                  </button>
                  <button
                    onClick={handleAddAnalysis}
                    className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
                  >
                    追加
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
