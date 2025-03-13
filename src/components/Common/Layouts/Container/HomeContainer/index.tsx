import styles from './index.module.css';

type Props = {
  children: React.ReactNode;
  auth?: boolean;
};

export default function HomeContainer({ children, auth = false }: Props) {
  return <div className={(auth && styles.authContainer) || styles.container}>{children}</div>;
}
