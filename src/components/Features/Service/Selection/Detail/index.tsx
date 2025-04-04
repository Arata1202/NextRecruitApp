'use client';

import React from 'react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
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
  BuildingOfficeIcon,
} from '@heroicons/react/24/solid';

type Analysis = {
  id: number;
  title: string;
  description: string;
  customtitle: string;
};

type AnalysisTitle = {
  id: number;
  title: string;
};

export default function DetailFeature() {
  useMutationObserver();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const router = useRouter();

  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [analysisTitles, setAnalysisTitles] = useState<AnalysisTitle[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    id: 0,
    titleId: '',
    description: '',
    customtitle: '',
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteData, setDeleteData] = useState<Analysis | null>(null);
  const [initialEditTitle, setInitialEditTitle] = useState<string>('');
  const [filteredAnalyses, setFilteredAnalyses] = useState<Analysis[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [descriptionLength, setDescriptionLength] = useState(0);
  const [pageTitle, setPageTitle] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isCustom, setIsCustom] = useState(false);
  const [isEditCustom, setEditIsCustom] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      titleId: '',
      description: '',
      customtitle: '',
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
        setIsLoading(false);
        return;
      }

      setUserId(session?.user.id || null);
    };

    fetchUser();
  }, []);

  // 認証チェック
  useEffect(() => {
    const checkAuthorization = async () => {
      if (!userId || typeof id !== 'string') {
        setIsLoading(false); //
        return;
      }

      try {
        const { data, error } = await supabase
          .from('selection')
          .select('supabaseauth_id')
          .eq('id', parseInt(id))
          .single();

        if (error || !data || data.supabaseauth_id !== userId) {
          router.push('/404');
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Authorization check failed:', error);
        router.push('/404');
      }
    };

    if (userId) checkAuthorization();
  }, [userId, id, router]);

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
              title,
              sort
            ),
            description,
            customtitle
          `,
          )
          .eq('selection_id', parseInt(id));

        const { data, error } = await query;

        if (error) {
          console.error('Error fetching selection details:', error.message);
          return;
        }

        const formattedData = (data || [])
          .map((item: any) => ({
            id: item.id,
            title: item.title_id?.title || 'Untitled',
            description: item.description,
            customtitle: item.customtitle,
            sort: item.title_id?.sort || 0,
          }))
          .sort((a, b) => a.sort - b.sort);

        setAnalyses(formattedData);
        setFilteredAnalyses(formattedData);
        setTimeout(() => {
          setLoading(false);
        }, 100);
      } catch (error) {
        console.error('Error fetching selection details:', error);
      }
    };

    fetchSelectionDetails();
  }, [userId, id]);

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
  const handleAddAnalysis = async (formValues: {
    titleId: string;
    description: string;
    customtitle: string;
  }) => {
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
          customtitle: formValues.customtitle,
          selection_id: parseInt(id),
        },
      ])
      .select();

    if (error) {
      console.error('Error adding selection detail:', error.message);
      return;
    }

    if (data) {
      const addedDetail = data[0];
      const title = analysisTitles.find((t) => t.id === parseInt(formValues.titleId))?.title || '';

      setAnalyses((prev) => [
        {
          id: addedDetail.id,
          title,
          description: formValues.description,
          customtitle: formValues.customtitle,
        },
        ...prev,
      ]);
      setIsModalOpen(false);
      setIsCustom(false);
      reset({
        titleId: '',
        description: '',
      });
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
          customtitle: editData.customtitle,
        })
        .eq('id', editData.id);

      if (error) {
        console.error('Error editing selection detail:', error.message);
        return;
      }

      setAnalyses((prev) =>
        prev.map((analysis) =>
          analysis.id === editData.id
            ? {
                id: editData.id,
                title: analysisTitles.find((t) => t.id === parseInt(editData.titleId))?.title || '',
                description: editData.description,
                customtitle: editData.customtitle,
              }
            : analysis,
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
    const isEditCustom = titleId === '1';
    setEditData({
      id: analysis.id,
      titleId,
      description: analysis.description,
      customtitle: analysis.customtitle,
    });
    setDescriptionLength(analysis.description.length);
    setEditIsCustom(isEditCustom);

    const titleForEdit = isEditCustom ? analysis.customtitle : analysis.title;
    setInitialEditTitle(titleForEdit);

    reset({
      titleId: isEditCustom ? '1' : titleId,
      description: analysis.description,
      customtitle: isEditCustom ? analysis.customtitle : '',
    });
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
    const isCustom = analysisTitles.find((t) => t.title === analysis.title)?.id === 1;
    const titleForDelete = isCustom ? analysis.customtitle : analysis.title;

    setDeleteData({
      ...analysis,
      title: titleForDelete,
    });
    setIsDeleteModalOpen(true);
  };

  // 検索処理
  useEffect(() => {
    const results = analyses.filter((analysis) => {
      const searchLower = searchTerm.toLowerCase();
      const titleMatch = analysis.title.toLowerCase().includes(searchLower);
      const customTitleMatch = analysis.customtitle?.toLowerCase().includes(searchLower);
      return titleMatch || customTitleMatch;
    });
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

  if (isLoading) {
    return null;
  }

  if (!id) router.push('/service/selection');

  const formatDescription = (description: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = description.split(urlRegex);

    return parts.map((part, index) =>
      urlRegex.test(part) ? (
        <Link
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600"
        >
          {part}
        </Link>
      ) : (
        <React.Fragment key={index}>{part}</React.Fragment>
      ),
    );
  };

  const tabs = [
    { name: '企業情報', href: '#', current: true },
    { name: '選考状況', href: `/service/selection/flow?id=${id}`, current: false },
    { name: '企業一覧へ戻る', href: '/service/selection', current: false },
  ];

  function classNames(...classes: (string | false | null | undefined)[]): string {
    return classes.filter(Boolean).join(' ');
  }

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
                      <BuildingOfficeIcon
                        className="TitleIcon mr-1 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <h2 className="text-2xl/7 font-bold sm:truncate sm:text-3xl sm:tracking-tight  overflow-hidden whitespace-nowrap">
                        {pageTitle}
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
                <div className="flex">
                  <div className="w-full Search relative rounded-md shadow-sm">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="検索"
                      className={`block w-full rounded-md border py-2 pl-3 pr-3 sm:text-sm sm:leading-6 border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none placeholder:text-gray-500`}
                    />
                  </div>

                  {/* <div className="w-1/3 ml-2">
                    <select
                      onChange={handleNavigation}
                      style={{ height: '36px' }}
                      className="Search mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-500 sm:text-sm/6"
                    >
                      <option value="">企業情報</option>
                      <option value="flow">選考フロー</option>
                    </select>
                  </div> */}
                </div>
                <div>
                  <div className="">
                    <div className="border-b border-gray-300">
                      <nav aria-label="Tabs" className="-mb-px flex space-x-8">
                        {tabs.map((tab) => (
                          <Link
                            key={tab.name}
                            href={tab.href}
                            aria-current={tab.current ? 'page' : undefined}
                            className={classNames(
                              tab.current
                                ? 'border-blue-500 text-blue-500'
                                : 'border-transparent text-gray-700 hover:border-blue-500 hover:text-blue-500',
                              'whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium',
                            )}
                          >
                            {tab.name}
                          </Link>
                        ))}
                      </nav>
                    </div>
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
                          右上の追加ボタンから、企業情報を追加してみましょう！
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
                        <h3 className="text-base/7 font-semibold">
                          {analysis.title === 'タイトルを自由に記入する'
                            ? analysis.customtitle ||
                              'タイトルを自由に記入するが設定されていません。'
                            : analysis.title}
                        </h3>
                        <div className="flex ml-auto items-start">
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
                      <div className="px-4 py-3 sm:px-6 border-t border-gray-300">
                        <p className="whitespace-pre-wrap">
                          {formatDescription(analysis.description)}
                        </p>
                        <p className="flex justify-end text-sm mt-1">
                          {analysis.description.replace(/\s/g, '').length} 文字
                        </p>
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
                className="m-auto text-gray-700 relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
              >
                <form onSubmit={handleSubmit(handleAddAnalysis)}>
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:size-10">
                        <PlusIcon aria-hidden="true" className="size-6 text-blue-500" />
                      </div>
                      <div className="mt-2 text-center sm:ml-4 sm:text-left">
                        <Dialog.Title as="h1" className={`text-base font-bold leading-6`}>
                          企業情報を追加
                        </Dialog.Title>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="mb-4">
                        <select
                          {...register('titleId', { required: 'タイトルを選択してください' })}
                          style={{ height: '42px' }}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value === '1') {
                              setIsCustom(true);
                            } else {
                              setIsCustom(false);
                            }
                          }}
                          className={`cursor-pointer block w-full rounded-md border py-2 pl-3 pr-3 sm:text-sm sm:leading-6 border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none`}
                        >
                          <option value="">タイトルを選択</option>
                          {analysisTitles
                            .filter((title) => {
                              if (title.id === 1) {
                                return true;
                              }
                              return !analyses.some((analysis) => analysis.title === title.title);
                            })
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

                      <div className="mb-4 flex">
                        <label>
                          <input
                            type="checkbox"
                            checked={isCustom}
                            onChange={(e) => {
                              const isChecked = e.target.checked;
                              setIsCustom(isChecked);
                              if (isChecked) {
                                reset({ titleId: '1' });
                              } else {
                                reset({ titleId: '' });
                              }
                            }}
                            className="mr-2 cursor-pointer"
                          />
                          タイトルを自由に記入する
                        </label>
                      </div>

                      {isCustom && (
                        <div className="mb-4">
                          <input
                            {...register('customtitle', { required: 'タイトルを入力してください' })}
                            placeholder="タイトル"
                            className={`block w-full rounded-md border py-2 pl-3 pr-3 sm:text-sm sm:leading-6 border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none placeholder:text-gray-500`}
                          />
                          {errors.customtitle && (
                            <p className="text-red-500 mt-1 text-left">
                              {errors.customtitle.message}
                            </p>
                          )}
                        </div>
                      )}

                      <div className="mb-4">
                        <textarea
                          {...register('description', { required: '内容を入力してください' })}
                          placeholder="内容"
                          rows={10}
                          className="w-full rounded-md border border-gray-300 p-2 placeholder:text-gray-500 focus:border-2 focus:border-blue-500 focus:outline-none"
                          onChange={(e) =>
                            setDescriptionLength(e.target.value.replace(/\s/g, '').length)
                          }
                        />
                        <p className="flex justify-end text-sm mt-1">{descriptionLength} 文字</p>
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
                        setIsCustom(false);
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
                className="m-auto text-gray-700 relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
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
                        <select
                          {...register('titleId', { required: 'タイトルを選択してください' })}
                          value={editData.titleId}
                          style={{ height: '42px' }}
                          onChange={(e) => {
                            const value = e.target.value;
                            setEditData({ ...editData, titleId: value });
                            if (value === '1') {
                              setEditIsCustom(true);
                            } else {
                              setEditIsCustom(false);
                            }
                          }}
                          className={`cursor-pointer block w-full rounded-md border py-2.5 pl-3 pr-3 sm:text-sm sm:leading-6 border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none placeholder:text-gray-500`}
                        >
                          <option value="">タイトルを選択</option>
                          {analysisTitles
                            .filter((title) => {
                              if (title.id === 1) {
                                return true;
                              }
                              const isCurrentTitle = title.id.toString() === editData.titleId;
                              const isUsedTitle = analyses.some(
                                (analysis) => analysis.title === title.title,
                              );
                              return isCurrentTitle || !isUsedTitle;
                            })
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

                      <div className="mb-4 flex">
                        <label>
                          <input
                            type="checkbox"
                            checked={isEditCustom}
                            onChange={(e) => {
                              const isEditChecked = e.target.checked;
                              setEditIsCustom(isEditChecked);
                              if (isEditChecked) {
                                setEditData((prev) => ({ ...prev, titleId: '1' }));
                              } else {
                                const defaultTitleId = analysisTitles
                                  .find((t) => t.title === initialEditTitle)
                                  ?.id.toString();

                                setEditData((prev) => ({
                                  ...prev,
                                  titleId: defaultTitleId || '',
                                  customtitle: '',
                                }));
                              }
                            }}
                            className="mr-2 cursor-pointer"
                          />
                          タイトルを自由に記入する
                        </label>
                      </div>

                      {isEditCustom && (
                        <div className="mb-4">
                          <input
                            {...register('customtitle', { required: 'タイトルを入力してください' })}
                            onChange={(e) => {
                              const value = e.target.value;
                              setEditData({ ...editData, customtitle: value });
                            }}
                            placeholder="タイトル"
                            className={`block w-full rounded-md border py-2 pl-3 pr-3 sm:text-sm sm:leading-6 border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none placeholder:text-gray-500`}
                          />
                          {errors.customtitle && (
                            <p className="text-red-500 mt-1 text-left">
                              {errors.customtitle.message}
                            </p>
                          )}
                        </div>
                      )}

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
                          className="w-full rounded-md border border-gray-300 p-2 placeholder:text-gray-500 focus:border-2 focus:border-blue-500 focus:outline-none"
                        />
                        <p className="flex justify-end text-sm mt-1">
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
                        setEditIsCustom(false);
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
                className="m-auto text-gray-700 relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
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
