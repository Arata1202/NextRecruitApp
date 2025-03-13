'use client';

import { Fragment, useState } from 'react';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import styles from './index.module.css';
import { PROJECT_IMAGE, HEADER_NAVIGATION } from '@/constants/data';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={`${styles.header} fixed top-0 left-0 w-full z-50 bg-white`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between py-4 px-6 lg:px-8">
        <Link href="/" className="-m-1.5 p-1.5 hover:scale-110 transition-transform">
          {PROJECT_IMAGE.map((image) => (
            <img
              key={image.alt}
              alt={image.alt}
              src={image.path}
              className={`${styles.image} w-auto`}
            />
          ))}
        </Link>
        <div className="flex lg:hidden">
          {mobileMenuOpen ? (
            <button
              type="button"
              className={`-m-2.5 inline-flex items-center justify-center rounded-md p-2.5`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <XMarkIcon className="h-6 w-6 text-gray-700" />
            </button>
          ) : (
            <div className="flex">
              <button
                type="button"
                className={`-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 ml-1`}
                onClick={() => setMobileMenuOpen(true)}
              >
                <Bars3Icon className="h-6 w-6 text-gray-700" />
              </button>
            </div>
          )}
        </div>
        <div className="hidden lg:flex lg:gap-x-12 font-bold">
          {HEADER_NAVIGATION.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex text-sm leading-6 hover:text-blue-500`}
            >
              <item.icon className="h-5 w-5 mr-2" />
              {item.name}
            </Link>
          ))}
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
                  <XMarkIcon className={`h-6 w-6 text-gray-700`} />
                </button>
                <ul className="mt-5 space-y-6">
                  {HEADER_NAVIGATION.map((item) => (
                    <li key={item.path}>
                      <Link href={item.path}>
                        <div
                          className={`flex items-center py-1 text-base font-bold text-gray-700 hover:text-blue-500`}
                        >
                          <item.icon className="h-6 w-6 mr-2 ml-2" />
                          {item.name}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </header>
  );
}
