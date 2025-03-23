'use client';

import { supabase } from '@/libs/supabase';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { Form } from '@/types/form';
import Alert from '@/components/Common/Alert';
import AdUnit from '@/components/ThirdParties/GoogleAdSense/Elements/AdUnit';
import AuthTitleContainer from '@/components/Common/Layouts/Container/AuthTitleContainer';
import SwitchButton from '@/components/Common/Elements/Switch';
import AuthSubmitButton from '@/components/Common/Elements/AuthSubmitButton';
import AuthContentContainer from '@/components/Common/Layouts/Container/AuthContentContainer';
import InputContainer from '@/components/Common/Elements/InputContainer';

export default function PasswordResetFeature() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<Form>();
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

  const onSubmit = async (data: Form) => {
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
          <AuthSubmitButton title="パスワードをリセットする" />
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
        show={confirmShow}
        onClose={() => setConfirmShow(false)}
        title={ConfirmTitle}
        description={ConfirmMessage}
        Icon={CheckCircleIcon}
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
