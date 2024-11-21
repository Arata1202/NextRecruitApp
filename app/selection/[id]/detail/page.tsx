'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { supabase } from '@/libs/supabase';
import MainLayout from '@/components/Layouts/MainLayout';
import { Dialog, Transition, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { Fragment } from 'react';
import {
  ExclamationTriangleIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/solid';

type Analysis = {
  id: number;
  title: string;
  description: string;
};

type AnalysisTitle = {
  id: number;
  title: string;
};

type AnalysisRawData = {
  id: number;
  title_id: {
    id: number;
    title: string;
    sort: number;
  };
  description: string;
};

export default function Detail() {
  const { id } = useParams();

  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [analysisTitles, setAnalysisTitles] = useState<AnalysisTitle[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({ id: 0, titleId: '', description: '' });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [, setDeleteId] = useState<number | null>(null);
  const [deleteData, setDeleteData] = useState<Analysis | null>(null);
  const [initialEditTitle, setInitialEditTitle] = useState<string>('');
  const [filteredAnalyses, setFilteredAnalyses] = useState<Analysis[]>([]);
  const [searchQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [analysisGroups, setAnalysisGroups] = useState<{ id: number; title: string }[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [descriptionLength, setDescriptionLength] = useState(0);
  const [pageTitle, setPageTitle] = useState<string>('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      titleId: '',
      description: '',
    },
  });

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

    if (typeof id !== 'string') {
      console.error('Invalid id:', id);
      return;
    }

    const fetchSelectionDetails = async () => {
      try {
        const query = supabase
          .from('selectiondetail')
          .select(
            `
            id,
            title_id (
              id,
              title
            ),
            description
          `,
          )
          .eq('selection_id', parseInt(id));

        const { data, error } = await query;

        if (error) {
          console.error('Error fetching selection details:', error.message);
          return;
        }

        const formattedData = (data || []).map((item: any) => ({
          id: item.id,
          title: item.title_id?.title || 'Untitled',
          description: item.description,
        }));

        setAnalyses(formattedData);
        setFilteredAnalyses(formattedData);
      } catch (error) {
        console.error('Error fetching selection details:', error);
      }
    };

    fetchSelectionDetails();
  }, [userId, id]);

  // analysisgroup データを取得
  useEffect(() => {
    const fetchAnalysisGroups = async () => {
      try {
        const { data, error } = await supabase
          .from('analysisgroup')
          .select('id, title')
          .order('id', { ascending: true });

        if (error) throw error;

        setAnalysisGroups(data || []);
      } catch (error) {
        console.error('Error fetching analysis groups:', error);
      }
    };

    fetchAnalysisGroups();
  }, []);

  // AnalysisTitle データ取得
  useEffect(() => {
    const fetchAnalysisTitles = async () => {
      try {
        const { data, error } = await supabase
          .from('selectiondetailtitle')
          .select('id, title')
          .order('sort', { ascending: true });

        if (error) throw error;

        setAnalysisTitles(data);
      } catch (error) {
        console.error('Error fetching analysis titles:', error);
      }
    };

    fetchAnalysisTitles();
  }, []);

  // データ追加
  const handleAddAnalysis = async (formValues: { titleId: string; description: string }) => {
    if (typeof id !== 'string') {
      console.error('Invalid id:', id);
      return;
    }
    const { data, error } = await supabase
      .from('selectiondetail')
      .insert([
        {
          title_id: parseInt(formValues.titleId),
          description: formValues.description,
          selection_id: parseInt(id),
        },
      ])
      .select();

    if (error) {
      console.error('Error adding selection detail:', error.message);
      return;
    }

    if (data) {
      const addedDetail = {
        id: data[0]?.id,
        title:
          analysisTitles.find((title) => title.id === parseInt(formValues.titleId))?.title ||
          'Untitled',
        description: formValues.description,
      };

      setAnalyses((prev) => [addedDetail, ...prev]);
      setIsModalOpen(false);
      reset();
    }
  };

  const handleEditAnalysis = async () => {
    try {
      const { error } = await supabase
        .from('selectiondetail')
        .update({
          title_id: parseInt(editData.titleId),
          description: editData.description,
        })
        .eq('id', editData.id);

      if (error) {
        console.error('Error editing selection detail:', error.message);
        return;
      }

      setAnalyses((prev) =>
        prev.map((detail) =>
          detail.id === editData.id
            ? {
                id: editData.id,
                title:
                  analysisTitles.find((title) => title.id === parseInt(editData.titleId))?.title ||
                  'Untitled',
                description: editData.description,
              }
            : detail,
        ),
      );
      setIsEditModalOpen(false);
      reset({
        titleId: '',
        description: '',
      });
    } catch (error) {
      console.error('Error editing selection detail:', error);
    }
  };

  const openEditModal = (analysis: Analysis) => {
    const titleId = analysisTitles.find((t) => t.title === analysis.title)?.id.toString() || '';
    setEditData({
      id: analysis.id,
      titleId,
      description: analysis.description,
    });
    setDescriptionLength(analysis.description.length);
    reset({
      titleId,
      description: analysis.description,
    });
    setInitialEditTitle(analysis.title);
    setIsEditModalOpen(true);
  };

  const handleDeleteAnalysis = async () => {
    if (!deleteData) return;

    try {
      const { error } = await supabase.from('selectiondetail').delete().eq('id', deleteData.id);

      if (error) {
        console.error('Error deleting selection detail:', error.message);
        return;
      }

      setAnalyses((prev) => prev.filter((detail) => detail.id !== deleteData.id));
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting selection detail:', error);
    }
  };

  const openDeleteModal = (analysis: Analysis) => {
    setDeleteData(analysis);
    setIsDeleteModalOpen(true);
  };

  // 検索処理
  useEffect(() => {
    const results = analyses.filter((analysis) =>
      analysis.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredAnalyses(results);
  }, [searchTerm, analyses]);

  useEffect(() => {
    const fetchPageTitle = async () => {
      try {
        if (typeof id !== 'string') {
          console.error('Invalid id:', id);
          return;
        }

        const { data, error } = await supabase
          .from('selection')
          .select('title')
          .eq('id', parseInt(id))
          .single();

        if (error) {
          console.error('Error fetching page title:', error.message);
          return;
        }

        setPageTitle(data?.title || 'Untitled');
      } catch (error) {
        console.error('Error fetching page title:', error);
      }
    };

    fetchPageTitle();
  }, [id]);

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
                      <BuildingOfficeIcon className="TitleIcon mr-1" aria-hidden="true" />
                      <h2 className="text-2xl/7 font-bold sm:truncate sm:text-3xl sm:tracking-tight">
                        {pageTitle}
                      </h2>
                    </div>
                  </div>
                  <div className="flex ml-4 mt-0">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="ml-3 inline-flex items-center rounded-md bg-blue-500 hover:bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                    >
                      追加
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <div className="pb-5 flex">
                  <div className="w-2/3 Search relative mt-2 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MagnifyingGlassIcon aria-hidden="true" className="size-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="検索"
                      className="block w-full rounded-md border-0 py-1.5 pl-10 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm/6"
                    />
                  </div>

                  <div className="w-1/3 ml-2">
                    <select
                      value={selectedGroupId || ''}
                      onChange={(e) => {
                        const value = e.target.value;
                        setSelectedGroupId(value ? parseInt(value) : null);
                      }}
                      style={{ height: '36px' }}
                      className="Search mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-500 sm:text-sm/6"
                    >
                      <option>全て</option>
                      {analysisGroups.map((group) => (
                        <option key={group.id} value={group.id}>
                          {group.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* メインコンテンツ */}
            <div className="px-4 sm:px-6 lg:px-8 mt-5">
              {filteredAnalyses.map((analysis) => (
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
                          className="hover:text-blue-600"
                        >
                          <PencilIcon className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() => openDeleteModal(analysis)}
                          className="ml-3 hover:text-blue-600"
                        >
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
      </div>

      {/* 追加モーダル */}
      <Transition.Root show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => {}}>
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
                <form onSubmit={handleSubmit(handleAddAnalysis)}>
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
                      <div className="mb-4">
                        <select
                          {...register('titleId', { required: 'タイトルを選択してください' })}
                          className="w-full rounded-md border border-gray-300 p-2"
                        >
                          <option value="">タイトルを選択</option>
                          {analysisTitles
                            .filter(
                              (title) =>
                                !analyses.some((analysis) => analysis.title === title.title),
                            ) // 存在するタイトルを除外
                            .map((title) => (
                              <option key={title.id} value={title.id}>
                                {title.title}
                              </option>
                            ))}
                        </select>
                        {errors.titleId && (
                          <p className="text-red-500 mt-1 text-left">{errors.titleId.message}</p>
                        )}
                      </div>

                      <div className="mb-4">
                        <textarea
                          {...register('description', { required: '内容を入力してください' })}
                          placeholder="内容"
                          rows={10}
                          className="w-full rounded-md border border-gray-300 p-2"
                          onChange={(e) =>
                            setDescriptionLength(e.target.value.replace(/\s/g, '').length)
                          }
                        />
                        <p className="flex justify-end text-gray-500 text-sm mt-1">
                          {descriptionLength} 文字
                        </p>
                        {errors.description && (
                          <p className="text-red-500 text-left">{errors.description.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-flow-row-dense grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIsModalOpen(false);
                        setDescriptionLength(0);
                        reset({
                          titleId: '',
                          description: '',
                        });
                      }}
                      className={`DialogButton mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto`}
                    >
                      キャンセル
                    </button>
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 sm:ml-3 sm:w-auto"
                    >
                      追加
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* 編集モーダル */}
      <Transition.Root show={isEditModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => {}}>
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
                <form onSubmit={handleSubmit(handleEditAnalysis)}>
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
                      <div className="mb-4">
                        <textarea
                          {...register('description', { required: '内容を入力してください' })}
                          placeholder="内容"
                          rows={10}
                          value={editData.description}
                          onChange={(e) => {
                            const value = e.target.value;
                            setEditData({ ...editData, description: value });
                            setDescriptionLength(value.replace(/\s/g, '').length);
                          }}
                          className="w-full rounded-md border border-gray-300 p-2"
                        />
                        <p className="flex justify-end text-gray-500 text-sm mt-1">
                          {editData.description.replace(/\s/g, '').length} 文字
                        </p>
                        {errors.description && (
                          <p className="text-red-500 text-left">{errors.description.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-flow-row-dense grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditModalOpen(false);
                        setDescriptionLength(0);
                        reset({
                          titleId: '',
                          description: '',
                        });
                      }}
                      className={`DialogButton mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto`}
                    >
                      キャンセル
                    </button>
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 sm:ml-3 sm:w-auto"
                    >
                      編集
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* 削除モーダル */}
      <Transition.Root show={isDeleteModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => {}}>
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
                <div className="mt-3 grid grid-flow-row-dense grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setIsDeleteModalOpen(false)}
                    className={`DialogButton mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto`}
                  >
                    キャンセル
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteAnalysis}
                    className="inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 sm:ml-3 sm:w-auto"
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
