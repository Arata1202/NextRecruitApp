'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/libs/supabase';
import MainLayout from '@/components/Layouts/MainLayout';

type Analysis = {
  id: number;
  title: string;
  description: string;
};

export default function Calendar() {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

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
        const { data, error } = await supabase
          .from('analysis')
          .select(
            `
            id,
            title_id (
              title
            ),
            description
          `,
          )
          .eq('supabaseauth_id', userId) // ログイン中のユーザーのデータのみ取得
          .order('id', { ascending: true });

        if (error) throw error;

        const formattedData = data.map((item: any) => ({
          id: item.id,
          title: item.title_id.title,
          description: item.description,
        }));

        setAnalyses(formattedData);
      } catch (error) {
        console.error('Error fetching analyses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyses();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userId) {
    return <div>ログインが必要です</div>;
  }

  return (
    <>
      <div>
        <MainLayout />
        <div className="lg:pl-72">
          <main className="">
            {/* タイトル */}
            <div className="bg-white px-4 sm:px-6 lg:px-8">
              <div className="py-10 flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    自己分析
                  </h2>
                </div>
                <div className="flex ml-4 mt-0">
                  <button
                    type="button"
                    className="ml-3 inline-flex items-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                  >
                    追加
                  </button>
                </div>
              </div>
            </div>

            {/* メインコンテンツ */}
            <div className="px-4 sm:px-6 lg:px-8 mt-10">
              {analyses.map((analysis) => (
                <div
                  key={analysis.id}
                  className="overflow-hidden bg-white shadow sm:rounded-lg mb-5"
                >
                  <div>
                    <div className="px-4 py-3 sm:px-6">
                      <h3 className="text-base/7 font-semibold text-gray-900">{analysis.title}</h3>
                    </div>
                    <div className="px-4 py-3 sm:px-6 border-t border-gray-100">
                      <p className="text-gray-600">{analysis.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
