import ReCAPTCHA from 'react-google-recaptcha';

type Props = {
  onChange: any;
  recaptchaRef: any;
  errors: any;
};

export default function Recaptcha({ recaptchaRef, onChange, errors }: Props) {
  return (
    <>
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        onChange={onChange}
        className="mt-3"
      />
      {errors && <p className="text-red-500">{errors.message}</p>}
    </>
  );
}
