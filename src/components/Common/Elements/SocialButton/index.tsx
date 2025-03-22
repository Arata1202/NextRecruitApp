type Props = {
  title: string;
  Icon: any;
  onClick: () => void;
};

export default function SocialButton({ title, Icon, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="mt-3 flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
    >
      <Icon className="h-5 w-5" />
      <span className="text-sm/6 font-semibold">{title}</span>
    </button>
  );
}
