'use client';

import MainLayout from '@/components/Service/Layouts/MainLayout';
import { ChartPieIcon, DocumentTextIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';
import { format, isSameDay, addDays, subHours } from 'date-fns';
import { ja } from 'date-fns/locale';
import { supabase } from '@/libs/supabase';
import { useRouter } from 'next/navigation';

interface EventData {
  started_at: string;
  ended_at: string;
  description: string;
  selection: {
    id: string;
    title: string;
  };
  selectionflowtitle: {
    title: string;
  };
}

export default function DashBoard() {
  const [currentDate, setCurrentDate] = useState('');
  const [tomorrowDate, setTomorrowDate] = useState('');
  const [todayEvents, setTodayEvents] = useState<EventData[]>([]);
  const [tomorrowEvents, setTomorrowEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const now = subHours(new Date(), 9);
    const tomorrow = addDays(now, 1);

    setCurrentDate(format(now, 'M月d日（EEE）', { locale: ja }));
    setTomorrowDate(format(tomorrow, 'M月d日（EEE）', { locale: ja }));

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
          description,
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

      const filteredTodayEvents = events
        .filter((event) => {
          const eventStart = subHours(new Date(event.started_at), 9);
          const eventEnd = subHours(new Date(event.ended_at), 9);
          return isSameDay(eventStart, today) || (eventStart < today && eventEnd >= today);
        })
        .sort((a, b) => new Date(a.started_at).getTime() - new Date(b.started_at).getTime());

      const filteredTomorrowEvents = events
        .filter((event) => {
          const eventStart = subHours(new Date(event.started_at), 9);
          const eventEnd = subHours(new Date(event.ended_at), 9);
          return isSameDay(eventStart, tomorrow) || (eventStart < tomorrow && eventEnd >= tomorrow);
        })
        .sort((a, b) => new Date(a.started_at).getTime() - new Date(b.started_at).getTime());

      setTodayEvents(filteredTodayEvents);
      setTomorrowEvents(filteredTomorrowEvents);
      setTimeout(() => {
        setLoading(false);
      }, 100);
    };

    fetchEvents();
  }, []);

  const handleIconClick = (id: string) => {
    router.push(`/service/selection/${id}/flow`);
  };

  const renderTodayEvents = () => {
    const validTodayEvents = todayEvents.filter(
      (event) => event.selection && event.selection.title,
    );

    if (validTodayEvents.length > 0) {
      return validTodayEvents.map((event, index) => (
        <div key={index} className="overflow-hidden bg-white shadow sm:rounded-lg mb-5 mt-5">
          <div>
            <div className="px-4 py-3 sm:px-6 flex">
              <h3 className="text-base/7 font-semibold">
                {event.selection?.title || '未設定'} - {event.selectionflowtitle?.title || '未設定'}
              </h3>
              <div className="flex ml-auto">
                <button
                  type="button"
                  className="hover:text-blue-500"
                  onClick={() => handleIconClick(event.selection.id)}
                >
                  <DocumentTextIcon className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="px-4 py-3 sm:px-6 border-t border-gray-300">
              <p className="whitespace-pre-wrap">{event.description}</p>
              <div className="text-sm mt-2">
                <p>
                  開始： {format(subHours(new Date(event.started_at), 9), 'yyyy年MM月dd日 HH:mm')}
                </p>
                <p>終了：{format(subHours(new Date(event.ended_at), 9), 'yyyy年MM月dd日 HH:mm')}</p>
              </div>
            </div>
          </div>
        </div>
      ));
    }
    return (
      <div className="mt-5">
        <div className="overflow-hidden bg-white shadow sm:rounded-lg mb-5 mt-5">
          <div>
            <div className="px-4 py-3 sm:px-6 flex">
              <h3 className="text-base/7 font-semibold">本日の予定はありません。</h3>
            </div>
            <div className="px-4 py-3 sm:px-6 border-t border-gray-300">
              <p className="whitespace-pre-wrap">のんびりとした1日をお過ごしください！</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTomorrowEvents = () => {
    const validTomorrowEvents = tomorrowEvents.filter(
      (event) => event.selection && event.selection.title,
    );

    if (validTomorrowEvents.length > 0) {
      return validTomorrowEvents.map((event, index) => (
        <div key={index} className="overflow-hidden bg-white shadow sm:rounded-lg mb-5 mt-5">
          <div>
            <div className="px-4 py-3 sm:px-6 flex">
              <h3 className="text-base/7 font-semibold">
                {event.selection?.title || '未設定'} - {event.selectionflowtitle?.title || '未設定'}
              </h3>
              <div className="flex ml-auto">
                <button
                  type="button"
                  className="hover:text-blue-500"
                  onClick={() => handleIconClick(event.selection.id)}
                >
                  <DocumentTextIcon className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="px-4 py-3 sm:px-6 border-t border-gray-300">
              <p className="whitespace-pre-wrap">{event.description}</p>
              <div className="text-sm mt-2">
                <p>
                  開始： {format(subHours(new Date(event.started_at), 9), 'yyyy年MM月dd日 HH:mm')}
                </p>
                <p>
                  終了： {format(subHours(new Date(event.ended_at), 9), 'yyyy年MM月dd日 HH:mm')}
                </p>
              </div>
            </div>
          </div>
        </div>
      ));
    }
    return (
      <div className="mt-5">
        <div className="overflow-hidden bg-white shadow sm:rounded-lg mb-5 mt-5">
          <div>
            <div className="px-4 py-3 sm:px-6 flex">
              <h3 className="text-base/7 font-semibold">明日の予定はありません。</h3>
            </div>
            <div className="px-4 py-3 sm:px-6 border-t border-gray-300">
              <p className="whitespace-pre-wrap">のんびりとした1日をお過ごしください！</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
                      <ChartPieIcon className="TitleIcon mr-1" aria-hidden="true" />
                      <h2 className="text-2xl/7 font-bold sm:truncate sm:text-3xl sm:tracking-tight">
                        ダッシュボード
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 本日のイベント */}
            {loading ? (
              <></>
            ) : (
              <>
                <div className="px-4 sm:px-6 lg:px-8 mt-5">
                  <div className="md:flex md:items-center md:justify-between">
                    <div className="min-w-0 flex-1">
                      <h2 className="text-2xl/7 font-bold sm:truncate sm:text-3xl sm:tracking-tight">
                        本日 {currentDate}
                      </h2>
                    </div>
                  </div>
                  {renderTodayEvents()}
                </div>
                {/* 明日のイベント */}
                <div className="px-4 sm:px-6 lg:px-8 mt-5">
                  <div className="md:flex md:items-center md:justify-between">
                    <div className="min-w-0 flex-1">
                      <h2 className="text-2xl/7 font-bold sm:truncate sm:text-3xl sm:tracking-tight">
                        明日 {tomorrowDate}
                      </h2>
                    </div>
                  </div>
                  {renderTomorrowEvents()}
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
