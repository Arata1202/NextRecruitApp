export default function Top() {
  return (
    <>
      <div style={{ padding: '24px 0' }} className="MobilePadding-0 overflow-hidden">
        <div className="lg:flex mx-auto max-w-7xl p-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:shrink-0 lg:pt-8">
            <h1 className="DialogButton mt-10 text-pretty text-4xl font-semibold tracking-tight sm:text-7xl">
              就活をもっとスムーズに
            </h1>
            <p className="mt-8 text-pretty text-lg font-medium text-gray-700 sm:text-xl/8">
              就活は、ESの提出や面接の日程調整、企業の情報収集など管理すべきことがたくさんあります。「アプリ名」を利用して、就活に関する全てを一元管理してみませんか？
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <a
                href="/service/auth/signup"
                target="_blank"
                className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                無料で利用を開始する
              </a>
            </div>
          </div>
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <img
                  alt="App screenshot"
                  src="https://tailwindui.com/plus/img/component-images/project-app-screenshot.png"
                  width={2432}
                  height={1442}
                  className="w-[76rem] rounded-md shadow-2xl ring-1 ring-gray-900/10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
