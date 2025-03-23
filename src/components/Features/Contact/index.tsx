'use client';

import { useState, useEffect, useRef } from 'react';
import { EnvelopeIcon } from '@heroicons/react/24/solid';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha';
import { Form } from '@/types/form';
import InputContainer from '../../Common/Elements/InputContainer';
import Modal from '@/components/Common/Modal';
import Alert from '@/components/Common/Alert';

export default function ContactFeature() {
  const [confirmSendEmailModalOpen, setConfirmSendEmailModalOpen] = useState(false);
  const [successSendEmailAlertOpen, setSuccessSendEmailAlertOpen] = useState(false);
  const [formData, setFormData] = useState<Form | null>(null);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors },
    reset,
  } = useForm<Form>();

  const handleSubmit = (data: Form) => {
    setFormData(data);
    setConfirmSendEmailModalOpen(true);
  };

  const handleChangeCaptchaValue = (value: string | null) => {
    setCaptchaValue(value);
  };

  const handleRecaptcha = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_RECAPTCHA_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'g-recaptcha-response': captchaValue,
      }),
    });

    const data = await response.json();

    if (data.success) {
      handleSendEmail();
    } else {
      console.error(data.message);
    }
  };

  const handleSendEmail = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SENDEMAIL_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.success) {
      setSuccessSendEmailAlertOpen(true);
      reset();
      recaptchaRef.current?.reset();
      setConfirmSendEmailModalOpen(false);
    } else {
      console.error(data.message);
    }
  };

  useEffect(() => {
    if (successSendEmailAlertOpen) {
      const timer = setTimeout(() => {
        setSuccessSendEmailAlertOpen(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successSendEmailAlertOpen]);

  return (
    <>
      <p className="mt-2 text-lg/8">
        リクビジョンに関するご質問やご要望などがございましたら、お気軽にお問い合わせください。
      </p>
      <form onSubmit={onSubmit(handleSubmit)} method="POST" className="mx-auto max-w-3xl">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <InputContainer
            label="メールアドレス"
            name="email"
            registerResult={register('email', {
              required: '※ メールアドレスを入力してください',
              pattern: {
                value: /^\S+@\S+$/i,
                message: '※ 有効なメールアドレスを入力してください',
              },
            })}
            errors={errors.email}
          />
          <InputContainer
            label="件名"
            name="title"
            registerResult={register('title', { required: '※ 件名を入力してください' })}
            errors={errors.title}
          />
          <InputContainer
            textarea={true}
            label="内容"
            name="message"
            registerResult={register('message', { required: '※ 内容を入力してください' })}
            errors={errors.message}
          />
        </div>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          onChange={handleChangeCaptchaValue}
          className="mt-3"
        />
        <div className="mt-3">
          <button
            type="submit"
            disabled={!captchaValue}
            className={`cursor-pointer block w-full rounded-md px-3.5 py-2.5 text-white text-center text-sm font-semibold shadow-s bg-blue-500 hover:bg-blue-600`}
          >
            送信
          </button>
        </div>
      </form>

      <Modal
        show={confirmSendEmailModalOpen}
        title="お問い合わせを送信しますか？"
        Icon={EnvelopeIcon}
        onClose={() => setConfirmSendEmailModalOpen(false)}
        onConfirm={handleRecaptcha}
        cancelText="キャンセル"
        confirmText="送信"
      />

      <Alert
        show={successSendEmailAlertOpen}
        title="お問い合わせありがとうございます"
        description="正常に処理が完了しました。"
        Icon={CheckCircleIcon}
        onClose={() => setSuccessSendEmailAlertOpen(false)}
      />
    </>
  );
}
