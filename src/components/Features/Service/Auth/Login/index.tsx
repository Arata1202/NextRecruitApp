'use client';

import Link from 'next/link';
import { supabase } from '@/libs/supabase';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Alert from '@/components/Common/Alert';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import AdUnit from '@/components/ThirdParties/GoogleAdSense/Elements/AdUnit';
import AuthTitleContainer from '@/components/Common/Layouts/Container/AuthTitleContainer';
import { GoogleIcon, XIcon, GitHubIcon } from '@/components/Common/Elements/SocialIcon';
import SocialButton from '@/components/Common/Elements/SocialButton';
import SocialLoginContainer from '@/components/Common/Layouts/Container/SocialLoginContainer';
import SwitchButton from '@/components/Common/Elements/Switch';
import AuthSubmitButton from '@/components/Common/Elements/AuthSubmitButton';

type FormData = {
  email: string;
  password: string;
};

export default function LoginFeature() {
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
    const { error: signInError } = await supabase.auth.signInWithPassword({
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
      <AuthTitleContainer title="ログイン">
        アカウントをお持ちでない方は、
        <br />
        こちらから
        <Link href="/service/auth/signup" className="text-blue-500 hover:text-blue-600">
          アカウントを登録
        </Link>
        いただけます。
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
                  required
                  autoComplete="email"
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
            <SwitchButton title="パスワードを表示する" checked={enabled} onChange={setEnabled} />
            <AuthSubmitButton title="ログイン" />
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
      <p className="mt-6 text-center text-sm/6">
        <Link href="/service/auth/sendemail" className="text-blue-500 hover:text-blue-600">
          パスワードをお忘れの方はこちら
        </Link>
      </p>
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
    </>
  );
}
