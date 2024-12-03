import MainLayout from '../../Layouts/MainLayout';
import { StarIcon } from '@heroicons/react/24/solid';

export default function Manual() {
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
                      <StarIcon className="TitleIcon mr-1" aria-hidden="true" />
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
    </>
  );
}
