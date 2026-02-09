'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CalendarDaysIcon } from '@heroicons/react/20/solid';
import { supabase } from '@/libs/supabase';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import AdUnit from '@/components/ThirdParties/GoogleAdSense/Elements/AdUnit';
import { useMutationObserver } from '@/hooks/useMutationObserver';

interface EventData {
  started_at: string;
  ended_at: string;
  selection: {
    id: string;
    title: string;
    supabaseauth_id: string;
  };
}

interface MappedEvent {
  title: string;
  start: string;
  end: string;
  className?: string;
  allDay?: boolean;
  extendedProps: {
    id: string;
    type: 'selection' | 'holiday';
  };
}

export default function CalendarFeature() {
  useMutationObserver();
  const [events, setEvents] = useState<MappedEvent[]>([]);
  const [holidays, setHolidays] = useState<string[]>([]);
  const [, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://holidays-jp.github.io/api/v1/date.json');
        const holidayData = (await response.json()) as Record<string, string>;
        setHolidays(Object.keys(holidayData));

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          console.error('Error fetching user:', userError || 'User not logged in');
          setIsLoading(false);
          return;
        }

        const { data: selectionData, error: selectionError } = await supabase
          .from('selectionflow')
          .select(
            `
            started_at,
            ended_at,
            selection (
              id,
              title,
              supabaseauth_id
            )
          `,
          )
          .eq('selection.supabaseauth_id', user.id);

        if (selectionError) {
          console.error('Error fetching selection events:', selectionError);
          setIsLoading(false);
          return;
        }

        const mappedSelectionEvents: MappedEvent[] = (selectionData as unknown as EventData[])
          .filter((item) => item.selection?.title)
          .map((item) => ({
            title: item.selection.title,
            start: item.started_at || item.ended_at,
            end: item.ended_at ? `${item.ended_at.split('T')[0]}T23:59:59` : '',
            extendedProps: {
              id: item.selection.id,
              type: 'selection',
            },
            className: 'bg-blue-500 text-white hover:bg-blue-600 px-1',
          }));

        const mappedHolidayEvents: MappedEvent[] = Object.entries(holidayData).map(
          ([date, name]) => ({
            title: name,
            start: date,
            end: date,
            className: 'bg-red-400 text-white px-1',
            allDay: true,
            extendedProps: {
              id: `holiday-${date}`,
              type: 'holiday',
            },
          }),
        );

        setEvents([...mappedSelectionEvents, ...mappedHolidayEvents]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEventClick = (clickInfo: any) => {
    const { id, type } = clickInfo.event.extendedProps;
    if (type === 'selection' && id) {
      router.push(`/service/selection/flow?id=${id}`);
    }
  };

  const dayCellDidMount = (info: any) => {
    const date = info.date.toISOString().split('T')[0];
    if (holidays.includes(date)) {
      info.el.style.backgroundColor = '#ffebee';
    }
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
                      <CalendarDaysIcon className="TitleIcon mr-1" aria-hidden="true" />
                      <h2 className="text-2xl/7 font-bold sm:truncate sm:text-3xl sm:tracking-tight">
                        カレンダー
                      </h2>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      選考フローの日程をカレンダーで確認し、面接や提出期限の見落としを防ぎます。
                    </p>
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

              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                locale="ja"
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: '',
                }}
                events={events}
                displayEventTime={false}
                eventClick={handleEventClick}
                timeZone="Asia/Tokyo"
                height="auto"
                dayCellDidMount={dayCellDidMount}
              />
              <AdUnit slot="7998948559" style={{ marginBottom: '1.25rem', marginTop: '1.25rem' }} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
