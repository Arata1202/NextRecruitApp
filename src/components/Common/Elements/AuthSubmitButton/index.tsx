type Props = {
  title: string;
};

export default function AuthSubmitButton({ title }: Props) {
  return (
    <button
      type="submit"
      className={`cursor-pointer block w-full rounded-md px-3.5 py-2.5 text-white text-center text-sm font-semibold shadow-s bg-blue-500 hover:bg-blue-600`}
    >
      {title}
    </button>
  );
}
