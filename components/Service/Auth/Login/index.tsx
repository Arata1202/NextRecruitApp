'use client';

import { supabase } from '@/libs/supabase';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Switch } from '@headlessui/react';
import ErrorAlert from '@/components/Service/Common/Alert/ErrorAlert';
import { HomeIcon } from '@heroicons/react/24/solid';

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  const [enabled, setEnabled] = useState(false);
  const [errorShow, setErrorShow] = useState(false);
  const [errorTitle, setErrorTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  useEffect(() => {
    if (errorShow) {
      const timer = setTimeout(() => {
        setErrorShow(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorShow]);

  const onSubmit = async (data: FormData) => {
    const { error: signInError, data: signInData } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (signInError) {
      setErrorTitle('ログインに失敗しました。');
      setErrorMessage('もう一度やり直してください。');
      setErrorShow(true);
      reset();
      return;
    }
    await router.push('/service');
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/service`,
      },
    });
  };

  const handleGithubLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/service`,
      },
    });
  };

  // const handleAppleLogin = async () => {
  //   await supabase.auth.signInWithOAuth({
  //     provider: 'apple',
  //     options: {
  //       redirectTo: `${window.location.origin}/service`,
  //     },
  //   });
  // };

  const handleTwitterLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'twitter',
      options: {
        redirectTo: `${window.location.origin}/service`,
      },
    });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center sm:px-6 lg:px-8 bg-white">
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
                  href="/service/auth/login"
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-blue-500"
                >
                  ログイン
                </a>
              </div>
            </li>
          </ol>
        </nav>
        <div className="pt-6 pb-11">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            {/* <img alt="Your Company" src="/images/icons/app/2.png" className="mx-auto h-10 w-auto" /> */}
            <h2 className="text-center text-2xl/9 font-bold tracking-tight">ログイン</h2>
            <div className="text-center mt-5" style={{ fontSize: '14px' }}>
              アカウントをお持ちでない方は、
              <br />
              こちらから
              <a href="/service/auth/signup" className="text-blue-500 hover:text-blue-600">
                アカウントを登録
              </a>
              いただけます。
            </div>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="bg-white px-6 py-12 border border-gray-300 sm:rounded-lg sm:px-12">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-md font-bold">
                    メールアドレス
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      type="email"
                      required
                      autoComplete="email"
                      {...register('email', {
                        required: 'メールアドレスを入力してください。',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: '有効なメールアドレスを入力してください。',
                        },
                      })}
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm/6 px-2"
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-md font-bold">
                    パスワード
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      type={enabled ? 'text' : 'password'}
                      required
                      {...register('password', {
                        required: 'パスワードを入力してください。',
                        minLength: {
                          value: 8,
                          message: 'パスワードは8文字以上で入力してください。',
                        },
                        validate: (value) => {
                          if (!/[A-Z]/.test(value)) {
                            return '大文字を1文字以上含めてください。';
                          }
                          if (!/[a-z]/.test(value)) {
                            return '小文字を1文字以上含めてください。';
                          }
                          if (!/\d/.test(value)) {
                            return '数字を1文字以上含めてください。';
                          }
                          if (!/[@$!%*?&]/.test(value)) {
                            return '記号を1文字以上含めてください。';
                          }
                          return true;
                        },
                      })}
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm/6 px-2"
                    />
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                  </div>
                </div>

                <div className="flex items-center">
                  <Switch
                    checked={enabled}
                    onChange={setEnabled}
                    className="group relative inline-flex h-4 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-300 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 data-[checked]:bg-blue-500"
                  >
                    <span className="sr-only">Use setting</span>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none inline-block size-3 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                    />
                  </Switch>
                  <div className="ml-3 text-sm/6">
                    <label htmlFor="privacy" className="font-medium">
                      パスワードを表示する
                    </label>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                  >
                    ログイン
                  </button>
                </div>
              </form>

              <div>
                <div className="relative mt-10">
                  <div aria-hidden="true" className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm/6 font-medium">
                    <span className="bg-white px-6">ソーシャルアカウントで登録</span>
                  </div>
                </div>

                <div className="mt-6">
                  {/* Google */}
                  <button
                    onClick={handleGoogleLogin}
                    className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                      <path
                        d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                        fill="#EA4335"
                      />
                      <path
                        d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                        fill="#34A853"
                      />
                    </svg>
                    <span className="text-sm/6 font-semibold">Googleでログイン</span>
                  </button>
                  {/* GitHub */}
                  <button
                    onClick={handleGithubLogin}
                    className="mt-3 flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                  >
                    <svg
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      className="size-5 fill-[#24292F]"
                    >
                      <path
                        d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm/6 font-semibold">GitHubでログイン</span>
                  </button>
                  <button
                    onClick={handleTwitterLogin}
                    className="mt-3 flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                  >
                    <img
                      width="20"
                      height="20"
                      src="https://cdn.qiita.com/assets/brand_icons/icon-x-23c6879a50878a0838c78bdbb3d17c16.svg"
                    />
                    <span className="text-sm/6 font-semibold">X（旧Twitter）でログイン</span>
                  </button>
                </div>
                {/* <div className="mt-3 grid grid-cols-2 gap-2.5">
                <button
                  onClick={handleAppleLogin}
                  className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="var(--alias-color-system-staticWhite-default)"
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    role="img"
                  >
                    <title>Apple</title>
                    <path d="M12.4824 5.75781C13.4531 5.75781 14.6699 5.11523 15.3809 4.24023C16.0371 3.44727 16.5156 2.35352 16.5156 1.25977C16.5156 1.10938 16.502 0.958984 16.4746 0.835938C15.3945 0.876953 14.0957 1.54688 13.3301 2.44922C12.7285 3.14648 12.1543 4.24023 12.1543 5.34766C12.1543 5.51172 12.1816 5.67578 12.1953 5.73047C12.2637 5.74414 12.373 5.75781 12.4824 5.75781Z"></path>
                    <path d="M9.0918 22.2051C10.418 22.2051 11.0059 21.3164 12.6465 21.3164C14.3008 21.3164 14.6836 22.1777 16.1465 22.1777C17.582 22.1777 18.5527 20.8516 19.4551 19.5391C20.4805 18.0352 20.9043 16.5859 20.918 16.5039C20.8359 16.4766 18.0742 15.3555 18.0742 12.1836C18.0742 9.43555 20.248 8.21875 20.3711 8.12305C18.9355 6.04492 16.748 5.99023 16.1465 5.99023C14.5195 5.99023 13.2207 6.97461 12.373 6.97461C11.4844 6.97461 10.3086 6.04492 8.90039 6.04492C6.24805 6.04492 3.54102 8.25977 3.54102 12.4023C3.54102 15 4.53906 17.7207 5.76953 19.4844C6.83594 20.9746 7.76562 22.2051 9.0918 22.2051Z"></path>
                  </svg>
                  <span className="text-sm/6 font-semibold">Apple</span>
                </button>
                <button
                  onClick={handleTwitterLogin}
                  className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                >
                  <img
                    width="20"
                    height="20"
                    src="https://cdn.qiita.com/assets/brand_icons/icon-x-23c6879a50878a0838c78bdbb3d17c16.svg"
                  />
                  <span className="text-sm/6 font-semibold">X（旧Twitter）</span>
                </button>
              </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ErrorAlert
        show={errorShow}
        onClose={() => setErrorShow(false)}
        title={errorTitle}
        message={errorMessage}
      />
    </>
  );
}
