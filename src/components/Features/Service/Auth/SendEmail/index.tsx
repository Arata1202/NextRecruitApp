'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { supabase } from '@/libs/supabase';
import { Form } from '@/types/form';
import AdUnit from '@/components/ThirdParties/GoogleAdSense/Elements/AdUnit';
import Alert from '@/components/Common/Alert';
import AuthTitleContainer from '@/components/Common/Layouts/Container/AuthTitleContainer';
import SubmitButton from '@/components/Common/Elements/SubmitButton';
import AuthContentContainer from '@/components/Common/Layouts/Container/AuthContentContainer';
import InputContainer from '@/components/Common/Elements/InputContainer';

export default function SendEmailFeature() {
  const [successSendEmailAlertOpen, setSuccessSendEmailAlertOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Form>();

  useEffect(() => {
    if (successSendEmailAlertOpen) {
      const timer = setTimeout(() => {
        setSuccessSendEmailAlertOpen(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successSendEmailAlertOpen]);

  const onSubmit = async (data: Form) => {
    await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${window.location.origin}/service/auth/passwordreset`,
    });

    setSuccessSendEmailAlertOpen(true);
    reset();
  };

  return (
    <>
      <AuthTitleContainer title="パスワードリセット">
        パスワードリセット用のメールを送信します。
        <br />
        リクビジョンに登録されているメールアドレスをご入力ください。
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
          <SubmitButton title="メールを送信" />
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
        show={successSendEmailAlertOpen}
        onClose={() => setSuccessSendEmailAlertOpen(false)}
        title="確認メールを送信しました。"
        description="メール内のリンクからパスワードリセットを完了させてください。"
        Icon={CheckCircleIcon}
      />
    </>
  );
}
