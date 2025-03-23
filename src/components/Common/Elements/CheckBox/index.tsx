type Props = {
  children: React.ReactNode;
  name: string;
  registerResult: any;
  errors: any;
};

export default function CheckBox({ children, name, registerResult, errors }: Props) {
  return (
    <fieldset>
      <div className="space-y-5">
        <div className="relative flex items-start">
          <div className="flex h-6 items-center">
            <input
              id={name}
              type="checkbox"
              required
              {...registerResult}
              className="text-gray-300 size-4 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
            />
          </div>
          <div className="ml-3 text-sm/6">
            <label className="font-medium">{children}</label>
          </div>
        </div>
        {errors && <p className="text-red-500">{errors.message}</p>}
      </div>
    </fieldset>
  );
}
