'use client';

import { Fragment, useState } from 'react';
import styles from './index.module.css';
import { Dialog, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import {
  ArrowRightEndOnRectangleIcon,
  EnvelopeIcon,
  UserPlusIcon,
} from '@heroicons/react/24/solid';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={`${styles.header} fixed top-0 left-0 w-full z-50 bg-white`}>
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <a href="/" className="-m-1.5 p-1.5 hover:scale-110 transition-transform">
          <span className="sr-only">Your Company</span>
          <img alt="" src="/images/icons/app/1.png" className="h-8 w-auto" />
        </a>
        <div className="flex lg:hidden">
          {mobileMenuOpen ? (
            <button
              type="button"
              className={`-m-2.5 inline-flex items-center justify-center rounded-md p-2.5`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close main menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          ) : (
            <div className="flex">
              <button
                type="button"
                className={`-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 ml-1`}
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>

        <div className="hidden lg:flex lg:gap-x-12 font-bold">
          <a href="/contact" className={`flex text-sm leading-6 hover:text-blue-500`}>
            <EnvelopeIcon className="h-5 w-5 mr-2" aria-hidden="true" />
            お問い合わせ
          </a>
          <a
            href="/service/auth/signup"
            target="_blank"
            className={`flex text-sm leading-6 hover:text-blue-500`}
          >
            <UserPlusIcon className="h-5 w-5 mr-2" aria-hidden="true" />
            アカウント登録
          </a>
          <a
            href="/service/auth/login"
            target="_blank"
            className={`flex text-sm leading-6 hover:text-blue-500`}
          >
            <ArrowRightEndOnRectangleIcon className="h-5 w-5 mr-2" aria-hidden="true" />
            ログイン
          </a>
        </div>
      </nav>
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog as="div" className="relative lg:hidden z-50" onClose={setMobileMenuOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="ease-in-out duration-500 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel
              className={`fixed inset-y-0 right-0 flex max-w-xs w-full shadow-xl  bg-white`}
            >
              <div className="flex w-full flex-col p-5">
                <button
                  type="button"
                  className="-ml-2 flex items-center justify-end p-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <XMarkIcon className={`h-6 w-6" aria-hidden="true  `} />
                  <span className="sr-only">Close menu</span>
                </button>
                <div className={`text-center py-2 text-xl font-bold bg-gray-300`}>Menu</div>
                <ul className="mt-5 space-y-6">
                  <li>
                    <a href="/service/auth/signup" target="_blank">
                      <div
                        className={`flex items-center py-1 text-base font-bold hover:text-blue-500`}
                      >
                        <UserPlusIcon className="h-6 w-6 mr-2 ml-2" aria-hidden="true" />
                        アカウント登録
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="/service/auth/login" target="_blank">
                      <div
                        className={`flex items-center py-1 text-base font-bold hover:text-blue-500`}
                      >
                        <ArrowRightEndOnRectangleIcon
                          className="h-6 w-6 mr-2 ml-2"
                          aria-hidden="true"
                        />
                        ログイン
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="/contact">
                      <div
                        className={`flex items-center py-1 text-base font-bold hover:text-blue-500`}
                      >
                        <EnvelopeIcon className="h-6 w-6 mr-2 ml-2" aria-hidden="true" />
                        お問い合わせ
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </header>
  );
}
