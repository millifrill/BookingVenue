import type { ReactNode } from 'react';
import styles from './FilterBar.module.css';

export default function FilterBar({ children }: { children: ReactNode }) {
  return <div className={styles['filter-bar']}>{children}</div>;
}
