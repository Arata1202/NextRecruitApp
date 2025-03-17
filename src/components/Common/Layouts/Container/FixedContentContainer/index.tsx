import styles from './index.module.css';

type Props = {
  children: React.ReactNode;
};

export default function FixedContentContainer({ children }: Props) {
  return (
    <div className="mx-auto max-w-3xl text-base/7">
      <div className={`${styles.content}`}>{children}</div>
    </div>
  );
}
