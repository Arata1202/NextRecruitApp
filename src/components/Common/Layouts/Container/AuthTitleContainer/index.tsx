import styles from './index.module.css';

type Props = {
  children: React.ReactNode;
  title: string;
};

export default function AuthTitleContainer({ children, title }: Props) {
  return (
    <div className="pt-6 sm:mx-auto sm:w-full sm:max-w-md">
      <h2 className="text-center text-2xl/9 font-bold tracking-tight">{title}</h2>
      <div className={`${styles.text} text-center mt-5`}>{children}</div>
    </div>
  );
}
