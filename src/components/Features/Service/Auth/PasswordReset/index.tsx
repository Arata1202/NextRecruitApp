'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { supabase } from '@/libs/supabase';
import { PasswordReset } from '@/types/form';
import Alert from '@/components/Common/Alert';
import AdUnit from '@/components/ThirdParties/GoogleAdSense/Elements/AdUnit';
import AuthTitleContainer from '@/components/Common/Layouts/Container/AuthTitleContainer';
import SwitchButton from '@/components/Common/Elements/Switch';
import SubmitButton from '@/components/Common/Elements/SubmitButton';
import AuthContentContainer from '@/components/Common/Layouts/Container/AuthContentContainer';
import InputContainer from '@/components/Common/Elements/InputContainer';

export default function PasswordResetFeature() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<PasswordReset>();

  const router = useRouter();
  const password = watch('password');
  const [enabled, setEnabled] = useState(false);
  const [errorPasswordResetAlertOpen, setErrorPasswordResetAlertOpen] = useState(false);
  const [successPasswordResetAlertOpen, setSuccessPasswordResetAlertOpen] = useState(false);

  useEffect(() => {
    if (errorPasswordResetAlertOpen || successPasswordResetAlertOpen) {
      const timer = setTimeout(() => {
        setErrorPasswordResetAlertOpen(false);
        setSuccessPasswordResetAlertOpen(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorPasswordResetAlertOpen, successPasswordResetAlertOpen]);

  const onSubmit = async (data: PasswordReset) => {
    const { error } = await supabase.auth.updateUser({
      password: data.password,
    });

    if (error) {
      setErrorPasswordResetAlertOpen(true);
      reset();
      return;
    }

    setSuccessPasswordResetAlertOpen(true);
    reset();
    setTimeout(() => {
      router.push('/service');
    }, 5000);
  };

  return (
    <>
      <AuthTitleContainer title="パスワードリセット">
        新しいパスワードを入力して、
        <br />
        パスワードリセットを完了させてください。
      </AuthTitleContainer>
      <AuthContentContainer>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
          <SubmitButton title="パスワードをリセットする" />
        </form>
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
        show={errorPasswordResetAlertOpen}
        onClose={() => setErrorPasswordResetAlertOpen(false)}
        title="パスワードリセットに失敗しました。"
        description="新しいパスワードは以前のパスワードと異なるものを設定してください。"
        Icon={ExclamationCircleIcon}
      />

      <Alert
        show={successPasswordResetAlertOpen}
        onClose={() => setSuccessPasswordResetAlertOpen(false)}
        title="パスワードリセットが完了しました。"
        description="5秒後に自動でログインします。"
        Icon={CheckCircleIcon}
      />
    </>
  );
}
