'use client';

import React, { useState, useEffect, useRef, useCallback, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { HomeIcon } from '@heroicons/react/24/solid';
import { EnvelopeIcon } from '@heroicons/react/24/solid';
import ReCAPTCHA from 'react-google-recaptcha';
import styles from './index.module.css';

const ContactPage = () => {
  const [show, setContactConfirmShow] = useState(false);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [formData, setContactFormData] = useState<FormData | null>(null);
  const [open, setContactDialogOpen] = useState(false);

  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  interface FormData {
    sei: string;
    mei: string;
    email: string;
    company: string;
    tel: string;
    message: string;
  }

  const resetCaptcha = useCallback(() => {
    recaptchaRef.current?.reset();
  }, []);

  const onChange = (value: string | null) => {
    console.log('Captcha value:', value);
    setCaptchaValue(value);
  };

  const onSubmit = (data: FormData) => {
    setContactFormData(data);
    setContactDialogOpen(true);
  };

  const sendEmail = useCallback(() => {
    if (!formData) return;

    fetch(`${process.env.NEXT_PUBLIC_EMAIL_ENDPOINT}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          console.log('Email sent successfully');
          setContactConfirmShow(true);
          reset();
          resetCaptcha();
          setContactDialogOpen(false);
        } else {
          console.log('Failed to send email');
          setContactConfirmShow(false);
        }
      })
      .catch((error) => console.error('Error sending email:', error));
  }, [formData, reset, resetCaptcha]);

  const handleConfirmSend = useCallback(() => {
    const verifyCaptcha = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_RECAPTCHA_ENDPOINT}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            'g-recaptcha-response': captchaValue,
          }),
        });
        const data = await response.json();
        if (data.success) {
          sendEmail();
        } else {
          console.error('reCAPTCHA validation failed:', data.message);
        }
      } catch (error) {
        console.error('Error during reCAPTCHA validation:', error);
      }
    };

    verifyCaptcha();
  }, [captchaValue, sendEmail]);

  const handleCancel = () => {
    setContactDialogOpen(false);
  };

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setContactConfirmShow(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    <>
      <div className="bg-white pb-5">
        <nav aria-label="Breadcrumb" className="flex border-b border-gray-200 bg-white">
          <ol
            role="list"
            className="mx-auto flex w-full max-w-screen-xl space-x-4 px-4 sm:px-6 lg:px-8"
          >
            <li className="flex">
              <div className="flex items-center">
                <a href="/" className="text-gray-500 hover:text-blue-500">
                  <HomeIcon aria-hidden="true" className="size-5 shrink-0" />
                  <span className="sr-only">Home</span>
                </a>
              </div>
            </li>
            <li className="flex">
              <div className="flex items-center">
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 44"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  className="h-full w-6 shrink-0 text-gray-200"
                >
                  <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                </svg>
                <a
                  href="/contact"
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-blue-500"
                >
                  お問い合わせ
                </a>
              </div>
            </li>
          </ol>
        </nav>
        <div className="mx-auto max-w-7xl p-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-base/7">
            <div className={`${styles.content} mb-5`}>
              <div className="flex">
                <EnvelopeIcon className="h-7 w-7 mr-2" aria-hidden="true" />
                <h1 className="">お問い合わせ</h1>
              </div>
              <p className="mt-2 text-lg/8">
                リクビジョンに関するご質問やご要望などがございましたら、お気軽にお問い合わせください。
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} method="POST" className="mx-auto max-w-3xl">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="email" className={`block text-sm font-semibold leading-6`}>
                    メールアドレス
                  </label>
                  <div className="mt-2.5">
                    <input
                      {...register('email', {
                        required: '※ メールアドレスを入力してください',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: '※ 有効なメールアドレスを入力してください',
                        },
                      })}
                      type="text"
                      name="email"
                      id="email"
                      autoComplete="email"
                      className={`block w-full rounded-md border py-2 pl-3 pr-3 sm:text-sm sm:leading-6 border-gray-300 focus:ring-blue-500`}
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="last-name" className={`block text-sm font-semibold leading-6`}>
                    題名
                  </label>
                  <div className="mt-2.5">
                    <input
                      {...register('mei', { required: '※ 題名を入力してください' })}
                      type="text"
                      name="mei"
                      id="mei"
                      autoComplete="family-name"
                      className={`block w-full rounded-md border py-2 pl-3 pr-3 sm:text-sm sm:leading-6 border-gray-300 focus:ring-blue-500`}
                    />
                    {errors.mei && <p className="text-red-500">{errors.mei.message}</p>}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className={`block text-sm font-semibold leading-6`}>
                    内容
                  </label>
                  <div className="mt-2.5">
                    <textarea
                      {...register('message', { required: '※ 内容を入力してください' })}
                      name="message"
                      id="message"
                      rows={4}
                      className={`block w-full rounded-md border py-2 pl-3 pr-3 sm:text-sm sm:leading-6 border-gray-300 focus:ring-blue-500`}
                      defaultValue={''}
                    />
                    {errors.message && <p className="text-red-500">{errors.message.message}</p>}
                  </div>
                </div>
              </div>
              {/* スパム */}
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6LeRcoEqAAAAADAy9S_y6Xn_ZKtWqSs5lXekEwFp"
                onChange={onChange}
                className="mt-3"
              />
              <div className="mt-3">
                <button
                  type="submit"
                  disabled={!captchaValue}
                  className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  送信
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* 送信確認モーダル */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setContactDialogOpen}
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
                  className={`m-auto relative transform overflow-hidden rounded-lg px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 bg-white`}
                >
                  <div className="sm:flex sm:items-start">
                    <div
                      className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10"
                      style={{ backgroundColor: '#eaf4fc' }}
                    >
                      <EnvelopeIcon className="h-6 w-6 text-blue-500" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h1"
                        className={`text-base font-bold leading-6 text-gray-700`}
                      >
                        お問い合わせを送信しますか？
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className={`text-sm text-gray-700`}>
                          送信ボタンは一度だけ押してください。送信完了まで数秒かかることがあります。
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-flow-row-dense grid-cols-2 gap-3">
                    <button
                      type="button"
                      className={`DialogButton mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto text-gray-700`}
                      onClick={handleCancel}
                      ref={cancelButtonRef}
                    >
                      キャンセル
                    </button>
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                      onClick={handleConfirmSend}
                    >
                      送信
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {/* 送信完了アラート */}
      <div
        aria-live="assertive"
        className="confirmAlert pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className={`pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg shadow-lg ring-1 ring-opacity-5 mt-16 bg-white ring-gray-300`}
            >
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className={`text-sm font-medium text-gray-700`}>
                      お問い合わせありがとうございます
                    </p>
                    <p className="mt-1 text-sm text-gray-700">正常に処理が完了しました。</p>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className={`inline-flex rounded-md hover:text-blue-500`}
                      onClick={() => {
                        setContactConfirmShow(false);
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
