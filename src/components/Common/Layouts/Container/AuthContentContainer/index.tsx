type Props = {
  children: React.ReactNode;
};

export default function AuthContentContainer({ children }: Props) {
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div className="bg-white px-6 py-12 border border-gray-300 sm:rounded-lg sm:px-12">
        {children}
      </div>
    </div>
  );
}
