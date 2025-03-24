'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import ReCAPTCHA from 'react-google-recaptcha';
import { supabase } from '@/libs/supabase';
import { useGoogleLogin, useGithubLogin, useTwitterLogin } from '@/hooks/useSocialLogin';
import { SignUp } from '@/types/form';
import Alert from '@/components/Common/Alert';
import AdUnit from '@/components/ThirdParties/GoogleAdSense/Elements/AdUnit';
import AuthTitleContainer from '@/components/Common/Layouts/Container/AuthTitleContainer';
import { GoogleIcon, XIcon, GitHubIcon } from '@/components/Common/Elements/SocialIcon';
import SocialButton from '@/components/Common/Elements/SocialButton';
import SocialLoginContainer from '@/components/Common/Layouts/Container/SocialLoginContainer';
import SwitchButton from '@/components/Common/Elements/Switch';
import SubmitButton from '@/components/Common/Elements/SubmitButton';
import AuthContentContainer from '@/components/Common/Layouts/Container/AuthContentContainer';
import InputContainer from '@/components/Common/Elements/InputContainer';
import CheckBox from '@/components/Common/Elements/CheckBox';
import Recaptcha from '@/components/Common/Elements/Recaptcha';

export default function SignUpFeature() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors,
    reset,
  } = useForm<SignUp>();

  const password = watch('password');
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [successSendEmailAlertOpen, setSuccessSendEmailAlertOpen] = useState(false);
  const [errorAlreadyRegisteredAlertOpen, setErrorAlreadyRegisteredAlertOpen] = useState(false);
  const [errorVerificationRecaptchaAlertOpen, setErrorVerificationRecaptchaAlertOpen] =
    useState(false);

  useEffect(() => {
    if (
      errorVerificationRecaptchaAlertOpen ||
      errorAlreadyRegisteredAlertOpen ||
      successSendEmailAlertOpen
    ) {
      const timer = setTimeout(() => {
        setErrorVerificationRecaptchaAlertOpen(false);
        setErrorAlreadyRegisteredAlertOpen(false);
        setSuccessSendEmailAlertOpen(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [
    errorVerificationRecaptchaAlertOpen,
    errorAlreadyRegisteredAlertOpen,
    successSendEmailAlertOpen,
  ]);

  const handleChangeCaptchaValue = (value: string | null) => {
    setCaptchaValue(value);
    if (value) {
      clearErrors('recaptcha');
    }
  };

  const onSubmit = async (data: SignUp) => {
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
      setErrorVerificationRecaptchaAlertOpen(true);
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
      setErrorAlreadyRegisteredAlertOpen(true);
      reset();
      recaptchaRef.current?.reset();
      return;
    }
    setSuccessSendEmailAlertOpen(true);
    reset();
    recaptchaRef.current?.reset();
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
          <Recaptcha
            recaptchaRef={recaptchaRef}
            onChange={handleChangeCaptchaValue}
            errors={errors.recaptcha}
          />
          <SubmitButton title="アカウントを登録する" />
        </form>
        <SocialLoginContainer>
          <SocialButton title="Googleでログイン" Icon={GoogleIcon} onClick={useGoogleLogin} />
          <SocialButton title="GitHubでログイン" Icon={GitHubIcon} onClick={useGithubLogin} />
          <SocialButton title="X（旧Twitter）でログイン" Icon={XIcon} onClick={useTwitterLogin} />
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
        show={errorVerificationRecaptchaAlertOpen}
        onClose={() => setErrorVerificationRecaptchaAlertOpen(false)}
        title="reCAPTCHAの検証に失敗しました。"
        description="お手数ですが、最初からやり直してください。"
        Icon={ExclamationCircleIcon}
      />

      <Alert
        show={errorAlreadyRegisteredAlertOpen}
        onClose={() => setErrorAlreadyRegisteredAlertOpen(false)}
        title="このメールアドレスは既に登録されています。"
        description="別のメールアドレスを使用するか、ログインしてください。"
        Icon={ExclamationCircleIcon}
      />

      <Alert
        show={successSendEmailAlertOpen}
        onClose={() => setSuccessSendEmailAlertOpen(false)}
        title="確認メールを送信しました。"
        description="メール内のリンクから登録を完了させてください。"
        Icon={CheckCircleIcon}
      />
    </>
  );
}
