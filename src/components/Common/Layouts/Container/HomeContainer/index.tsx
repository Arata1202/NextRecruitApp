import styles from './index.module.css';

type Props = {
  children: React.ReactNode;
  white?: boolean;
};

export default function HomeContainer({ children, white = false }: Props) {
  return <div className={`${styles.container} ${white && styles.whiteContainer}`}>{children}</div>;
}
