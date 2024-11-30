'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/Service/Layouts/MainLayout';
import { CalendarDaysIcon } from '@heroicons/react/20/solid';
import { supabase } from '@/libs/supabase';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

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
  extendedProps: {
    id: string;
  };
}

export default function Calendar() {
  const [events, setEvents] = useState<MappedEvent[]>([]);
  const [holidays, setHolidays] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://holidays-jp.github.io/api/v1/date.json');
        const holidayData = await response.json();
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

        const { data, error } = await supabase
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

        if (error) {
          console.error('Error fetching events:', error);
          setIsLoading(false);
          return;
        }

        const mappedEvents = (data as unknown as EventData[])
          .filter((item) => item.selection?.title)
          .map((item) => ({
            title: item.selection.title,
            start: item.started_at || item.ended_at,
            end: item.ended_at,
            extendedProps: {
              id: item.selection.id,
            },
          }));

        setEvents(mappedEvents);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEventClick = (clickInfo: any) => {
    const eventId = clickInfo.event.extendedProps.id;
    if (eventId) {
      router.push(`/service/selection/${eventId}/flow`);
    }
  };

  const dayCellDidMount = (info: any) => {
    const date = info.date.toISOString().split('T')[0];
    if (holidays.includes(date)) {
      info.el.style.backgroundColor = '#ffebee';
    }
  };

  if (isLoading) {
    return <></>;
  }

  return (
    <>
      <div>
        <MainLayout />
        <div className="lg:pl-72">
          <main className="h-screen">
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
                  </div>
                </div>
              </div>
            </div>
            {/* メインコンテンツ */}
            <div className="px-4 sm:px-6 lg:px-8 mt-5 pb-5 bg-gray-200">
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
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
