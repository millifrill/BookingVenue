import styles from './Logo.module.css';

export default function Logo() {
  return (
    <span className={styles.logo}>
      BookingVenue<span className={styles['logo-dot']}>.</span>
    </span>
  );
}
