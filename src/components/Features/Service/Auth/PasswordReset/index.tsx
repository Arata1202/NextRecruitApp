'use client';

import { supabase } from '@/libs/supabase';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import Alert from '@/components/Common/Alert';
import AdUnit from '@/components/ThirdParties/GoogleAdSense/Elements/AdUnit';
import AuthTitleContainer from '@/components/Common/Layouts/Container/AuthTitleContainer';
import SwitchButton from '@/components/Common/Elements/Switch';
import AuthSubmitButton from '@/components/Common/Elements/AuthSubmitButton';

type FormData = {
  password: string;
  passwordConf: string;
};

export default function PasswordResetFeature() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormData>();
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

  const onSubmit = async (data: FormData) => {
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
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 border border-gray-300 sm:rounded-lg sm:px-12">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
            <SwitchButton title="パスワードを表示する" checked={enabled} onChange={setEnabled} />
            <AuthSubmitButton title="パスワードをリセットする" />
          </form>
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
