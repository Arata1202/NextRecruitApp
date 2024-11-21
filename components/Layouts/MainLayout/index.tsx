'use client';

import { supabase } from '@/libs/supabase';
import { useState, useRef, Fragment } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Bars3Icon,
  CalendarDaysIcon,
  ChartBarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  BuildingOffice2Icon,
  XMarkIcon,
  ArrowRightStartOnRectangleIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
  Transition,
} from '@headlessui/react';
export default function MainLayout() {
  const pathname = usePathname();

  function classNames(...classes: (string | undefined | null | boolean)[]): string {
    return classes.filter(Boolean).join(' ');
  }

  const SidebarNavigation = [
    { name: 'ダッシュボード', href: '/', icon: ChartPieIcon },
    { name: 'カレンダー', href: '/calendar', icon: CalendarDaysIcon },
    { name: '選考企業', href: '/selection', icon: BuildingOffice2Icon },
    { name: '自己分析', href: '/analysis', icon: ChartBarIcon },
    { name: 'テンプレート', href: '/template', icon: ClipboardDocumentListIcon },
    { name: '設定', href: '/settings', icon: Cog6ToothIcon },
  ].map((item) => ({
    ...item,
    current: pathname === item.href,
  }));

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const [open, setLogoutDialogOpen] = useState(false);

  const handleLogout = () => {
    setLogoutDialogOpen(true);
  };

  const handleCancel = () => {
    setLogoutDialogOpen(false);
  };

  const handleConfirmLogout = async () => {
    await supabase.auth.signOut();
    router.push('/auth/login');
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
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=blue&shade=600"
                  className="h-8 w-auto"
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
                                  : 'text-gray-400 group-hover:text-blue-500',
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
                    <a
                      onClick={handleLogout}
                      className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-blue-500"
                    >
                      <ArrowRightStartOnRectangleIcon
                        aria-hidden="true"
                        className="size-6 shrink-0 text-gray-400 group-hover:text-blue-500"
                      />
                      ログアウト
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <img
              alt="Your Company"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=blue&shade=600"
              className="h-8 w-auto"
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
                              : 'text-gray-400 group-hover:text-blue-500',
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
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-blue-500"
                    >
                      <ArrowRightStartOnRectangleIcon
                        aria-hidden="true"
                        className="size-6 shrink-0 text-gray-400 group-hover:text-blue-500"
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
        <div className="fixed top-0 z-40 w-full flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>

          <div aria-hidden="true" className="h-6 w-px bg-gray-200 lg:hidden" />

          <div className="flex ml-auto">
            <div className="flex h-16 shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=blue&shade=600"
                className="h-8 w-auto"
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
                  className={`bg-white relative transform overflow-hidden rounded-lg px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6`}
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
                      className={`DialogButton mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto`}
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
    </>
  );
}
