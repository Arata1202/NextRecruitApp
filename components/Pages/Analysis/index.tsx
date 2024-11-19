'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/libs/supabase';
import MainLayout from '@/components/Layouts/MainLayout';
import { Dialog, Transition, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { Fragment } from 'react';
import { ExclamationTriangleIcon, PlusIcon, PencilIcon } from '@heroicons/react/24/solid';

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
  const [userId, setUserId] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ titleId: '', description: '' });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({ id: 0, titleId: '', description: '' });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [, setDeleteId] = useState<number | null>(null);
  const [deleteData, setDeleteData] = useState<Analysis | null>(null);
  const [initialEditTitle, setInitialEditTitle] = useState<string>('');

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
      const { data: titleData } = await supabase
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
            title_id: parseInt(formData.titleId),
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

  const handleEditAnalysis = async () => {
    try {
      const { data, error } = await supabase
        .from('analysis')
        .update({
          title_id: parseInt(editData.titleId),
          description: editData.description,
        })
        .eq('id', editData.id)
        .select();

      if (error) {
        console.error('Error editing analysis:', error);
        return;
      }

      setAnalyses((prev) =>
        prev.map((analysis) =>
          analysis.id === editData.id
            ? {
                id: editData.id,
                title: analysisTitles.find((t) => t.id === parseInt(editData.titleId))?.title || '',
                description: editData.description,
              }
            : analysis,
        ),
      );

      setEditData({ id: 0, titleId: '', description: '' });
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error editing analysis:', error);
    }
  };

  const openEditModal = (analysis: Analysis) => {
    const titleId = analysisTitles.find((t) => t.title === analysis.title)?.id.toString() || '';
    setEditData({
      id: analysis.id,
      titleId,
      description: analysis.description,
    });
    setInitialEditTitle(analysis.title);
    setIsEditModalOpen(true);
  };

  const handleDeleteAnalysis = async () => {
    if (!deleteData?.id) return;

    try {
      const { error } = await supabase.from('analysis').delete().eq('id', deleteData.id);

      if (error) {
        console.error('Error deleting analysis:', error);
        return;
      }

      // データをローカル状態から削除
      setAnalyses((prev) => prev.filter((analysis) => analysis.id !== deleteData.id));
      setDeleteId(null);
      setDeleteData(null);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting analysis:', error);
    }
  };

  const openDeleteModal = (analysis: Analysis) => {
    setDeleteData(analysis);
    setIsDeleteModalOpen(true);
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
                  <h2 className="text-2xl/7 font-bold sm:truncate sm:text-3xl sm:tracking-tight">
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
              {analyses.length > 0 ? (
                analyses.map((analysis) => (
                  <div
                    key={analysis.id}
                    className="overflow-hidden bg-white shadow sm:rounded-lg mb-5"
                  >
                    <div>
                      <div className="px-4 py-3 sm:px-6 flex">
                        <h3 className="text-base/7 font-semibold">{analysis.title}</h3>
                        <div className="flex ml-auto">
                          <button
                            type="button"
                            onClick={() => openEditModal(analysis)}
                            className="inline-flex items-center rounded-md bg-blue-500 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                          >
                            編集
                          </button>
                          <button
                            type="button"
                            onClick={() => openDeleteModal(analysis)}
                            className="ml-2 inline-flex items-center rounded-md bg-red-500 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                          >
                            削除
                          </button>
                        </div>
                      </div>
                      <div className="px-4 py-3 sm:px-6 border-t border-gray-100">
                        <p className="">{analysis.description}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="overflow-hidden bg-white shadow sm:rounded-lg mb-5">
                  <div>
                    <div className="px-4 py-3 sm:px-6 flex">
                      <h3 className="text-base/7 font-semibold">データがありません。</h3>
                    </div>
                    <div className="px-4 py-3 sm:px-6 border-t border-gray-100">
                      <p className="">追加ボタンから自己分析を行ってみましょう。</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* 追加モーダル */}
      <Transition.Root show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setIsModalOpen}>
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
          />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel
                transition
                style={{ width: '100%' }}
                className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
              >
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:size-10">
                      <PlusIcon aria-hidden="true" className="size-6 text-blue-500" />
                    </div>
                    <div className="mt-2 text-center sm:ml-4 sm:text-left">
                      <Dialog.Title as="h1" className={`text-base font-bold leading-6`}>
                        自己分析を追加
                      </Dialog.Title>
                    </div>
                  </div>
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
                      placeholder="内容"
                      rows={10}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full rounded-md border border-gray-300 p-2"
                    />
                  </div>
                </div>
                <div className="mt-3 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className={`mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto`}
                  >
                    キャンセル
                  </button>
                  <button
                    type="button"
                    onClick={handleAddAnalysis}
                    className="inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                  >
                    追加
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* 編集モーダル */}
      <Transition.Root show={isEditModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setIsModalOpen}>
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
          />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel
                transition
                style={{ width: '100%' }}
                className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
              >
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:size-10">
                      <PencilIcon aria-hidden="true" className="size-6 text-blue-500" />
                    </div>
                    <div className="mt-2 text-center sm:ml-4 sm:text-left">
                      <Dialog.Title as="h1" className={`text-base font-bold leading-6`}>
                        「{initialEditTitle}」を編集
                      </Dialog.Title>
                    </div>
                  </div>
                  <div className="mt-4">
                    {/* <select
                      value={editData.titleId}
                      onChange={(e) => setEditData({ ...editData, titleId: e.target.value })}
                      className="w-full rounded-md border border-gray-300 p-2 mb-4"
                    >
                      <option value="">タイトルを選択</option>
                      {analysisTitles.map((title) => (
                        <option key={title.id} value={title.id}>
                          {title.title}
                        </option>
                      ))}
                    </select> */}
                    <textarea
                      placeholder="内容"
                      rows={10}
                      value={editData.description}
                      onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                      className="w-full rounded-md border border-gray-300 p-2"
                    />
                  </div>
                </div>
                <div className="mt-3 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className={`mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto`}
                  >
                    キャンセル
                  </button>
                  <button
                    type="button"
                    onClick={handleEditAnalysis}
                    className="inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                  >
                    編集
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* 削除モーダル */}
      <Transition.Root show={isDeleteModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsDeleteModalOpen(false)}>
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
          />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel
                transition
                style={{ width: '100%' }}
                className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
              >
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                    <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-500" />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle as="h3" className="text-base font-semibold">
                      「{deleteData?.title}」を削除しますか？
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm">操作は取り消すことができません。</p>
                    </div>
                  </div>
                </div>
                <div className="mt-3 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setIsDeleteModalOpen(false)}
                    className={`mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto`}
                  >
                    キャンセル
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteAnalysis}
                    className="inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    削除
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
