'use client';

import MainLayout from '@/components/Layouts/MainLayout';
import { CalendarDaysIcon, DocumentTextIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';
import { format, isSameDay, addDays } from 'date-fns';
import { ja } from 'date-fns/locale';
import { supabase } from '@/libs/supabase';
import { useRouter } from 'next/navigation';

interface EventData {
  started_at: string;
  ended_at: string;
  description: string;
  selection: {
    id: string; // selectionのid
    title: string; // 株式会社アイスタイル の部分
  };
  selectionflowtitle: {
    title: string; // 1次面接 の部分
  };
}

export default function DashBoard() {
  const [currentDate, setCurrentDate] = useState('');
  const [tomorrowDate, setTomorrowDate] = useState('');
  const [todayEvents, setTodayEvents] = useState<EventData[]>([]);
  const [tomorrowEvents, setTomorrowEvents] = useState<EventData[]>([]);
  const router = useRouter();

  useEffect(() => {
    const now = new Date();
    const tomorrow = addDays(now, 1);

    // 日付をフォーマット
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

      // クエリ結果を確認
      console.log('Fetched data:', data);
      console.log('Fetch error:', error);

      if (error) {
        console.error('Error fetching events:', error);
        return;
      }

      const events = data as unknown as EventData[];
      const today = new Date();
      const tomorrow = addDays(today, 1);

      const filteredTodayEvents = events.filter((event) =>
        isSameDay(new Date(event.started_at), today),
      );
      const filteredTomorrowEvents = events.filter((event) =>
        isSameDay(new Date(event.started_at), tomorrow),
      );

      setTodayEvents(filteredTodayEvents);
      setTomorrowEvents(filteredTomorrowEvents);
    };

    fetchEvents();
  }, []);

  const handleIconClick = (id: string) => {
    router.push(`/selection/${id}/flow`);
  };

  const renderEvents = (events: EventData[]) =>
    events.map((event, index) => (
      <div key={index} className="overflow-hidden bg-white shadow sm:rounded-lg mb-5 mt-5">
        <div>
          <div className="px-4 py-3 sm:px-6 flex">
            <h3 className="text-base/7 font-semibold">
              {event.selection.title} - {event.selectionflowtitle.title}
            </h3>
            <div className="flex ml-auto">
              <button
                type="button"
                className="hover:text-blue-600"
                onClick={() => handleIconClick(event.selection.id)} // selectionのidを使用
              >
                <DocumentTextIcon className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="px-4 py-3 sm:px-6 border-t border-gray-100">
            <p className="whitespace-pre-wrap">{event.description}</p>
            <div className="text-sm text-gray-500 mt-2">
              <p>開始： {format(new Date(event.started_at), 'yyyy年MM月dd日 HH:mm')}</p>
              <p>終了： {format(new Date(event.ended_at), 'yyyy年MM月dd日 HH:mm')}</p>
            </div>
          </div>
        </div>
      </div>
    ));

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
                      <CalendarDaysIcon className="TitleIcon mr-1" aria-hidden="true" />
                      <h2 className="text-2xl/7 font-bold sm:truncate sm:text-3xl sm:tracking-tight">
                        ダッシュボード
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 本日のイベント */}
            <div className="px-4 sm:px-6 lg:px-8 mt-5">
              <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                  <h2 className="text-2xl/7 font-bold sm:truncate sm:text-3xl sm:tracking-tight">
                    本日 {currentDate}
                  </h2>
                </div>
              </div>
              {renderEvents(todayEvents)}
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
              {renderEvents(tomorrowEvents)}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
