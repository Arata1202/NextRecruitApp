type Props = {
  children: React.ReactNode;
};

export default function SocialLoginContainer({ children }: Props) {
  return (
    <div>
      <div className="relative mt-10">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm/6 font-medium">
          <span className="bg-white px-6">ソーシャルアカウントでログイン</span>
        </div>
      </div>
      <div className="mt-6">{children}</div>
    </div>
  );
}
