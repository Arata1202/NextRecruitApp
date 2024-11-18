'use client';

import React from 'react';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react';
import {
  Bars3Icon,
  CalendarDaysIcon,
  ChartBarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  BuildingOffice2Icon,
  XMarkIcon,
  ArrowRightStartOnRectangleIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'ダッシュボード', href: '#', icon: ChartPieIcon, current: true },
  { name: 'カレンダー', href: '#', icon: CalendarDaysIcon, current: false },
  { name: '選考中', href: '#', icon: BuildingOffice2Icon, current: false },
  { name: '自己分析', href: '#', icon: ChartBarIcon, current: false },
];

function classNames(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="noindex" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased LightTheme`}>
        <div>
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
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                  <div className="flex h-16 shrink-0 items-center">
                    <img
                      alt="Your Company"
                      src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                      className="h-8 w-auto"
                    />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => (
                            <li key={item.name}>
                              <a
                                href={item.href}
                                className={classNames(
                                  item.current
                                    ? 'bg-gray-50 text-indigo-600'
                                    : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                                  'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                )}
                              >
                                <item.icon
                                  aria-hidden="true"
                                  className={classNames(
                                    item.current
                                      ? 'text-indigo-600'
                                      : 'text-gray-400 group-hover:text-indigo-600',
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
                          href="#"
                          className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                        >
                          <Cog6ToothIcon
                            aria-hidden="true"
                            className="size-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                          />
                          Settings
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </DialogPanel>
            </div>
          </Dialog>

          {/* Static sidebar for desktop */}
          <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
              <div className="flex h-16 shrink-0 items-center">
                <img
                  alt="Your Company"
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto"
                />
              </div>
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <a
                            href={item.href}
                            className={classNames(
                              item.current
                                ? 'bg-gray-50 text-indigo-600'
                                : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                              'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                            )}
                          >
                            <item.icon
                              aria-hidden="true"
                              className={classNames(
                                item.current
                                  ? 'text-indigo-600'
                                  : 'text-gray-400 group-hover:text-indigo-600',
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
                        <a
                          href="#"
                          className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                        >
                          <ArrowRightStartOnRectangleIcon
                            aria-hidden="true"
                            className="size-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                          />
                          ログアウト
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                        >
                          <Cog6ToothIcon
                            aria-hidden="true"
                            className="size-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                          />
                          設定
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <div className="lg:pl-72">
            <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>

              {/* Separator */}
              <div aria-hidden="true" className="h-6 w-px bg-gray-200 lg:hidden" />

              <div className="flex ml-auto">
                <div className="flex items-center gap-x-4 lg:gap-x-6">
                  <span aria-hidden="true" className="ml-4 text-sm/6 font-semibold text-gray-900">
                    Tom Cook
                  </span>
                </div>
              </div>
            </div>

            <main className="py-10">
              <div className="px-4 sm:px-6 lg:px-8">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
