'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  Bars3Icon,
  XMarkIcon,
  ArrowRightStartOnRectangleIcon,
  ShareIcon,
  DevicePhoneMobileIcon,
} from '@heroicons/react/24/outline';
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react';
import { isAndroid, isIOS } from 'react-device-detect';
import { supabase } from '@/libs/supabase';
import styles from './index.module.css';
import { useA2hs } from '@/hooks/useA2hs';
import { PROJECT_IMAGE, SERVICE_NAVIGATION, SERVICE_SETTING_NAVIGATION } from '@/constants/data';
import Modal from '../../Modal';
import Share from './Elements/Share';
import A2hs from './Elements/A2hs';

export default function MainLayout() {
  const pathname = usePathname();
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logoutOpen, setLogoutModalOpen] = useState(false);
  const [shareOpen, setShareModalOpen] = useState(false);
  const [a2hsOpen, setA2hsModalOpen] = useState(false);

  function classNames(...classes: (string | undefined | null | boolean)[]): string {
    return classes.filter(Boolean).join(' ');
  }

  const isPWA =
    typeof window !== 'undefined' && window.matchMedia('(display-mode: standalone)').matches;

  const SERVICE_NAVIGATION_ITEMS = SERVICE_NAVIGATION.map((item) => ({
    ...item,
    current:
      pathname === item.href || (pathname.startsWith(item.href + '/') && item.href !== '/service'),
  }));
  const SERVICE_SETTING_NAVIGATION_ITEMS = SERVICE_SETTING_NAVIGATION;

  const handleLogout = () => {
    setLogoutModalOpen(true);
  };
  const handleCancelLogout = () => {
    setLogoutModalOpen(false);
  };
  const handleConfirmLogout = async () => {
    await supabase.auth.signOut();
    router.push('/service/auth/login');
  };

  const handleShare = () => {
    setShareModalOpen(true);
  };
  const handleCancelShare = () => {
    setShareModalOpen(false);
  };

  const [, promptToInstall] = useA2hs();
  const handleA2hs = () => {
    promptToInstall();
  };
  const handleCancelA2hs = () => {
    setA2hsModalOpen(false);
  };
  return (
    <>
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-300 bg-white px-6 pb-4">
          <div className={`${styles.sidebar} flex h-16 shrink-0 items-center`}>
            {PROJECT_IMAGE.map((item) => (
              <img
                key={item.alt}
                alt={item.alt}
                src={item.path}
                className={`${styles.image} w-auto`}
              />
            ))}
          </div>
          <nav className="flex flex-1 flex-col">
            <ul className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul className="-mx-2 space-y-1">
                  {SERVICE_NAVIGATION_ITEMS.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-gray-50 text-blue-500'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-blue-500',
                          'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? 'text-blue-500'
                              : 'text-gray-700 group-hover:text-blue-500',
                            'size-6 shrink-0',
                          )}
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="mt-auto">
                <ul className="-mx-2 space-y-1">
                  {SERVICE_SETTING_NAVIGATION_ITEMS.map((item) => (
                    <li key={item.name}>
                      <a
                        className="cursor-pointer w-full group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-blue-500"
                        onClick={
                          item.name === 'シェアする'
                            ? handleShare
                            : item.name === 'ログアウト'
                              ? handleLogout
                              : item.name === 'お問い合わせ'
                                ? () => router.push('/contact')
                                : undefined
                        }
                      >
                        <item.icon className="size-6 shrink-0 text-gray-700 group-hover:text-blue-500" />
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className={styles.header}>
        <div className="fixed top-0 z-40 w-full flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-300 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          >
            <Bars3Icon className="size-6" />
          </button>
          <div className="flex ml-auto h-16 shrink-0 items-center">
            {PROJECT_IMAGE.map((item) => (
              <img
                key={item.alt}
                alt={item.alt}
                src={item.path}
                className={`${styles.image} w-auto`}
              />
            ))}
          </div>
        </div>
      </div>

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
                  <XMarkIcon className="size-6 text-white" />
                </button>
              </div>
            </TransitionChild>
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
              <div className="flex h-16 shrink-0 items-center">
                {PROJECT_IMAGE.map((item) => (
                  <img
                    key={item.alt}
                    alt={item.alt}
                    src={item.path}
                    className={`${styles.image} w-auto`}
                  />
                ))}
              </div>
              <nav className={`${styles.pwaHeight} flex flex-1 flex-col`}>
                <ul className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul className="-mx-2 space-y-1">
                      {SERVICE_NAVIGATION_ITEMS.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={classNames(
                              item.current
                                ? 'bg-gray-50 text-blue-500'
                                : 'text-gray-700 hover:bg-gray-50 hover:text-blue-500',
                              'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                            )}
                          >
                            <item.icon
                              className={classNames(
                                item.current
                                  ? 'text-blue-500'
                                  : 'text-gray-700 group-hover:text-blue-500',
                                'size-6 shrink-0',
                              )}
                            />
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className="mt-auto">
                    <ul className="-mx-2 space-y-1">
                      {(isAndroid || isIOS) && !isPWA && (
                        <li>
                          <a
                            onClick={(isAndroid && handleA2hs) || (() => setA2hsModalOpen(true))}
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-blue-500"
                          >
                            <DevicePhoneMobileIcon className="size-6 shrink-0 text-gray-700 group-hover:text-blue-500" />
                            アプリ登録
                          </a>
                        </li>
                      )}
                      {SERVICE_SETTING_NAVIGATION_ITEMS.map((item) => (
                        <li key={item.name}>
                          <a
                            onClick={
                              item.name === 'シェアする'
                                ? handleShare
                                : item.name === 'ログアウト'
                                  ? handleLogout
                                  : item.name === 'お問い合わせ'
                                    ? () => router.push('/contact')
                                    : undefined
                            }
                            className="cursor-pointer group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-blue-500"
                          >
                            <item.icon className="size-6 shrink-0 text-gray-700 group-hover:text-blue-500" />
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <Modal
        show={logoutOpen}
        title="ログアウトしますか？"
        Icon={ArrowRightStartOnRectangleIcon}
        onClose={handleCancelLogout}
        onConfirm={handleConfirmLogout}
        cancelText="キャンセル"
        confirmText="ログアウト"
      ></Modal>

      <Modal
        show={shareOpen}
        title="シェアする"
        Icon={ShareIcon}
        onClose={handleCancelShare}
        cancelText="閉じる"
      >
        <Share />
      </Modal>

      <Modal
        show={a2hsOpen}
        title="アプリを追加する"
        Icon={DevicePhoneMobileIcon}
        onClose={handleCancelA2hs}
        cancelText="閉じる"
      >
        <A2hs />
      </Modal>
    </>
  );
}
