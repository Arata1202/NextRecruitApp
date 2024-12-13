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

        const { data: todoData, error: todoError } = await supabase
          .from('todo')
          .select('title, description, started_at, ended_at')
          .eq('supabaseauth_id', user.id);

        if (todoError) {
          console.error('Error fetching todo events:', todoError);
          setIsLoading(false);
          return;
        }

        const mappedSelectionEvents = (selectionData as unknown as EventData[])
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

        const mappedTodoEvents = (todoData || []).map((item, index) => ({
          title: item.title,
          start: item.started_at || item.ended_at,
          end: item.ended_at ? `${item.ended_at.split('T')[0]}T23:59:59` : '',
          extendedProps: {
            id: `todo-${index}`,
            type: 'todo',
          },
          className: 'bg-green-600 text-white hover:bg-green-700 px-1',
        }));

        const mappedHolidayEvents = Object.entries(holidayData).map(([date, name]) => ({
          title: name,
          start: date,
          end: date,
          className: 'bg-red-400 text-white px-1',
          allDay: true,
          extendedProps: {
            id: `holiday-${date}`,
            type: 'holiday',
          },
        }));

        setEvents([...mappedSelectionEvents, ...mappedTodoEvents, ...mappedHolidayEvents]);
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
      router.push(`/service/selection/${id}/flow`);
    } else if (type === 'todo') {
      router.push('/service/todo');
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
            <div className="px-4 sm:px-6 lg:px-8 mt-5 pb-10 bg-gray-100">
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
