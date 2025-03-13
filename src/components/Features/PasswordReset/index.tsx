'use client';

import HomeContainer from '@/components/Common/Layouts/Container/HomeContainer';
import Link from 'next/link';
import { supabase } from '@/libs/supabase';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Switch } from '@headlessui/react';
import { useState, useEffect } from 'react';
import { HomeIcon } from '@heroicons/react/24/solid';
import ConfirmAlert from '../../Common/ConfirmAlert';
import ErrorAlert from '../../Common/ErrorAlert';
import AdUnit from '@/components/ThirdParties/GoogleAdSense/Elements/AdUnit';

type FormData = {
  password: string;
  passwordConf: string;
};

export default function PasswordResetFeature() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormData>();
  const [enabled, setEnabled] = useState(false);
  const password = watch('password');
  const [confirmShow, setConfirmShow] = useState(false);
  const [ConfirmTitle, setConfirmTitle] = useState('');
  const [ConfirmMessage, setConfirmMessage] = useState('');
  const [errorShow, setErrorShow] = useState(false);
  const [errorTitle, setErrorTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (confirmShow) {
      const timer = setTimeout(() => {
        setConfirmShow(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [confirmShow]);
  useEffect(() => {
    if (errorShow) {
      const timer = setTimeout(() => {
        setErrorShow(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorShow]);

  const onSubmit = async (data: FormData) => {
    try {
      const { error: passwordResetError } = await supabase.auth.updateUser({
        password: data.password,
      });
      if (passwordResetError) {
        throw passwordResetError;
      }
      setConfirmTitle('パスワードリセットが完了しました。');
      setConfirmMessage('5秒後に自動でログインします。');
      setConfirmShow(true);
      reset();
      setTimeout(() => {
        router.push('/service');
      }, 5000);
    } catch {
      setErrorTitle('パスワードリセットに失敗しました。');
      setErrorMessage('新しいパスワードは以前のパスワードと異なるものを設定してください。');
      setErrorShow(true);
      reset();
    }
  };

  return (
    <>
      <HomeContainer auth={true}>
        <div className="flex min-h-full flex-1 flex-col justify-center sm:px-6 lg:px-8 bg-white">
          <nav aria-label="Breadcrumb" className="flex border-b border-gray-200 bg-white">
            <ol
              role="list"
              className="mx-auto flex w-full max-w-screen-xl space-x-4 px-4 sm:px-6 lg:px-8"
            >
              <li className="flex">
                <div className="flex items-center">
                  <Link href="/" className="text-gray-500 hover:text-blue-500">
                    <HomeIcon aria-hidden="true" className="size-5 shrink-0" />
                    <span className="sr-only">Home</span>
                  </Link>
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
                  <Link
                    href="/service/auth/sendemail"
                    className="ml-4 text-sm font-medium text-gray-500 hover:text-blue-500"
                  >
                    パスワードリセット
                  </Link>
                </div>
              </li>
            </ol>
          </nav>
          <div className="pt-6">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="text-center text-2xl/9 font-bold tracking-tight">
                パスワードリセット
              </h2>
              <div className="text-center mt-5" style={{ fontSize: '14px' }}>
                新しいパスワードを入力して、
                <br />
                パスワードリセットを完了させてください。
              </div>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
              <div className="bg-white px-6 py-12 border border-gray-300 sm:rounded-lg sm:px-12">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label htmlFor="password" className="block text-md font-bold">
                      パスワード
                    </label>
                    <div className="text-gray-500 mt-2" style={{ fontSize: '12px' }}>
                      8文字以上で入力してください。
                      <br />
                      大文字、小文字、数字、記号を含める必要があります。
                    </div>
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
                        className={`block w-full rounded-md border py-2 pl-3 pr-3 sm:text-sm sm:leading-6 border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none`}
                      />
                      {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-md font-bold">
                      パスワード（確認）
                    </label>
                    <div className="mt-2">
                      <input
                        id="passwordConf"
                        type={enabled ? 'text' : 'password'}
                        required
                        {...register('passwordConf', {
                          required: 'パスワード（確認）を入力してください。',
                          validate: (value) => value === password || 'パスワードが一致しません。',
                        })}
                        className={`block w-full rounded-md border py-2 pl-3 pr-3 sm:text-sm sm:leading-6 border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none`}
                      />
                      {errors.passwordConf && (
                        <p className="text-red-500">{errors.passwordConf.message}</p>
                      )}
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
                      className={`cursor-pointer block w-full rounded-md px-3.5 py-2.5 text-white text-center text-sm font-semibold shadow-s bg-blue-500 hover:bg-blue-600`}
                    >
                      パスワードをリセットする
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <AdUnit
            slot="7998948559"
            style={{
              marginTop: '1.25rem',
              marginBottom: '2.75rem',
              paddingLeft: '1.5rem',
              paddingRight: '1.5rem',
            }}
          />
        </div>
      </HomeContainer>

      <ConfirmAlert
        show={confirmShow}
        onClose={() => setConfirmShow(false)}
        title={ConfirmTitle}
        message={ConfirmMessage}
      />

      <ErrorAlert
        show={errorShow}
        onClose={() => setErrorShow(false)}
        title={errorTitle}
        message={errorMessage}
      />
    </>
  );
}
