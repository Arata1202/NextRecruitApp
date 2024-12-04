'use client';

import MainLayout from '../../Layouts/MainLayout';
import { BookOpenIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/solid';
import { ArrowUpOnSquareIcon } from '@heroicons/react/24/outline';
import { Dialog, Transition, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { isAndroid, isIOS } from 'react-device-detect';
import { useA2HS } from '@/hooks/A2hs';
import { useState, Fragment } from 'react';

export default function Manual() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const [, promptToInstall] = useA2HS({
    onAccepted: () => {
      console.log('ホーム画面に追加が受け入れられました');
    },
    onDismissed: () => {
      console.log('ホーム画面に追加が拒否されました');
    },
  });
  const isPWA =
    typeof window !== 'undefined' && window.matchMedia('(display-mode: standalone)').matches;
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
                      <BookOpenIcon className="TitleIcon mr-1" aria-hidden="true" />
                      <h2 className="text-2xl/7 font-bold sm:truncate sm:text-3xl sm:tracking-tight">
                        ご利用ガイド
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* メインコンテンツ */}
            <div className="px-4 sm:px-6 lg:px-8 mt-5 bg-gray-200 pb-1">
              {(isAndroid || isIOS) && !isPWA && (
                <div className="mt-5">
                  <div className="overflow-hidden bg-white shadow sm:rounded-lg mb-5">
                    <div>
                      <div className="px-4 py-3 sm:px-6 flex justify-between items-center">
                        <h3 className="text-base/7 font-semibold">アプリ化するとさらに便利！</h3>
                        {isAndroid ? (
                          <button
                            onClick={promptToInstall}
                            className="ml-3 inline-flex items-center rounded-md bg-blue-500 hover:bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm"
                          >
                            追加
                          </button>
                        ) : isIOS ? (
                          <button
                            onClick={() => setOpen(true)}
                            className="ml-3 inline-flex items-center rounded-md bg-blue-500 hover:bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm"
                          >
                            追加
                          </button>
                        ) : null}
                      </div>
                      <div className="px-4 py-3 sm:px-6 border-t border-gray-300">
                        <>
                          <p className="whitespace-pre-wrap">
                            リクビジョンはPWAに対応しており、アプリとしてホーム画面に設置することが可能です。追加ボタンから設置可能です。
                          </p>
                        </>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-5">
                <div className="overflow-hidden bg-white shadow sm:rounded-lg mb-5">
                  <div>
                    <div className="px-4 py-3 sm:px-6 flex">
                      <h3 className="text-base/7 font-semibold">就活イベント</h3>
                    </div>
                    <div className="px-4 py-3 sm:px-6 border-t border-gray-300">
                      <>
                        <p className="whitespace-pre-wrap">
                          「選考中の企業」で登録した全ての企業の選考状況に基づき、当日および翌日の選考予定を一括で表示します。
                        </p>
                      </>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <div className="overflow-hidden bg-white shadow sm:rounded-lg mb-5">
                  <div>
                    <div className="px-4 py-3 sm:px-6 flex">
                      <h3 className="text-base/7 font-semibold">カレンダー</h3>
                    </div>
                    <div className="px-4 py-3 sm:px-6 border-t border-gray-300">
                      <>
                        <p className="whitespace-pre-wrap">
                          「選考中の企業」で登録した全ての企業の選考予定と、「ToDoリスト」で登録したイベントが全てカレンダーに表示されます。
                        </p>
                      </>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <div className="overflow-hidden bg-white shadow sm:rounded-lg mb-5">
                  <div>
                    <div className="px-4 py-3 sm:px-6 flex">
                      <h3 className="text-base/7 font-semibold">選考中の企業</h3>
                    </div>
                    <div className="px-4 py-3 sm:px-6 border-t border-gray-300">
                      <>
                        <p className="whitespace-pre-wrap">
                          選考予定の企業を登録できます。
                          <br />
                          志望度は星の数で設定でき、星の数に応じて企業の並び順が自動で変わります。
                          <br />
                          <br />
                          志望度が高い：★★★
                          <br />
                          志望度が普通：★★
                          <br />
                          志望度が低い：★
                          <br />
                          選考を辞退する場合：辞退
                        </p>
                      </>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <div className="overflow-hidden bg-white shadow sm:rounded-lg mb-5">
                  <div>
                    <div className="px-4 py-3 sm:px-6 flex">
                      <h3 className="text-base/7 font-semibold">選考中の企業 - 企業情報</h3>
                    </div>
                    <div className="px-4 py-3 sm:px-6 border-t border-gray-300">
                      <>
                        <p className="whitespace-pre-wrap">
                          「選考中の企業」で登録した各企業ごとに、企業情報を追加できます。
                          <br />
                          あらかじめ用意された項目に従って入力することで、効率的に情報を収集できます。
                          <br />
                          特に、マイページURLやマイページIDは必ず入力しておくと、必要なときにすぐアクセスできて便利です。
                          <br />
                          また、企業理念や志望動機を簡単にメモしておくことで、エントリーシート（ES）の作成や面接準備の際に見直しやすくなります。
                        </p>
                      </>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <div className="overflow-hidden bg-white shadow sm:rounded-lg mb-5">
                  <div>
                    <div className="px-4 py-3 sm:px-6 flex">
                      <h3 className="text-base/7 font-semibold">選考中の企業 - 選考状況</h3>
                    </div>
                    <div className="px-4 py-3 sm:px-6 border-t border-gray-300">
                      <>
                        <p className="whitespace-pre-wrap">
                          「選考中の企業」で登録した各企業ごとに、今後の選考予定を追加できます。
                          <br />
                          タイトル、日時、備考（任意）を入力することで、選考予定を効率的に管理できます。
                          <br />
                          備考欄には、面接で聞かれる可能性のある質問や面接の手応え、担当者の役職や名前などを記録しておくと便利です。
                          <br />
                          また、登録した内容は「就活イベント」や「カレンダー」にも自動的に反映されます。
                        </p>
                      </>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <div className="overflow-hidden bg-white shadow sm:rounded-lg mb-5">
                  <div>
                    <div className="px-4 py-3 sm:px-6 flex">
                      <h3 className="text-base/7 font-semibold">ESテンプレート</h3>
                    </div>
                    <div className="px-4 py-3 sm:px-6 border-t border-gray-300">
                      <>
                        <p className="whitespace-pre-wrap">
                          使い回し可能なガクチカや自己PRを保存できます。
                          <br />
                          400字以内のテンプレートを作成しておくことで、エントリーシート（ES）を提出する際に、リクビジョンからテンプレートをコピーして貼り付けるだけの簡単な作業になります。
                          <br />
                          また、企業の規定に合わせて文字数を調整するだけで済むため、就活を効率的に進めることができます。
                          <br />
                          さらに、文字数カウンターを活用することで、正確に文字数を管理できます。
                        </p>
                      </>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <div className="overflow-hidden bg-white shadow sm:rounded-lg mb-5">
                  <div>
                    <div className="px-4 py-3 sm:px-6 flex">
                      <h3 className="text-base/7 font-semibold">自己分析</h3>
                    </div>
                    <div className="px-4 py-3 sm:px-6 border-t border-gray-300">
                      <>
                        <p className="whitespace-pre-wrap">
                          あらかじめ用意された項目から質問を選び、自分なりの答えを入力しましょう。
                          <br />
                          これまでの経験や考え方を整理することで、自己理解を深められます。
                          <br />
                          自己理解が深まると、面接やエントリーシートで伝える内容に説得力が増し、相手に強い印象を与えることができます。
                          <br />
                          一つひとつ丁寧に考えながら回答を作成してみてください。
                        </p>
                      </>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <div className="overflow-hidden bg-white shadow sm:rounded-lg mb-5">
                  <div>
                    <div className="px-4 py-3 sm:px-6 flex">
                      <h3 className="text-base/7 font-semibold">ToDoリスト</h3>
                    </div>
                    <div className="px-4 py-3 sm:px-6 border-t border-gray-300">
                      <>
                        <p className="whitespace-pre-wrap">
                          就活に関するタスクや課題、やらなければならないことを記録しておくための便利な機能です。
                          <br />
                          登録した内容は「カレンダー」にも反映されるため、スケジュール管理がより簡単になります。
                        </p>
                      </>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      <Transition.Root show={open} as={Fragment}>
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
                      <DevicePhoneMobileIcon aria-hidden="true" className="size-6 text-blue-500" />
                    </div>
                    <div className="mt-2 text-center sm:ml-4 sm:text-left">
                      <Dialog.Title as="h1" className={`text-base font-bold leading-6`}>
                        アプリを追加する
                      </Dialog.Title>
                      <div className="mt-2">
                        <div className="text-sm text-gray-500 text-left">
                          <div className="text-left flex">
                            ブラウザの
                            <div className="flex">
                              「シェアアイコン
                              <ArrowUpOnSquareIcon aria-hidden="true" className="h-4 w-4" />
                              」をタップして
                            </div>
                          </div>
                          「ホーム画面に追加」を選択してください。
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <button
                    onClick={handleClose}
                    className={`DialogButton mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto`}
                  >
                    閉じる
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
