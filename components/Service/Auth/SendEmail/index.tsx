'use client';

import { supabase } from '@/libs/supabase';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { HomeIcon } from '@heroicons/react/24/solid';
import ConfirmAlert from '@/components/Service/Common/Alert/ConfirmAlert';

type FormData = {
  email: string;
};

export default function Login() {
  const [confirmShow, setConfirmShow] = useState(false);
  const [ConfirmTitle, setConfirmTitle] = useState('');
  const [ConfirmMessage, setConfirmMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    if (confirmShow) {
      const timer = setTimeout(() => {
        setConfirmShow(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [confirmShow]);

  const onSubmit = async (data: FormData) => {
    try {
      const { error: sendEmailError } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/service/auth/passwordreset`,
      });
      if (sendEmailError) {
        throw sendEmailError;
      }
      setConfirmTitle('確認メールを送信しました。');
      setConfirmMessage('メール内のリンクからパスワードリセットを完了させてください。');
      setConfirmShow(true);
      reset();
    } catch (error) {
      console.error('Error:', error);
    }
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
                  href="/service/auth/sendemail"
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-blue-500"
                >
                  パスワードリセット
                </a>
              </div>
            </li>
          </ol>
        </nav>
        <div className="pt-6 pb-11">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="text-center text-2xl/9 font-bold tracking-tight">パスワードリセット</h2>
            <div className="text-center mt-5" style={{ fontSize: '14px' }}>
              パスワードリセット用のメールを送信します。
              <br />
              リクビジョンに登録されているメールアドレスをご入力ください。
              <br />
              <br />
              realunivlog@gmail.comからメールが届きます。
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
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                  >
                    メールを送信
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <ConfirmAlert
        show={confirmShow}
        onClose={() => setConfirmShow(false)}
        title={ConfirmTitle}
        message={ConfirmMessage}
      />
    </>
  );
}
