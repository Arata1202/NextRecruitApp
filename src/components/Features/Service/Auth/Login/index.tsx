'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { supabase } from '@/libs/supabase';
import { useGoogleLogin, useGithubLogin, useTwitterLogin } from '@/hooks/useSocialLogin';
import { Form } from '@/types/form';
import Alert from '@/components/Common/Alert';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import AdUnit from '@/components/ThirdParties/GoogleAdSense/Elements/AdUnit';
import AuthTitleContainer from '@/components/Common/Layouts/Container/AuthTitleContainer';
import { GoogleIcon, XIcon, GitHubIcon } from '@/components/Common/Elements/SocialIcon';
import SocialButton from '@/components/Common/Elements/SocialButton';
import SocialLoginContainer from '@/components/Common/Layouts/Container/SocialLoginContainer';
import SwitchButton from '@/components/Common/Elements/Switch';
import SubmitButton from '@/components/Common/Elements/SubmitButton';
import AuthContentContainer from '@/components/Common/Layouts/Container/AuthContentContainer';
import InputContainer from '@/components/Common/Elements/InputContainer';

export default function LoginFeature() {
  const router = useRouter();
  const [enabled, setEnabled] = useState(false);
  const [errorPasswordLoginAlertOpen, setErrorPasswordLoginAlertOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Form>();

  useEffect(() => {
    if (errorPasswordLoginAlertOpen) {
      const timer = setTimeout(() => {
        setErrorPasswordLoginAlertOpen(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorPasswordLoginAlertOpen]);

  const onSubmit = async (data: Form) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      setErrorPasswordLoginAlertOpen(true);
      reset();
      return;
    }

    await router.push('/service');
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
      <AuthContentContainer>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <InputContainer
            label="メールアドレス"
            name="email"
            registerResult={register('email', {
              required: '※ メールアドレスを入力してください',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: '※ 有効なメールアドレスを入力してください',
              },
            })}
            errors={errors.email}
          />
          <InputContainer
            label="パスワード"
            name="password"
            type={enabled ? 'text' : 'password'}
            registerResult={register('password', {
              required: '※ パスワードを入力してください',
              minLength: {
                value: 8,
                message: '※ パスワードは8文字以上で入力してください',
              },
              validate: (value) => {
                if (!/[A-Z]/.test(value)) {
                  return '※ 大文字を1文字以上含めてください';
                }
                if (!/[a-z]/.test(value)) {
                  return '※ 小文字を1文字以上含めてください';
                }
                if (!/\d/.test(value)) {
                  return '※ 数字を1文字以上含めてください';
                }
                if (!/[@$!%*?&]/.test(value)) {
                  return '※ 記号を1文字以上含めてください';
                }
                return true;
              },
            })}
            errors={errors.password}
          />
          <SwitchButton title="パスワードを表示する" checked={enabled} onChange={setEnabled} />
          <SubmitButton title="ログイン" />
        </form>
        <SocialLoginContainer>
          <SocialButton title="Googleでログイン" Icon={GoogleIcon} onClick={useGoogleLogin} />
          <SocialButton title="GitHubでログイン" Icon={GitHubIcon} onClick={useGithubLogin} />
          <SocialButton title="X（旧Twitter）でログイン" Icon={XIcon} onClick={useTwitterLogin} />
        </SocialLoginContainer>
      </AuthContentContainer>
      <p className="mt-6 text-center text-sm/6">
        <Link href="/service/auth/sendemail" className="text-blue-500 hover:text-blue-600">
          パスワードをお忘れの方はこちら
        </Link>
      </p>
      <AdUnit
        slot="7998948559"
        style={{
          marginTop: '1.25rem',
          paddingBottom: '2.75rem',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
        }}
      />

      <Alert
        show={errorPasswordLoginAlertOpen}
        onClose={() => setErrorPasswordLoginAlertOpen(false)}
        title="ログインに失敗しました。"
        description="もう一度やり直してください。"
        Icon={ExclamationCircleIcon}
      />
    </>
  );
}
