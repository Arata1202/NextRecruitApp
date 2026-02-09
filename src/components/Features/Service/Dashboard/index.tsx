'use client';

import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';
import { format, isSameDay, addDays, subHours } from 'date-fns';
import AdUnit from '@/components/ThirdParties/GoogleAdSense/Elements/AdUnit';
import { useMutationObserver } from '@/hooks/useMutationObserver';
import { ja } from 'date-fns/locale';
import { supabase } from '@/libs/supabase';
import { useRouter } from 'next/navigation';

interface EventData {
  started_at: string;
  ended_at: string;
  description: string;
  customtitle: string;
  title_id: number;
  selection: {
    id: string;
    title: string;
  };
  selectionflowtitle: {
    title: string;
  };
}

export default function DashBoardFeature() {
  useMutationObserver();
  const [currentDate, setCurrentDate] = useState('');
  const [tomorrowDate, setTomorrowDate] = useState('');
  const [dayAfterTomorrowDate, setDayAfterTomorrowDate] = useState('');
  const [todayEvents, setTodayEvents] = useState<EventData[]>([]);
  const [tomorrowEvents, setTomorrowEvents] = useState<EventData[]>([]);
  const [dayAfterTomorrowEvents, setDayAfterTomorrowEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const now = new Date();
    const tomorrow = addDays(now, 1);
    const dayAfterTomorrow = addDays(now, 2);
    setCurrentDate(format(now, 'M月d日（EEE）', { locale: ja }));
    setTomorrowDate(format(tomorrow, 'M月d日（EEE）', { locale: ja }));
    setDayAfterTomorrowDate(format(dayAfterTomorrow, 'M月d日（EEE）', { locale: ja }));

    const fetchEvents = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error('Error fetching user:', userError || 'User not logged in');
        return;
      }

      const { data, error } = await supabase
        .from('selectionflow')
        .select(
          `
          started_at,
          ended_at,
          title_id,
          description,
          customtitle,
          selection (
            id,
            title
          ),
          selectionflowtitle (
            title
          )
        `,
        )
        .eq('selection.supabaseauth_id', user.id);

      if (error) {
        console.error('Error fetching events:', error);
        return;
      }

      const events = data as unknown as EventData[];
      const today = new Date();
      const tomorrow = addDays(today, 1);
      const dayAfterTomorrow = addDays(today, 2);

      const filteredTodayEvents = events
        .filter((event) => {
          const eventStart = event.started_at ? subHours(new Date(event.started_at), 9) : null;
          const eventEnd = subHours(new Date(event.ended_at), 9);
          return (
            (eventStart && isSameDay(eventStart, today)) ||
            (!eventStart && isSameDay(eventEnd, today)) ||
            (eventStart && eventStart < today && eventEnd >= today) ||
            isSameDay(eventEnd, today)
          );
        })
        .sort((a, b) => {
          const dateA = a.started_at
            ? new Date(a.started_at).getTime()
            : new Date(a.ended_at).getTime();
          const dateB = b.started_at
            ? new Date(b.started_at).getTime()
            : new Date(b.ended_at).getTime();
          return dateA - dateB;
        });

      const filteredTomorrowEvents = events
        .filter((event) => {
          const eventStart = event.started_at ? subHours(new Date(event.started_at), 9) : null;
          const eventEnd = subHours(new Date(event.ended_at), 9);
          return (
            (eventStart && isSameDay(eventStart, tomorrow)) ||
            (!eventStart && isSameDay(eventEnd, tomorrow)) ||
            (eventStart && eventStart < tomorrow && eventEnd >= tomorrow) ||
            isSameDay(eventEnd, tomorrow)
          );
        })
        .sort((a, b) => {
          const dateA = a.started_at
            ? new Date(a.started_at).getTime()
            : new Date(a.ended_at).getTime();
          const dateB = b.started_at
            ? new Date(b.started_at).getTime()
            : new Date(b.ended_at).getTime();
          return dateA - dateB;
        });

      const filteredDayAfterTomorrowEvents = events
        .filter((event) => {
          const eventStart = event.started_at ? subHours(new Date(event.started_at), 9) : null;
          const eventEnd = subHours(new Date(event.ended_at), 9);
          return (
            (eventStart && isSameDay(eventStart, dayAfterTomorrow)) ||
            (!eventStart && isSameDay(eventEnd, dayAfterTomorrow)) ||
            (eventStart && eventStart < dayAfterTomorrow && eventEnd >= dayAfterTomorrow) ||
            isSameDay(eventEnd, dayAfterTomorrow)
          );
        })
        .sort((a, b) => {
          const dateA = a.started_at
            ? new Date(a.started_at).getTime()
            : new Date(a.ended_at).getTime();
          const dateB = b.started_at
            ? new Date(b.started_at).getTime()
            : new Date(b.ended_at).getTime();
          return dateA - dateB;
        });

      setTodayEvents(filteredTodayEvents);
      setTomorrowEvents(filteredTomorrowEvents);
      setDayAfterTomorrowEvents(filteredDayAfterTomorrowEvents);
      setTimeout(() => {
        setLoading(false);
      }, 100);
    };

    fetchEvents();
  }, []);

  const handleIconClick = (id: string) => {
    router.push(`/service/selection/flow?id=${id}`);
  };

  const renderEventsForAllDays = () => {
    const validTodayEvents = todayEvents.filter(
      (event) => event.selection && event.selection.title,
    );
    const validTomorrowEvents = tomorrowEvents.filter(
      (event) => event.selection && event.selection.title,
    );
    const validDayAfterTomorrowEvents = dayAfterTomorrowEvents.filter(
      (event) => event.selection && event.selection.title,
    );

    const hasAnyEvents =
      validTodayEvents.length > 0 ||
      validTomorrowEvents.length > 0 ||
      validDayAfterTomorrowEvents.length > 0;

    // 3日間すべてでイベントがない場合
    if (!hasAnyEvents) {
      return (
        <div className="px-4 sm:px-6 lg:px-8 bg-gray-100 pb-5 mt-5">
          <div className="overflow-hidden bg-white shadow rounded-lg mt-5">
            <div>
              <div className="px-4 py-3 sm:px-6 flex">
                <h3 className="text-base/7 font-semibold">データがありません。</h3>
              </div>
              <div className="px-4 py-3 sm:px-6 border-t border-gray-300">
                <p className="whitespace-pre-wrap">
                  企業管理の選考状況から、予定を追加してみましょう！
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // イベントがある日のみ表示
    return (
      <>
        {validTodayEvents.length > 0 && (
          <div className="px-4 sm:px-6 lg:px-8 bg-gray-100 pb-5 mt-5">
            <div className="md:flex md:items-center md:justify-between">
              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-bold sm:truncate sm:text-2xl sm:tracking-tight">
                  本日 {currentDate}
                </h2>
              </div>
            </div>
            {validTodayEvents.map((event, index) => (
              <div key={index} className="overflow-hidden bg-white shadow rounded-lg mt-5">
                <div>
                  <div className="px-4 py-3 sm:px-6 flex justify-between items-start">
                    <h3 className="text-base/7 font-semibold">
                      {event.selection?.title || '未設定'} -{' '}
                      {event.title_id === 1
                        ? event.customtitle || '未設定'
                        : event.selectionflowtitle?.title || '未設定'}
                    </h3>
                    <button
                      type="button"
                      onClick={() => handleIconClick(event.selection.id)}
                      className="ml-3 inline-flex items-center rounded-md bg-blue-500 hover:bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm flex-shrink-0"
                    >
                      詳細
                    </button>
                  </div>
                  <div className="px-4 py-3 sm:px-6 border-t border-gray-300">
                    <p className="whitespace-pre-wrap">{event.description}</p>
                    <div className="text-sm mt-2">
                      {event.started_at && (
                        <p>
                          開始：{' '}
                          {format(subHours(new Date(event.started_at), 9), 'yyyy年MM月dd日 HH:mm')}
                        </p>
                      )}
                      <p>
                        {event.started_at ? '終了： ' : '締切： '}
                        {format(subHours(new Date(event.ended_at), 9), 'yyyy年MM月dd日 HH:mm')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {validTomorrowEvents.length > 0 && (
          <div className="px-4 sm:px-6 lg:px-8 bg-gray-100 pb-5 mt-5">
            <div className="md:flex md:items-center md:justify-between">
              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-bold sm:truncate sm:text-2xl sm:tracking-tight">
                  明日 {tomorrowDate}
                </h2>
              </div>
            </div>
            {validTomorrowEvents.map((event, index) => (
              <div key={index} className="overflow-hidden bg-white shadow rounded-lg mt-5">
                <div>
                  <div className="px-4 py-3 sm:px-6 flex justify-between items-start">
                    <h3 className="text-base/7 font-semibold">
                      {event.selection?.title || '未設定'} -{' '}
                      {event.title_id === 1
                        ? event.customtitle || '未設定'
                        : event.selectionflowtitle?.title || '未設定'}
                    </h3>
                    <button
                      type="button"
                      onClick={() => handleIconClick(event.selection.id)}
                      className="ml-3 inline-flex items-center rounded-md bg-blue-500 hover:bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm flex-shrink-0"
                    >
                      詳細
                    </button>
                  </div>
                  <div className="px-4 py-3 sm:px-6 border-t border-gray-300">
                    <p className="whitespace-pre-wrap">{event.description}</p>
                    <div className="text-sm mt-2">
                      {event.started_at && (
                        <p>
                          開始：{' '}
                          {format(subHours(new Date(event.started_at), 9), 'yyyy年MM月dd日 HH:mm')}
                        </p>
                      )}
                      <p>
                        {event.started_at ? '終了： ' : '締切： '}
                        {format(subHours(new Date(event.ended_at), 9), 'yyyy年MM月dd日 HH:mm')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {validDayAfterTomorrowEvents.length > 0 && (
          <div className="px-4 sm:px-6 lg:px-8 bg-gray-100 pb-5 mt-5">
            <div className="md:flex md:items-center md:justify-between">
              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-bold sm:truncate sm:text-2xl sm:tracking-tight">
                  明後日 {dayAfterTomorrowDate}
                </h2>
              </div>
            </div>
            {validDayAfterTomorrowEvents.map((event, index) => (
              <div key={index} className="overflow-hidden bg-white shadow rounded-lg mt-5">
                <div>
                  <div className="px-4 py-3 sm:px-6 flex justify-between items-start">
                    <h3 className="text-base/7 font-semibold">
                      {event.selection?.title || '未設定'} -{' '}
                      {event.title_id === 1
                        ? event.customtitle || '未設定'
                        : event.selectionflowtitle?.title || '未設定'}
                    </h3>
                    <button
                      type="button"
                      onClick={() => handleIconClick(event.selection.id)}
                      className="ml-3 inline-flex items-center rounded-md bg-blue-500 hover:bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm flex-shrink-0"
                    >
                      詳細
                    </button>
                  </div>
                  <div className="px-4 py-3 sm:px-6 border-t border-gray-300">
                    <p className="whitespace-pre-wrap">{event.description}</p>
                    <div className="text-sm mt-2">
                      {event.started_at && (
                        <p>
                          開始：{' '}
                          {format(subHours(new Date(event.started_at), 9), 'yyyy年MM月dd日 HH:mm')}
                        </p>
                      )}
                      <p>
                        {event.started_at ? '終了： ' : '締切： '}
                        {format(subHours(new Date(event.ended_at), 9), 'yyyy年MM月dd日 HH:mm')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    );
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
                      <InformationCircleIcon className="TitleIcon mr-1" aria-hidden="true" />
                      <h2 className="text-2xl/7 font-bold sm:truncate sm:text-3xl sm:tracking-tight">
                        就活イベント
                      </h2>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      就活の予定と期限を一覧で確認し、今日やるべきことを把握するために活用します。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="FirstAd mb-5 mt-5 px-4 sm:px-6 lg:px-8">
              <Display slot="3381880848" />
            </div> */}
            {/* イベント表示 */}
            {loading ? <></> : <>{renderEventsForAllDays()}</>}

            {loading ? (
              <></>
            ) : (
              <div
                className="FirstAd bg-gray-100 px-4 sm:px-6 lg:px-8 mut-guard"
                style={{
                  paddingBottom: `calc(60px + env(safe-area-inset-bottom))`,
                }}
              >
                <AdUnit slot="7998948559" />
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
