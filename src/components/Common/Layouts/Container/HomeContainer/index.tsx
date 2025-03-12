import styles from './index.module.css';

type Props = {
  children: React.ReactNode;
};

export default function HomeContainer({ children }: Props) {
  return <div className={styles.container}>{children}</div>;
}
