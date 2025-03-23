type Props = {
  label: string;
  name: string;
  registerResult: any;
  errors: any;
  textarea?: boolean;
  type?: string;
};

export default function InputContainer({
  label,
  name,
  registerResult,
  errors,
  textarea = false,
  type,
}: Props) {
  return (
    <div className="sm:col-span-2">
      <label className={`block text-sm font-semibold leading-6`}>{label}</label>
      <div className="mt-2.5">
        {!textarea && (
          <input
            {...registerResult}
            type={type === 'password' ? 'password' : 'text'}
            id={name}
            name={name}
            autoComplete={name}
            className={`block w-full rounded-md border py-2 pl-3 pr-3 sm:text-sm sm:leading-6 border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none`}
          />
        )}
        {textarea && (
          <textarea
            {...registerResult}
            id={name}
            name={name}
            rows={4}
            className={`block w-full rounded-md border py-2 pl-3 pr-3 sm:text-sm sm:leading-6 border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none`}
          />
        )}
        {errors && <p className="text-red-500">{errors.message}</p>}
      </div>
    </div>
  );
}
