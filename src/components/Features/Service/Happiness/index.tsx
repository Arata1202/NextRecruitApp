'use client';

import { Fragment, useEffect, useMemo, useState } from 'react';
import {
  ExclamationTriangleIcon,
  FaceSmileIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import { Dialog, Transition, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import AdUnit from '@/components/ThirdParties/GoogleAdSense/Elements/AdUnit';
import { useMutationObserver } from '@/hooks/useMutationObserver';
import { supabase } from '@/libs/supabase';

const MIN_AGE = 0;
const MAX_AGE = 30;
const MIN_SCORE = -10;
const MAX_SCORE = 10;

const AGE_OPTIONS = Array.from({ length: MAX_AGE + 1 }, (_, index) => index);
const SCORE_OPTIONS = Array.from(
  { length: MAX_SCORE - MIN_SCORE + 1 },
  (_, index) => MIN_SCORE + index,
);

type HappinessRow = {
  age: number;
  happinessScore: number | null;
  reason: string;
};

type HappinessEntry = {
  age: number;
  happiness_score: number;
  reason: string | null;
};

type Draft = {
  age: string;
  happinessScore: string;
  reason: string;
};

type SortOrder = 'age-asc' | 'age-desc' | 'score-desc' | 'score-asc';

const EMPTY_DRAFT: Draft = {
  age: '',
  happinessScore: '',
  reason: '',
};

const parseAge = (value: string) => {
  const parsed = Number(value);
  if (!Number.isInteger(parsed)) return null;
  if (parsed < MIN_AGE || parsed > MAX_AGE) return null;
  return parsed;
};

const parseScore = (value: string) => {
  const parsed = Number(value);
  if (!Number.isInteger(parsed)) return null;
  if (parsed < MIN_SCORE || parsed > MAX_SCORE) return null;
  return parsed;
};

const formatDbError = (message: string) => {
  if (message.includes('relation') || message.includes('happiness_entries')) {
    return 'DBテーブルが未作成です。supabase/sql/20260209_create_happiness_tables.sql を実行してください。';
  }
  return `保存に失敗しました: ${message}`;
};

export default function HappinessFeature() {
  useMutationObserver();

  const [userId, setUserId] = useState<string | null>(null);
  const [rows, setRows] = useState<HappinessRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('age-asc');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [addDraft, setAddDraft] = useState<Draft>(EMPTY_DRAFT);
  const [editDraft, setEditDraft] = useState<Draft>(EMPTY_DRAFT);
  const [editTargetAge, setEditTargetAge] = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<HappinessRow | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session?.user?.id) {
        setError('ユーザー情報を取得できませんでした。再ログインしてください。');
        setLoading(false);
        return;
      }

      const uid = session.user.id;
      setUserId(uid);

      const { data: entryData, error: entryError } = await supabase
        .from('happiness_entries')
        .select('age, happiness_score, reason')
        .eq('user_id', uid)
        .order('age', { ascending: true })
        .returns<HappinessEntry[]>();

      if (entryError) {
        setError(formatDbError(entryError.message));
        setLoading(false);
        return;
      }

      const entries = entryData || [];
      setRows(
        entries.map((entry) => ({
          age: entry.age,
          happinessScore: entry.happiness_score,
          reason: entry.reason ?? '',
        })),
      );
      setLoading(false);
    };

    fetchData();
  }, []);

  const filteredRows = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const matched = normalizedSearch
      ? rows.filter((row) => {
          const ageText = `${row.age}歳`;
          const reasonText = row.reason || '';

          return (
            ageText.toLowerCase().includes(normalizedSearch) ||
            reasonText.toLowerCase().includes(normalizedSearch)
          );
        })
      : rows;

    return [...matched].sort((a, b) => {
      if (sortOrder === 'age-asc') return a.age - b.age;
      if (sortOrder === 'age-desc') return b.age - a.age;

      const scoreA = a.happinessScore ?? -999;
      const scoreB = b.happinessScore ?? -999;
      if (sortOrder === 'score-desc') return scoreB - scoreA;
      return scoreA - scoreB;
    });
  }, [rows, searchTerm, sortOrder]);

  const usedAges = useMemo(() => new Set(rows.map((row) => row.age)), [rows]);
  const addAgeOptions = useMemo(() => AGE_OPTIONS.filter((age) => !usedAges.has(age)), [usedAges]);
  const editAgeOptions = useMemo(() => {
    if (editTargetAge === null) return addAgeOptions;
    return AGE_OPTIONS.filter((age) => age === editTargetAge || !usedAges.has(age));
  }, [editTargetAge, usedAges, addAgeOptions]);

  const openAddModal = () => {
    setAddDraft(EMPTY_DRAFT);
    setIsAddModalOpen(true);
  };

  const openEditModal = (row: HappinessRow) => {
    setEditTargetAge(row.age);
    setEditDraft({
      age: String(row.age),
      happinessScore: row.happinessScore === null ? '' : String(row.happinessScore),
      reason: row.reason,
    });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (row: HappinessRow) => {
    setDeleteTarget(row);
    setIsDeleteModalOpen(true);
  };

  const handleAdd = async () => {
    if (!userId) {
      setError('ユーザー情報が見つかりません。再ログインしてください。');
      return;
    }

    const parsedAge = parseAge(addDraft.age);
    if (parsedAge === null) {
      setError(`年齢は ${MIN_AGE}〜${MAX_AGE} の範囲で選択してください。`);
      return;
    }

    const parsedScore = parseScore(addDraft.happinessScore);
    if (parsedScore === null) {
      setError(`幸福度は ${MIN_SCORE}〜${MAX_SCORE} の範囲で選択してください。`);
      return;
    }

    if (rows.some((row) => row.age === parsedAge)) {
      setError('その年齢はすでに登録されています。編集から変更してください。');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const { error: insertError } = await supabase.from('happiness_entries').insert({
        user_id: userId,
        age: parsedAge,
        happiness_score: parsedScore,
        reason: addDraft.reason.trim() || null,
      });

      if (insertError) {
        throw new Error(formatDbError(insertError.message));
      }

      setRows((prev) => [
        ...prev,
        {
          age: parsedAge,
          happinessScore: parsedScore,
          reason: addDraft.reason,
        },
      ]);
      setIsAddModalOpen(false);
    } catch (saveError) {
      if (saveError instanceof Error) {
        setError(saveError.message);
      } else {
        setError('保存に失敗しました。');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async () => {
    if (!userId || editTargetAge === null) {
      setError('編集対象が見つかりません。');
      return;
    }

    const parsedAge = parseAge(editDraft.age);
    if (parsedAge === null) {
      setError(`年齢は ${MIN_AGE}〜${MAX_AGE} の範囲で選択してください。`);
      return;
    }

    const parsedScore = parseScore(editDraft.happinessScore);
    if (parsedScore === null) {
      setError(`幸福度は ${MIN_SCORE}〜${MAX_SCORE} の範囲で選択してください。`);
      return;
    }

    if (parsedAge !== editTargetAge && rows.some((row) => row.age === parsedAge)) {
      setError('変更先の年齢はすでに登録されています。');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const { error: upsertError } = await supabase.from('happiness_entries').upsert(
        {
          user_id: userId,
          age: parsedAge,
          happiness_score: parsedScore,
          reason: editDraft.reason.trim() || null,
        },
        { onConflict: 'user_id,age' },
      );

      if (upsertError) {
        throw new Error(formatDbError(upsertError.message));
      }

      if (parsedAge !== editTargetAge) {
        const { error: deleteOldError } = await supabase
          .from('happiness_entries')
          .delete()
          .eq('user_id', userId)
          .eq('age', editTargetAge);

        if (deleteOldError) {
          throw new Error(formatDbError(deleteOldError.message));
        }
      }

      setRows((prev) => {
        const next = prev.filter((row) => row.age !== editTargetAge && row.age !== parsedAge);
        return [
          ...next,
          {
            age: parsedAge,
            happinessScore: parsedScore,
            reason: editDraft.reason,
          },
        ];
      });

      setIsEditModalOpen(false);
      setEditTargetAge(null);
    } catch (saveError) {
      if (saveError instanceof Error) {
        setError(saveError.message);
      } else {
        setError('保存に失敗しました。');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!userId || !deleteTarget) return;

    setSaving(true);
    setError('');

    try {
      const { error: deleteError } = await supabase
        .from('happiness_entries')
        .delete()
        .eq('user_id', userId)
        .eq('age', deleteTarget.age);

      if (deleteError) {
        throw new Error(formatDbError(deleteError.message));
      }

      setRows((prev) => prev.filter((row) => row.age !== deleteTarget.age));
      setIsDeleteModalOpen(false);
      setDeleteTarget(null);
    } catch (deleteError) {
      if (deleteError instanceof Error) {
        setError(deleteError.message);
      } else {
        setError('削除に失敗しました。');
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="lg:pl-72 mut-guard">
        <main className="h-screen bg-gray-100 mut-guard" />
      </div>
    );
  }

  return (
    <>
      <div className="lg:pl-72 mut-guard">
        <main className="h-screen mut-guard">
          <div className="bg-white px-4 sm:px-6 lg:px-8 MobileHeader">
            <div className="flex items-center justify-between TitleBanner">
              <div className="min-w-0 flex-1">
                <div className="flex">
                  <FaceSmileIcon className="TitleIcon mr-1" aria-hidden="true" />
                  <h2 className="text-2xl/7 font-bold sm:truncate sm:text-3xl sm:tracking-tight">
                    幸福度
                  </h2>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  年齢ごとの幸福度と理由を記録して、これまでの自分を振り返るために活用します。
                </p>
              </div>
              <div className="ml-4 mt-0 flex">
                <button
                  type="button"
                  onClick={openAddModal}
                  className="ml-3 inline-flex items-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600"
                >
                  追加
                </button>
              </div>
            </div>

            <div className="pb-5 flex">
              <div className="w-2/3 Search relative rounded-md shadow-sm">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="検索"
                  className="block w-full rounded-md border py-2 pl-3 pr-3 sm:text-sm sm:leading-6 border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none placeholder:text-gray-500"
                />
              </div>
              <div className="w-1/3 ml-2">
                <select
                  value={sortOrder}
                  onChange={(event) => setSortOrder(event.target.value as SortOrder)}
                  className="cursor-pointer block w-full h-full rounded-md border py-2.5 pl-3 pr-3 sm:text-sm sm:leading-6 border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none"
                >
                  <option value="age-asc">年齢の低い順</option>
                  <option value="age-desc">年齢の高い順</option>
                  <option value="score-desc">幸福度の高い順</option>
                  <option value="score-asc">幸福度の低い順</option>
                </select>
              </div>
            </div>
          </div>

          <div
            className="px-4 sm:px-6 lg:px-8 mt-5 bg-gray-100 mut-guard"
            style={{
              paddingBottom: `calc(40px + env(safe-area-inset-bottom))`,
            }}
          >
            {error && <p className="mb-4 text-sm font-semibold text-red-500">{error}</p>}

            {filteredRows.length === 0 ? (
              <div className="overflow-hidden bg-white shadow rounded-lg mb-5">
                <div>
                  <div className="px-4 py-3 sm:px-6 flex">
                    <h3 className="text-base/7 font-semibold">データがありません。</h3>
                  </div>
                  <div className="px-4 py-3 sm:px-6 border-t border-gray-300">
                    <p className="whitespace-pre-wrap">
                      右上の追加ボタンから、カードを追加してみましょう！
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              filteredRows.map((row) => (
                <div key={row.age} className="overflow-hidden bg-white shadow rounded-lg mb-5">
                  <div>
                    <div className="px-4 py-3 sm:px-6 flex items-center">
                      <h3 className="text-base/7 font-semibold">{row.age}歳</h3>
                      <span
                        className={`ml-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          row.happinessScore === null
                            ? 'bg-gray-100 text-gray-500'
                            : row.happinessScore > 0
                              ? 'bg-green-100 text-green-700'
                              : row.happinessScore === 0
                                ? 'bg-slate-100 text-slate-600'
                                : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {row.happinessScore === null
                          ? '未入力'
                          : row.happinessScore > 0
                            ? `+${row.happinessScore}`
                            : row.happinessScore}
                      </span>
                      <div className="flex ml-auto items-start">
                        <button
                          type="button"
                          onClick={() => openEditModal(row)}
                          className="ml-3 hover:text-blue-500"
                        >
                          <PencilIcon className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() => openDeleteModal(row)}
                          className="ml-3 hover:text-blue-500"
                        >
                          <TrashIcon className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    <div className="px-4 py-3 sm:px-6 border-t border-gray-300">
                      <p className="whitespace-pre-wrap">{row.reason || '内容は未入力です。'}</p>
                    </div>
                  </div>
                </div>
              ))
            )}

            <AdUnit slot="7998948559" style={{ marginBottom: '1.25rem' }} />
          </div>
        </main>
      </div>

      <Transition.Root show={isAddModalOpen} as={Fragment}>
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
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:size-10">
                      <PlusIcon aria-hidden="true" className="size-6 text-blue-500" />
                    </div>
                    <div className="mt-2 text-center sm:ml-4 sm:text-left">
                      <DialogTitle as="h1" className="text-base font-bold leading-6">
                        追加
                      </DialogTitle>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="mb-4">
                      <select
                        value={addDraft.age}
                        onChange={(event) =>
                          setAddDraft((prev) => ({ ...prev, age: event.target.value }))
                        }
                        className="cursor-pointer block w-full rounded-md border py-2 pl-3 pr-3 sm:text-sm sm:leading-6 border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none"
                        disabled={addAgeOptions.length === 0}
                      >
                        <option value="">年齢を選択</option>
                        {addAgeOptions.map((age) => (
                          <option key={age} value={age}>
                            {age}歳
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-4">
                      <select
                        value={addDraft.happinessScore}
                        onChange={(event) =>
                          setAddDraft((prev) => ({ ...prev, happinessScore: event.target.value }))
                        }
                        className="cursor-pointer block w-full rounded-md border py-2 pl-3 pr-3 sm:text-sm sm:leading-6 border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none"
                      >
                        <option value="">幸福度を選択</option>
                        {SCORE_OPTIONS.map((score) => (
                          <option key={score} value={score}>
                            {score > 0 ? `+${score}` : score}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-4">
                      <textarea
                        rows={6}
                        value={addDraft.reason}
                        onChange={(event) =>
                          setAddDraft((prev) => ({ ...prev, reason: event.target.value }))
                        }
                        className="w-full rounded-md border border-gray-300 p-3 text-sm focus:border-2 focus:border-blue-500 focus:outline-none"
                        placeholder="内容"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-3 grid grid-flow-row-dense grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddModalOpen(false);
                      setAddDraft(EMPTY_DRAFT);
                    }}
                    className="DialogButton mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    disabled={saving}
                  >
                    キャンセル
                  </button>
                  <button
                    type="button"
                    onClick={handleAdd}
                    className="inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 sm:ml-3 sm:w-auto"
                    disabled={saving || addAgeOptions.length === 0}
                  >
                    追加
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

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
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:size-10">
                      <PencilIcon aria-hidden="true" className="size-6 text-blue-500" />
                    </div>
                    <div className="mt-2 text-center sm:ml-4 sm:text-left">
                      <DialogTitle as="h1" className="text-base font-bold leading-6">
                        {editTargetAge !== null
                          ? `「${editTargetAge}歳」を編集`
                          : '「タイトル」を編集'}
                      </DialogTitle>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="mb-4">
                      <select
                        value={editDraft.age}
                        onChange={(event) =>
                          setEditDraft((prev) => ({
                            ...prev,
                            age: event.target.value,
                          }))
                        }
                        className="cursor-pointer block w-full rounded-md border py-2 pl-3 pr-3 sm:text-sm sm:leading-6 border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none"
                      >
                        <option value="">年齢を選択</option>
                        {editAgeOptions.map((age) => (
                          <option key={age} value={age}>
                            {age}歳
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-4">
                      <select
                        value={editDraft.happinessScore}
                        onChange={(event) =>
                          setEditDraft((prev) => ({ ...prev, happinessScore: event.target.value }))
                        }
                        className="cursor-pointer block w-full rounded-md border py-2 pl-3 pr-3 sm:text-sm sm:leading-6 border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none"
                      >
                        <option value="">幸福度を選択</option>
                        {SCORE_OPTIONS.map((score) => (
                          <option key={score} value={score}>
                            {score > 0 ? `+${score}` : score}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-4">
                      <textarea
                        rows={6}
                        value={editDraft.reason}
                        onChange={(event) =>
                          setEditDraft((prev) => ({
                            ...prev,
                            reason: event.target.value,
                          }))
                        }
                        className="w-full rounded-md border border-gray-300 p-3 text-sm focus:border-2 focus:border-blue-500 focus:outline-none"
                        placeholder="内容"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-3 grid grid-flow-row-dense grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setEditTargetAge(null);
                      setEditDraft(EMPTY_DRAFT);
                    }}
                    className="DialogButton mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    disabled={saving}
                  >
                    キャンセル
                  </button>
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 sm:ml-3 sm:w-auto"
                    disabled={saving}
                  >
                    編集
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

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
                    <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" />
                  </div>
                  <div className="mt-2 text-center sm:ml-4 sm:text-left">
                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                      {deleteTarget
                        ? `「${deleteTarget.age}歳」を削除しますか？`
                        : '「タイトル」を削除しますか？'}
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">操作は取り消すことができません。</p>
                    </div>
                  </div>
                </div>
                <div className="mt-3 grid grid-flow-row-dense grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsDeleteModalOpen(false);
                      setDeleteTarget(null);
                    }}
                    className="DialogButton mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    disabled={saving}
                  >
                    キャンセル
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    disabled={saving}
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
