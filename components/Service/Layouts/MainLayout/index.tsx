'use client';

import { supabase } from '@/libs/supabase';
import { useState, useRef, Fragment } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { isAndroid, isIOS } from 'react-device-detect';
import { useA2HS } from '@/hooks/A2hs';
import {
  Bars3Icon,
  CalendarDaysIcon,
  ChartBarIcon,
  InformationCircleIcon,
  BuildingOffice2Icon,
  XMarkIcon,
  ArrowRightStartOnRectangleIcon,
  ClipboardDocumentListIcon,
  NumberedListIcon,
  ShareIcon,
  EnvelopeIcon,
  DevicePhoneMobileIcon,
  ArrowUpOnSquareIcon,
} from '@heroicons/react/24/outline';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
  Transition,
} from '@headlessui/react';
import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
  LineShareButton,
  LineIcon,
  HatenaShareButton,
  HatenaIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from 'react-share';

export default function MainLayout() {
  const pathname = usePathname();

  function classNames(...classes: (string | undefined | null | boolean)[]): string {
    return classes.filter(Boolean).join(' ');
  }

  const [A2hsOpen, setA2hsOpen] = useState(false);

  const SidebarNavigation = [
    { name: '就活イベント', href: '/service', icon: InformationCircleIcon },
    { name: 'カレンダー', href: '/service/calendar', icon: CalendarDaysIcon },
    { name: '企業管理', href: '/service/selection', icon: BuildingOffice2Icon },
    { name: 'ESテンプレート', href: '/service/template', icon: ClipboardDocumentListIcon },
    { name: '自己分析', href: '/service/analysis', icon: ChartBarIcon },
    { name: 'ToDoリスト', href: '/service/todo', icon: NumberedListIcon },
    // { name: '設定', href: '/service/settings', icon: Cog6ToothIcon },
  ].map((item) => ({
    ...item,
    current:
      pathname === item.href || (pathname.startsWith(item.href + '/') && item.href !== '/service'),
  }));

  const isPWA =
    typeof window !== 'undefined' && window.matchMedia('(display-mode: standalone)').matches;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const [open, setLogoutDialogOpen] = useState(false);
  const [shareOpen, setShareDialogOpen] = useState(false);

  const handleLogout = () => {
    setLogoutDialogOpen(true);
  };

  const handleCancel = () => {
    setLogoutDialogOpen(false);
  };

  const handleShare = () => {
    setShareDialogOpen(true);
  };

  const handleShareCancel = () => {
    setShareDialogOpen(false);
  };

  const handleConfirmLogout = async () => {
    await supabase.auth.signOut();
    router.push('/service/auth/login');
  };

  const [, promptToInstall] = useA2HS({
    onAccepted: () => {
      console.log('ホーム画面に追加が受け入れられました');
    },
    onDismissed: () => {
      console.log('ホーム画面に追加が拒否されました');
    },
  });

  const handleClose = () => {
    setA2hsOpen(false);
  };
  return (
    <>
      <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="-m-2.5 p-2.5"
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                </button>
              </div>
            </TransitionChild>

            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
              <div className="flex h-16 shrink-0 items-center">
                <img
                  alt="Your Company"
                  src="/images/head/1.png"
                  className="w-auto"
                  style={{ height: '45px' }}
                />
              </div>
              <nav className="flex flex-1 flex-col HomeBar">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {SidebarNavigation.map((item) => (
                        <li key={item.name}>
                          <a
                            href={item.href}
                            className={classNames(
                              item.current
                                ? 'bg-gray-50 text-blue-500'
                                : 'text-gray-700 hover:bg-gray-50 hover:text-blue-500',
                              'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                            )}
                          >
                            <item.icon
                              aria-hidden="true"
                              className={classNames(
                                item.current
                                  ? 'text-blue-500'
                                  : 'text-gray-700 group-hover:text-blue-500',
                                'size-6 shrink-0',
                              )}
                            />
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className="mt-auto">
                    <ul role="list" className="-mx-2 space-y-1">
                      {(isAndroid || isIOS) && !isPWA && (
                        <>
                          {isAndroid ? (
                            <li>
                              <a
                                onClick={promptToInstall}
                                className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-blue-500"
                              >
                                <DevicePhoneMobileIcon
                                  aria-hidden="true"
                                  className="size-6 shrink-0 text-gray-700 group-hover:text-blue-500"
                                />
                                アプリ登録
                              </a>
                            </li>
                          ) : isIOS ? (
                            <li>
                              <a
                                onClick={() => setA2hsOpen(true)}
                                className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-blue-500"
                              >
                                <DevicePhoneMobileIcon
                                  aria-hidden="true"
                                  className="size-6 shrink-0 text-gray-700 group-hover:text-blue-500"
                                />
                                アプリ登録
                              </a>
                            </li>
                          ) : null}
                        </>
                      )}
                      {/* <li>
                        <a
                          onClick={() =>
                            window.open('https://www.instagram.com/riku.vision', '_blank')
                          }
                          className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-blue-500"
                        >
                          <BookOpenIcon
                            aria-hidden="true"
                            className="size-6 shrink-0 text-gray-700 group-hover:text-blue-500"
                          />
                          ご利用ガイド
                        </a>
                      </li> */}
                      <li>
                        <a
                          onClick={() => (window.location.href = '/contact')}
                          className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-blue-500"
                        >
                          <EnvelopeIcon
                            aria-hidden="true"
                            className="size-6 shrink-0 text-gray-700 group-hover:text-blue-500"
                          />
                          お問い合わせ
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={handleShare}
                          className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-blue-500"
                        >
                          <ShareIcon
                            aria-hidden="true"
                            className="size-6 shrink-0 text-gray-700 group-hover:text-blue-500"
                          />
                          シェアする
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={handleLogout}
                          className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-blue-500"
                        >
                          <ArrowRightStartOnRectangleIcon
                            aria-hidden="true"
                            className="size-6 shrink-0 text-gray-700 group-hover:text-blue-500"
                          />
                          ログアウト
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-300 bg-white px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center" style={{ marginTop: '7px' }}>
            <img
              alt="Your Company"
              src="/images/head/1.png"
              className="w-auto"
              style={{ height: '45px' }}
            />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {SidebarNavigation.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-gray-50 text-blue-500'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-blue-500',
                          'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                        )}
                      >
                        <item.icon
                          aria-hidden="true"
                          className={classNames(
                            item.current
                              ? 'text-blue-500'
                              : 'text-gray-700 group-hover:text-blue-500',
                            'size-6 shrink-0',
                          )}
                        />
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="mt-auto">
                <ul role="list" className="-mx-2 space-y-1">
                  {/* <li>
                    <button
                      onClick={() => window.open('https://www.instagram.com/riku.vision', '_blank')}
                      className="w-full group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-blue-500"
                    >
                      <BookOpenIcon
                        aria-hidden="true"
                        className="size-6 shrink-0 text-gray-700 group-hover:text-blue-500"
                      />
                      ご利用ガイド
                    </button>
                  </li> */}
                  <li>
                    <button
                      onClick={() => (window.location.href = '/contact')}
                      className="w-full group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-blue-500"
                    >
                      <EnvelopeIcon
                        aria-hidden="true"
                        className="size-6 shrink-0 text-gray-700 group-hover:text-blue-500"
                      />
                      お問い合わせ
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleShare}
                      className="w-full group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-blue-500"
                    >
                      <ShareIcon
                        aria-hidden="true"
                        className="size-6 shrink-0 text-gray-700 group-hover:text-blue-500"
                      />
                      シェアする
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-blue-500"
                    >
                      <ArrowRightStartOnRectangleIcon
                        aria-hidden="true"
                        className="size-6 shrink-0 text-gray-700 group-hover:text-blue-500"
                      />
                      ログアウト
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="SidebarLayout">
        <div className="fixed top-0 z-40 w-full flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-300 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>

          <div aria-hidden="true" className="h-6 w-px bg-gray-300 lg:hidden" />

          <div className="flex ml-auto">
            <div className="flex h-16 shrink-0 items-center">
              <img
                alt="Your Company"
                src="/images/head/1.png"
                className="w-auto"
                style={{ height: '45px' }}
              />
            </div>
          </div>
        </div>
      </div>

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          initialFocus={cancelButtonRef}
          onClose={() => {}}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel
                  style={{ width: '100%' }}
                  className={`m-auto text-gray-700 bg-white relative transform overflow-hidden rounded-lg px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6`}
                >
                  <div className="sm:flex sm:items-start">
                    <div
                      className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10"
                      style={{ backgroundColor: '#eaf4fc' }}
                    >
                      <ArrowRightStartOnRectangleIcon
                        className="h-6 w-6 text-blue-500"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-2 text-center sm:ml-4 sm:text-left">
                      <Dialog.Title as="h1" className={`text-base font-bold leading-6`}>
                        ログアウトしますか？
                      </Dialog.Title>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 grid grid-flow-row-dense grid-cols-2 gap-3">
                    <button
                      type="button"
                      className={`DialogButton mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto`}
                      onClick={handleCancel}
                      ref={cancelButtonRef}
                    >
                      キャンセル
                    </button>
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 sm:ml-3 sm:w-auto"
                      onClick={handleConfirmLogout}
                    >
                      ログアウト
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <Transition.Root show={shareOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          initialFocus={cancelButtonRef}
          onClose={() => {}}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel
                  style={{ width: '100%' }}
                  className={`m-auto text-gray-700 bg-white relative transform overflow-hidden rounded-lg px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6`}
                >
                  <div className="sm:flex sm:items-start">
                    <div
                      className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10"
                      style={{ backgroundColor: '#eaf4fc' }}
                    >
                      <ShareIcon className="h-6 w-6 text-blue-500" aria-hidden="true" />
                    </div>
                    <div className="mt-2 text-center sm:ml-4 sm:text-left">
                      <Dialog.Title as="h1" className={`text-base font-bold leading-6`}>
                        シェアする
                      </Dialog.Title>
                    </div>
                  </div>
                  <div className="flex justify-center mt-4">
                    <TwitterShareButton
                      aria-label="シェアボタン"
                      url="https://rikuvision.realunivlog.com"
                      title="リクビジョン"
                      className="m-1 hover:opacity-60"
                    >
                      <TwitterIcon size={40} round={true} />
                    </TwitterShareButton>

                    <FacebookShareButton
                      aria-label="シェアボタン"
                      url="https://rikuvision.realunivlog.com"
                      title="リクビジョン"
                      className="m-1 hover:opacity-60"
                    >
                      <FacebookIcon size={40} round={true} />
                    </FacebookShareButton>

                    <LineShareButton
                      aria-label="シェアボタン"
                      url="https://rikuvision.realunivlog.com"
                      title="リクビジョン"
                      className="m-1 hover:opacity-60"
                    >
                      <LineIcon size={40} round={true} />
                    </LineShareButton>

                    <HatenaShareButton
                      aria-label="シェアボタン"
                      url="https://rikuvision.realunivlog.com"
                      title="リクビジョン"
                      className="m-1 hover:opacity-60"
                    >
                      <HatenaIcon size={40} round={true} />
                    </HatenaShareButton>

                    <PinterestShareButton
                      aria-label="シェアボタン"
                      url="https://rikuvision.realunivlog.com"
                      media="/images/og/1.png"
                      description="リクビジョン"
                      className="m-1 hover:opacity-60"
                    >
                      <PinterestIcon size={40} round={true} />
                    </PinterestShareButton>

                    <RedditShareButton
                      aria-label="シェアボタン"
                      url="https://rikuvision.realunivlog.com"
                      title="リクビジョン"
                      className="m-1 hover:opacity-60"
                    >
                      <RedditIcon size={40} round={true} />
                    </RedditShareButton>

                    <LinkedinShareButton
                      aria-label="シェアボタン"
                      url="https://rikuvision.realunivlog.com"
                      title="リクビジョン"
                      summary="就活における日程管理や自己分析、選考状況などを一括で管理することのできるサービスです。"
                      className="m-1 hover:opacity-60"
                    >
                      <LinkedinIcon size={40} round={true} />
                    </LinkedinShareButton>
                  </div>
                  <div className="mt-5 sm:mt-6 grid grid-flow-row-dense gap-3">
                    <button
                      type="button"
                      className={`DialogButton mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto`}
                      onClick={handleShareCancel}
                      ref={cancelButtonRef}
                    >
                      キャンセル
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <Transition.Root show={A2hsOpen} as={Fragment}>
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
