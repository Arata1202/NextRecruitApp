'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { EnvelopeIcon } from '@heroicons/react/24/solid';
import ReCAPTCHA from 'react-google-recaptcha';
import Modal from '@/components/Common/Modal';
import Alert from '@/components/Common/Alert';
import InputContainer from './Elements/InputContainer';

export default function ContactFeature() {
  const [confirmSendEmailOpen, setConfirmSendEmailModalOpen] = useState(false);
  const [successSendEmailOpen, setSuccessSendEmailAlertOpen] = useState(false);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [formData, setContactFormData] = useState<FormData | null>(null);

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  interface FormData {
    sei: string;
    title: string;
    email: string;
    company: string;
    tel: string;
    message: string;
  }

  const resetCaptcha = useCallback(() => {
    recaptchaRef.current?.reset();
  }, []);

  const onChange = (value: string | null) => {
    console.log('Captcha value:', value);
    setCaptchaValue(value);
  };

  const onSubmit = (data: FormData) => {
    setContactFormData(data);
    setConfirmSendEmailModalOpen(true);
  };

  const sendEmail = useCallback(() => {
    if (!formData) return;

    fetch(`${process.env.NEXT_PUBLIC_API_SENDEMAIL_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log('Email sent successfully');
          setSuccessSendEmailAlertOpen(true);
          reset();
          resetCaptcha();
          setConfirmSendEmailModalOpen(false);
        } else {
          console.log('Failed to send email');
          setConfirmSendEmailModalOpen(false);
        }
      })
      .catch((error) => console.error('Error sending email:', error));
  }, [formData, reset, resetCaptcha]);

  const handleConfirmSendEmail = useCallback(() => {
    const verifyCaptcha = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_RECAPTCHA_URL}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            'g-recaptcha-response': captchaValue,
          }),
        });
        const data = await response.json();
        if (data.success) {
          sendEmail();
        } else {
          console.error('reCAPTCHA validation failed:', data.message);
        }
      } catch (error) {
        console.error('Error during reCAPTCHA validation:', error);
      }
    };

    verifyCaptcha();
  }, [captchaValue, sendEmail]);

  const handleCancelSendEmail = () => {
    setConfirmSendEmailModalOpen(false);
  };

  useEffect(() => {
    if (successSendEmailOpen) {
      const timer = setTimeout(() => {
        setSuccessSendEmailAlertOpen(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successSendEmailOpen]);

  return (
    <>
      <p className="mt-2 text-lg/8">
        リクビジョンに関するご質問やご要望などがございましたら、お気軽にお問い合わせください。
      </p>
      <form onSubmit={handleSubmit(onSubmit)} method="POST" className="mx-auto max-w-3xl">
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
          onChange={onChange}
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
        open={confirmSendEmailOpen}
        title="お問い合わせを送信しますか？"
        Icon={EnvelopeIcon}
        onClose={handleCancelSendEmail}
        onConfirm={handleConfirmSendEmail}
        cancelText="キャンセル"
        confirmText="送信"
      />

      <Alert
        open={successSendEmailOpen}
        title="お問い合わせありがとうございます"
        description="正常に処理が完了しました。"
        Icon={CheckCircleIcon}
        onClose={() => setSuccessSendEmailAlertOpen(false)}
      />
    </>
  );
}
