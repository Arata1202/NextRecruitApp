type Props = {
  children: React.ReactNode;
};

export default function FixedMainContainer({ children }: Props) {
  return <div className="mx-auto max-w-7xl p-6 lg:px-8">{children}</div>;
}
