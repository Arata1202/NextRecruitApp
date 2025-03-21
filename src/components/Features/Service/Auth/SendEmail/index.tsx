'use client';

import HomeContainer from '@/components/Common/Layouts/Container/HomeContainer';
import { supabase } from '@/libs/supabase';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import AdUnit from '@/components/ThirdParties/GoogleAdSense/Elements/AdUnit';
import Alert from '@/components/Common/Alert';
import BreadCrumb from '@/components/Common/BreadCrumb';

type FormData = {
  email: string;
};

export default function SendEmailFeature() {
  const [confirmShow, setConfirmShow] = useState(false);
  const [ConfirmTitle, setConfirmTitle] = useState('');
  const [ConfirmMessage, setConfirmMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    if (confirmShow) {
      const timer = setTimeout(() => {
        setConfirmShow(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [confirmShow]);

  const onSubmit = async (data: FormData) => {
    try {
      const { error: sendEmailError } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/service/auth/passwordreset`,
      });
      if (sendEmailError) {
        throw sendEmailError;
      }
      setConfirmTitle('確認メールを送信しました。');
      setConfirmMessage('メール内のリンクからパスワードリセットを完了させてください。');
      setConfirmShow(true);
      reset();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <HomeContainer white={true}>
        <BreadCrumb title="パスワードリセット" path="service/auth/sendemail" />
        <div className="pt-6">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="text-center text-2xl/9 font-bold tracking-tight">パスワードリセット</h2>
            <div className="text-center mt-5" style={{ fontSize: '14px' }}>
              パスワードリセット用のメールを送信します。
              <br />
              リクビジョンに登録されているメールアドレスをご入力ください。
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
                  <button
                    type="submit"
                    className={`cursor-pointer block w-full rounded-md px-3.5 py-2.5 text-white text-center text-sm font-semibold shadow-s bg-blue-500 hover:bg-blue-600`}
                  >
                    メールを送信
                  </button>
                </div>
              </form>
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
        show={confirmShow}
        onClose={() => setConfirmShow(false)}
        title={ConfirmTitle}
        description={ConfirmMessage}
        Icon={CheckCircleIcon}
      />
    </>
  );
}
