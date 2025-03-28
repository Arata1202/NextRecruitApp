'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { supabase } from '@/libs/supabase';
import { Dialog, Transition, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import AdUnit from '@/components/ThirdParties/GoogleAdSense/Elements/AdUnit';
import { useMutationObserver } from '@/hooks/useMutationObserver';
import { Fragment } from 'react';
import {
  ExclamationTriangleIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  BuildingOffice2Icon,
} from '@heroicons/react/24/solid';

type Analysis = {
  id: number;
  title: string;
  star_id: string;
};

export default function SelectionFeature() {
  useMutationObserver();
  const router = useRouter();
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedStarTitle, setSelectedStarTitle] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({ id: 0, title: '', selectionStarId: '' });
  const [selectionStars, setSelectionStars] = useState<{ id: number; title: string }[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteData, setDeleteData] = useState<Analysis | null>(null);
  const [initialEditTitle, setInitialEditTitle] = useState<string>('');

  const [filteredAnalyses, setFilteredAnalyses] = useState<Analysis[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [, setselectionStarIdLength] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      selectionStarId: '',
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

    const fetchAnalyses = async () => {
      try {
        const query = supabase
          .from('selection')
          .select(
            `
            id,
            title,
            star_id (
              title,
              sort
            )
            `,
          )
          .ilike('title', `%${searchTerm}%`)
          .eq('supabaseauth_id', userId);

        const { data, error } = await query;

        if (error) {
          console.error('Error fetching selections:', error.message);
          return;
        }

        const formattedData = data?.map((item: any) => ({
          id: item.id,
          title: item.title,
          star_id: item.star_id?.title || '未設定',
          sort: item.star_id?.sort || Infinity,
        }));

        const sortedData = formattedData?.sort((a, b) => a.sort - b.sort) || [];

        setAnalyses(sortedData);

        setTimeout(() => {
          setLoading(false);
        }, 100);
      } catch (error) {
        console.error('Error fetching selections:', error);
      }
    };

    fetchAnalyses();
  }, [userId, searchTerm]);

  // スターデータ
  useEffect(() => {
    const fetchSelectionStars = async () => {
      try {
        const { data, error } = await supabase
          .from('selectionstar')
          .select('id, title, sort')
          .order('sort', { ascending: true });

        if (error) {
          console.error('Error fetching selection stars:', error.message);
          return;
        }

        setSelectionStars(data || []);
      } catch (error) {
        console.error('Error fetching selection stars:', error);
      }
    };

    fetchSelectionStars();
  }, []);

  // データ追加
  const handleAddAnalysis = async (formValues: { title: string; selectionStarId: string }) => {
    if (!userId) {
      console.error('User ID is missing');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('selection')
        .insert([
          {
            supabaseauth_id: userId,
            title: formValues.title,
            star_id: Number(formValues.selectionStarId),
          },
        ])
        .select();

      if (error) {
        console.error('Supabase error:', error.message);
        return;
      }

      if (data && data.length > 0) {
        const starTitle =
          selectionStars.find((star_id) => star_id.id === Number(formValues.selectionStarId))
            ?.title || '未設定';

        setAnalyses((prev) => [
          {
            id: data[0].id,
            title: formValues.title,
            star_id: starTitle,
          },
          ...prev,
        ]);
      }

      reset({
        title: '',
        selectionStarId: '',
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding selection:', error);
    }
  };

  const handleEditAnalysis = async () => {
    try {
      const selectedStar = selectionStars.find(
        (star) => star.id === Number(editData.selectionStarId),
      );

      const { error } = await supabase
        .from('selection')
        .update({
          title: editData.title,
          star_id: editData.selectionStarId,
        })
        .eq('id', editData.id)
        .select();

      if (error) {
        console.error('Error editing selection:', error);
        return;
      }

      setAnalyses((prev) =>
        prev.map((selection) =>
          selection.id === editData.id
            ? {
                ...selection,
                title: editData.title,
                star_id: selectedStar ? selectedStar.title : '未設定',
              }
            : selection,
        ),
      );

      setEditData({ id: 0, title: '', selectionStarId: '' });
      setIsEditModalOpen(false);
      reset({
        title: '',
        selectionStarId: '',
      });
    } catch (error) {
      console.error('Error editing selection:', error);
    }
  };

  const openEditModal = (analysis: Analysis) => {
    const selectedStarId =
      selectionStars.find((star_id) => star_id.title === analysis.star_id)?.id || '';

    setEditData({
      id: analysis.id,
      title: analysis.title,
      selectionStarId: selectedStarId.toString(),
    });

    setInitialEditTitle(analysis.title);

    reset({
      title: analysis.title,
      selectionStarId: selectedStarId.toString(),
    });

    setIsEditModalOpen(true);
  };

  const handleDeleteAnalysis = async () => {
    if (!deleteData?.id) return;

    try {
      const { error } = await supabase.from('selection').delete().eq('id', deleteData.id);

      if (error) {
        console.error('Error deleting selection:', error);
        return;
      }

      setAnalyses((prev) => prev.filter((selection) => selection.id !== deleteData.id));
      setDeleteData(null);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting selection:', error);
    }
  };

  const openDeleteModal = (analysis: Analysis) => {
    setDeleteData(analysis);
    setIsDeleteModalOpen(true);
  };

  // 検索処理
  useEffect(() => {
    const results = analyses.filter((analysis) => {
      const matchesSearchTerm = analysis.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStarTitle = !selectedStarTitle || analysis.star_id === selectedStarTitle;

      return matchesSearchTerm && matchesStarTitle;
    });

    setFilteredAnalyses(results);
  }, [searchTerm, selectedStarTitle, analyses]);

  const handleNavigateToDetail = (id: number) => {
    router.push(`/service/selection/detail?id=${id}`);
  };

  return (
    <>
      <div>
        <div className="lg:pl-72 mut-guard">
          <main className="h-screen mut-guard">
            {/* タイトル */}
            <div className="bg-white px-4 sm:px-6 lg:px-8 MobileHeader">
              <div>
                <div className="flex items-center justify-between TitleBanner">
                  <div className="min-w-0 flex-1">
                    <div className="flex">
                      <BuildingOffice2Icon className="TitleIcon mr-1" aria-hidden="true" />
                      <h2 className="text-2xl/7 font-bold sm:truncate sm:text-3xl sm:tracking-tight">
                        企業管理
                      </h2>
                    </div>
                  </div>
                  <div className="flex ml-4 mt-0">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="ml-3 inline-flex items-center rounded-md bg-blue-500 hover:bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm"
                    >
                      追加
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <div className="pb-5 flex">
                  <div className="w-2/3 Search relative rounded-md shadow-sm">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="検索"
                      className={`block w-full rounded-md border py-2 pl-3 pr-3 sm:text-sm sm:leading-6 border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none placeholder:text-gray-500`}
                    />
                  </div>
                  <div className="w-1/3 ml-2">
                    <select
                      value={selectedStarTitle || ''}
                      onChange={(e) => {
                        const value = e.target.value;
                        setSelectedStarTitle(value !== '' ? value : null);
                      }}
                      className={`cursor-pointer block w-full h-full rounded-md border py-2.5 pl-3 pr-3 sm:text-sm sm:leading-6 border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none`}
                    >
                      <option value="">全て</option>
                      {selectionStars.map((star) => (
                        <option key={star.id} value={star.title}>
                          {star.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* メインコンテンツ */}
            <div
              className="px-4 sm:px-6 lg:px-8 mt-5 bg-gray-100 mut-guard"
              style={{
                paddingBottom: `calc(40px + env(safe-area-inset-bottom))`,
              }}
            >
              {/* <div className="FirstAd mb-5">
                <Display slot="3381880848" />
              </div> */}
              {loading ? (
                <></>
              ) : filteredAnalyses.length === 0 ? (
                <div className="mt-5">
                  <div className="overflow-hidden bg-white shadow rounded-lg mb-5 mt-5">
                    <div>
                      <div className="px-4 py-3 sm:px-6 flex">
                        <h3 className="text-base/7 font-semibold">データがありません。</h3>
                      </div>
                      <div className="px-4 py-3 sm:px-6 border-t border-gray-300">
                        <p className="whitespace-pre-wrap">
                          右上の追加ボタンから、企業管理を追加してみましょう！
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                filteredAnalyses.map((analysis) => (
                  <div
                    key={analysis.id}
                    className="overflow-hidden bg-white shadow rounded-lg mb-5"
                  >
                    <div>
                      <div className="px-4 py-3 sm:px-6 flex">
                        {/* <a
                        href="#"
                        onClick={(event) => {
                          event.preventDefault();
                          handleNavigateToDetail(analysis.id);
                        }}
                        className="text-base/7 font-semibold text-blue-500 hover:text-blue-600"
                      > */}
                        <h3 className="text-base/7 font-semibold">{analysis.title}</h3>
                        {/* </a> */}
                        <div className="flex ml-auto items-start">
                          {/* <button
                            type="button"
                            onClick={() => handleNavigateToDetail(analysis.id)}
                            className="hover:text-blue-500"
                          >
                            <DocumentTextIcon className="h-4 w-4" aria-hidden="true" />
                          </button> */}
                          <button
                            type="button"
                            onClick={() => openEditModal(analysis)}
                            className="ml-3 hover:text-blue-500"
                          >
                            <PencilIcon className="h-4 w-4" aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            onClick={() => openDeleteModal(analysis)}
                            className="ml-3 hover:text-blue-500"
                          >
                            <TrashIcon className="h-4 w-4" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center px-4 py-3 sm:px-6 border-t border-gray-300">
                        <p className="whitespace-pre-wrap">{analysis.star_id}</p>
                        <button
                          type="button"
                          onClick={() => handleNavigateToDetail(analysis.id)}
                          className="ml-3 inline-flex items-center rounded-md bg-blue-500 hover:bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm"
                        >
                          詳細
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {loading ? <></> : <AdUnit slot="7998948559" style={{ marginBottom: '1.25rem' }} />}
            </div>
          </main>
        </div>
      </div>

      {/* 追加モーダル */}
      <Transition.Root show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="text-gray-700 relative z-50" onClose={() => {}}>
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
          />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel
                transition
                style={{ width: '100%' }}
                className="m-auto relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
              >
                <form onSubmit={handleSubmit(handleAddAnalysis)}>
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:size-10">
                        <PlusIcon aria-hidden="true" className="size-6 text-blue-500" />
                      </div>
                      <div className="mt-2 text-center sm:ml-4 sm:text-left">
                        <Dialog.Title as="h1" className={`text-base font-bold leading-6`}>
                          企業を追加
                        </Dialog.Title>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="mb-4">
                        <input
                          {...register('title', { required: 'タイトルを入力してください' })}
                          placeholder="企業名"
                          className={`block w-full rounded-md border py-2 pl-3 pr-3 sm:text-sm sm:leading-6 border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none placeholder:text-gray-500`}
                        />
                        {errors.title && (
                          <p className="text-red-500 mt-1 text-left">{errors.title.message}</p>
                        )}
                      </div>

                      <div className="mb-4">
                        <label htmlFor="ended_at" className="block text-sm font-medium text-left">
                          志望度（企業一覧の並び順に影響します）
                        </label>
                        <select
                          {...register('selectionStarId', { required: '選択してください' })}
                          id="selectionStar"
                          style={{ height: '42px' }}
                          className={`cursor-pointer block w-full rounded-md border py-2 pl-3 pr-3 sm:text-sm sm:leading-6 border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none`}
                        >
                          <option value="">選択してください</option>
                          {selectionStars.map((star) => (
                            <option key={star.id} value={star.id}>
                              {star.title}
                            </option>
                          ))}
                        </select>
                        {errors.selectionStarId && (
                          <p className="text-red-500 mt-1 text-left">
                            {errors.selectionStarId.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-flow-row-dense grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIsModalOpen(false);
                        setselectionStarIdLength(0);
                        reset({
                          title: '',
                          selectionStarId: '',
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
        <Dialog as="div" className="text-gray-700 relative z-50" onClose={() => {}}>
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
          />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel
                transition
                style={{ width: '100%' }}
                className="m-auto relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
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
                        <input
                          {...register('title', { required: '企業名を入力してください' })}
                          placeholder="企業名"
                          value={editData.title}
                          onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                          className={`block w-full rounded-md border py-2 pl-3 pr-3 sm:text-sm sm:leading-6 border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none placeholder:text-gray-500`}
                        />
                        {errors.title && (
                          <p className="text-red-500 mt-1 text-left">{errors.title.message}</p>
                        )}
                      </div>
                      <div className="mb-4">
                        <label htmlFor="ended_at" className="block text-sm font-medium text-left">
                          志望度（企業一覧の並び順に影響します）
                        </label>
                        <select
                          {...register('selectionStarId', { required: '選択してください' })}
                          id="selectionStar"
                          value={editData.selectionStarId}
                          onChange={(e) => {
                            const value = e.target.value;
                            setEditData({ ...editData, selectionStarId: value });
                          }}
                          style={{ height: '42px' }}
                          className={`cursor-pointer block w-full rounded-md border py-2 pl-3 pr-3 sm:text-sm sm:leading-6 border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none`}
                        >
                          <option value="">選択してください</option>
                          {selectionStars.map((star) => (
                            <option key={star.id} value={star.id}>
                              {star.title}
                            </option>
                          ))}
                        </select>
                        {errors.selectionStarId && (
                          <p className="text-red-500 mt-1 text-left">
                            {errors.selectionStarId.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-flow-row-dense grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditModalOpen(false);
                        setselectionStarIdLength(0);
                        reset({
                          title: '',
                          selectionStarId: '',
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
        <Dialog as="div" className="text-gray-700 relative z-50" onClose={() => {}}>
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
          />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel
                transition
                style={{ width: '100%' }}
                className="m-auto relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
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
                      <p className="text-sm text-gray-500">操作は取り消すことができません。</p>
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
