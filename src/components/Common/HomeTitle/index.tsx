type Props = {
  title: string;
  Icon: any;
};

export default function HomeTitle({ title, Icon }: Props) {
  return (
    <div className="flex">
      <Icon className="h-7 w-7 mr-2" />
      <h1>{title}</h1>
    </div>
  );
}
