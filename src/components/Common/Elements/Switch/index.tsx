import { Switch } from '@headlessui/react';

type Props = {
  title: string;
  checked: boolean;
  onChange: any;
};

export default function SwitchButton({ title, checked, onChange }: Props) {
  return (
    <div className="flex items-center">
      <Switch
        checked={checked}
        onChange={onChange}
        className="group relative inline-flex h-4 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-300 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 data-[checked]:bg-blue-500"
      >
        <span className="pointer-events-none inline-block size-3 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5" />
      </Switch>
      <div className="ml-3 text-sm/6">
        <label className="font-medium">{title}</label>
      </div>
    </div>
  );
}
