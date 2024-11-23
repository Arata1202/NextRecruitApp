'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/Layouts/MainLayout';
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
  const router = useRouter();

  useEffect(() => {
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
        return;
      }

      const mappedEvents = (data as unknown as EventData[])
        .filter((item) => item.selection?.title)
        .map((item, index) => ({
          title: item.selection.title,
          start: item.started_at,
          end: item.ended_at,
          extendedProps: {
            id: item.selection.id,
          },
        }));

      setEvents(mappedEvents);
    };

    fetchEvents();
  }, []);

  const handleEventClick = (clickInfo: any) => {
    const eventId = clickInfo.event.extendedProps.id;
    if (eventId) {
      router.push(`/selection/${eventId}/flow`);
    }
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
            <div className="px-4 sm:px-6 lg:px-8 mt-5">
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
                timeZone="UTC"
                height="auto"
              />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
