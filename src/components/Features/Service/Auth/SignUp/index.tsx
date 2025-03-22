'use client';

import Link from 'next/link';
import { supabase } from '@/libs/supabase';
import { useForm } from 'react-hook-form';
import { Switch } from '@headlessui/react';
import { useState, useRef, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import Alert from '@/components/Common/Alert';
import AdUnit from '@/components/ThirdParties/GoogleAdSense/Elements/AdUnit';
import AuthTitleContainer from '@/components/Common/Layouts/Container/AuthTitleContainer';
import { GoogleIcon, XIcon, GitHubIcon } from '@/components/Common/Elements/SocialIcon';
import SocialButton from '@/components/Common/Elements/SocialButton';
import SocialLoginContainer from '@/components/Common/Layouts/Container/SocialLoginContainer';

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
      <AuthTitleContainer title="アカウント登録">
        初めてご利用の方は、新規アカウント登録が必要です。
        <br />
        アカウントをお持ちの方は、こちらから
        <Link href="/service/auth/login" className="text-blue-500 hover:text-blue-600">
          ログイン
        </Link>
        できます。
      </AuthTitleContainer>
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
                {errors.privacy && <p className="error text-red-500">{errors.privacy.message}</p>}
              </div>
            </fieldset>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
              onChange={onChange}
              className="mt-3"
            />
            {errors.recaptcha && <p className="error text-red-500">{errors.recaptcha.message}</p>}
            <div>
              <button
                type="submit"
                className={`cursor-pointer block w-full rounded-md px-3.5 py-2.5 text-white text-center text-sm font-semibold shadow-s bg-blue-500 hover:bg-blue-600`}
              >
                アカウントを登録する
              </button>
            </div>
          </form>
          <SocialLoginContainer>
            <SocialButton title="Googleでログイン" Icon={GoogleIcon} onClick={handleGoogleLogin} />
            <SocialButton title="GitHubでログイン" Icon={GitHubIcon} onClick={handleGithubLogin} />
            <SocialButton
              title="X（旧Twitter）でログイン"
              Icon={XIcon}
              onClick={handleTwitterLogin}
            />
          </SocialLoginContainer>
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
