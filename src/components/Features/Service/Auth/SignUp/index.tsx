'use client';

import HomeContainer from '@/components/Common/Layouts/Container/HomeContainer';
import Link from 'next/link';
import { supabase } from '@/libs/supabase';
import { useForm } from 'react-hook-form';
import { Switch } from '@headlessui/react';
import { useState, useRef, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import Alert from '@/components/Common/Alert';
import AdUnit from '@/components/ThirdParties/GoogleAdSense/Elements/AdUnit';
import BreadCrumb from '@/components/Common/BreadCrumb';

type FormData = {
  email: string;
  password: string;
  passwordConf: string;
  privacy: boolean;
  recaptcha: string;
};

export default function SignUpFeature() {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors,
    reset,
  } = useForm<FormData>();
  const [enabled, setEnabled] = useState(false);
  const password = watch('password');
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [errorShow, setErrorShow] = useState(false);
  const [errorTitle, setErrorTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmShow, setConfirmShow] = useState(false);
  const [ConfirmTitle, setConfirmTitle] = useState('');
  const [ConfirmMessage, setConfirmMessage] = useState('');

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

  const onChange = (value: string | null) => {
    setCaptchaValue(value);
    if (value) {
      clearErrors('recaptcha');
    }
  };

  const onSubmit = async (data: FormData) => {
    if (!captchaValue) {
      setError('recaptcha', { type: 'manual', message: 'reCAPTCHAをチェックしてください。' });
      return;
    }

    const recaptchaResponse = await fetch(`${process.env.NEXT_PUBLIC_API_RECAPTCHA_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'g-recaptcha-response': captchaValue,
      }),
    });

    const recaptchaResult = await recaptchaResponse.json();
    if (!recaptchaResult.success) {
      setErrorTitle('reCAPTCHAの検証に失敗しました。');
      setErrorMessage('お手数ですが、最初からやり直してください。');
      setErrorShow(true);
      reset();
      recaptchaRef.current?.reset();
      return;
    }

    const { data: signUpData } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/service`,
      },
    });
    const identities = signUpData?.user?.identities;
    if (identities?.length === 0) {
      setErrorTitle('このメールアドレスは既に登録されています。');
      setErrorMessage('別のメールアドレスを使用するか、ログインしてください。');
      setErrorShow(true);
      reset();
      recaptchaRef.current?.reset();
      return;
    }
    setConfirmTitle('確認メールを送信しました。');
    setConfirmMessage('メール内のリンクから登録を完了させてください。');
    setConfirmShow(true);
    reset();
    recaptchaRef.current?.reset();
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
      <HomeContainer white={true}>
        <BreadCrumb title="アカウント登録" path="service/auth/signup" />
        <div className="pt-6">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            {/* <img alt="Your Company" src="/images/icons/app/2.png" className="mx-auto h-10 w-auto" /> */}
            <h2 className="text-center text-2xl/9 font-bold tracking-tight">アカウント登録</h2>
            <div className="text-center mt-5" style={{ fontSize: '14px' }}>
              初めてご利用の方は、新規アカウント登録が必要です。
              <br />
              アカウントをお持ちの方は、こちらから
              <Link href="/service/auth/login" className="text-blue-500 hover:text-blue-600">
                ログイン
              </Link>
              できます。
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
                      autoComplete="email"
                      required
                      {...register('email', {
                        required: 'メールアドレスを入力してください。',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: '有効なメールアドレスを入力してください。',
                        },
                      })}
                      className={`block w-full rounded-md border py-2 pl-3 pr-3 sm:text-sm sm:leading-6 border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none`}
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                  </div>
                </div>

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

                <fieldset>
                  <div className="space-y-5">
                    <div className="relative flex items-start">
                      <div className="flex h-6 items-center">
                        <input
                          id="privacy"
                          type="checkbox"
                          required
                          {...register('privacy', {
                            required: 'プライバシーポリシーへの同意が必要です。',
                          })}
                          className="text-gray-300 size-4 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                        />
                      </div>
                      <div className="ml-3 text-sm/6">
                        <label htmlFor="privacy" className="font-medium">
                          <Link
                            href="/privacy"
                            target="_blank"
                            className="text-blue-500 hover:text-blue-600"
                          >
                            プライバシーポリシー
                          </Link>
                          に同意します
                        </label>
                      </div>
                    </div>
                    {errors.privacy && (
                      <p className="error text-red-500">{errors.privacy.message}</p>
                    )}
                  </div>
                </fieldset>

                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
                  onChange={onChange}
                  className="mt-3"
                />
                {errors.recaptcha && (
                  <p className="error text-red-500">{errors.recaptcha.message}</p>
                )}

                <div>
                  <button
                    type="submit"
                    className={`cursor-pointer block w-full rounded-md px-3.5 py-2.5 text-white text-center text-sm font-semibold shadow-s bg-blue-500 hover:bg-blue-600`}
                  >
                    アカウントを登録する
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
                    <span className="text-sm/6 font-semibold">Googleで登録</span>
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
                    <span className="text-sm/6 font-semibold">GitHubで登録</span>
                  </button>
                  <button
                    onClick={handleTwitterLogin}
                    className="mt-3 flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                  >
                    <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5 text-black">
                      <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
                    </svg>
                    <span className="text-sm/6 font-semibold">X（旧Twitter）で登録</span>
                  </button>
                </div>
              </div>
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
      </HomeContainer>

      <Alert
        show={errorShow}
        onClose={() => setErrorShow(false)}
        title={errorTitle}
        description={errorMessage}
        Icon={ExclamationCircleIcon}
      />

      <Alert
        show={confirmShow}
        onClose={() => setConfirmShow(false)}
        title={ConfirmTitle}
        description={ConfirmMessage}
        Icon={CheckCircleIcon}
      />
    </>
  );
}
