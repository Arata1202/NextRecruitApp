'use client';

import Link from 'next/link';
import { supabase } from '@/libs/supabase';
import { useForm } from 'react-hook-form';
import { useState, useRef, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { Form } from '@/types/form';
import Alert from '@/components/Common/Alert';
import AdUnit from '@/components/ThirdParties/GoogleAdSense/Elements/AdUnit';
import AuthTitleContainer from '@/components/Common/Layouts/Container/AuthTitleContainer';
import { GoogleIcon, XIcon, GitHubIcon } from '@/components/Common/Elements/SocialIcon';
import SocialButton from '@/components/Common/Elements/SocialButton';
import SocialLoginContainer from '@/components/Common/Layouts/Container/SocialLoginContainer';
import SwitchButton from '@/components/Common/Elements/Switch';
import AuthSubmitButton from '@/components/Common/Elements/AuthSubmitButton';
import AuthContentContainer from '@/components/Common/Layouts/Container/AuthContentContainer';
import InputContainer from '@/components/Common/Elements/InputContainer';
import CheckBox from '@/components/Common/Elements/CheckBox';

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
  } = useForm<Form>();
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

  const onSubmit = async (data: Form) => {
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
      <AuthContentContainer>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <InputContainer
            label="メールアドレス"
            name="email"
            registerResult={register('email', {
              required: 'メールアドレスを入力してください。',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: '有効なメールアドレスを入力してください。',
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
          <InputContainer
            label="パスワード（確認）"
            name="passwordConf"
            type={enabled ? 'text' : 'password'}
            registerResult={register('passwordConf', {
              required: 'パスワード（確認）を入力してください。',
              validate: (value) => value === password || 'パスワードが一致しません。',
            })}
            errors={errors.passwordConf}
          />
          <SwitchButton title="パスワードを表示する" checked={enabled} onChange={setEnabled} />
          <CheckBox
            name="privacy"
            registerResult={register('privacy', {
              required: 'プライバシーポリシーへの同意が必要です。',
            })}
            errors={errors.privacy}
          >
            <Link href="/privacy" target="_blank" className="text-blue-500 hover:text-blue-600">
              プライバシーポリシー
            </Link>
            に同意します
          </CheckBox>
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
            onChange={onChange}
            className="mt-3"
          />
          {errors.recaptcha && <p className="error text-red-500">{errors.recaptcha.message}</p>}
          <AuthSubmitButton title="アカウントを登録する" />
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
      </AuthContentContainer>
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
