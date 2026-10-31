import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ADMIN_PATH, MAIN_LINKS } from '../../config/navigation';
import Logo from '../Logo/Logo';
import styles from './Footer.module.css';

const FOOTER_LINKS = [...MAIN_LINKS, { label: 'För värdar', to: ADMIN_PATH }];

export default function Footer() {
  return (
    <footer className={styles['site-footer']}>
      <Container className={styles['site-footer-container']}>
        <div className={styles['site-footer-brand']}>
          <Link
            to='/'
            className={styles['site-footer-logo-link']}>
            <Logo />
          </Link>
          <p className={styles['site-footer-tagline']}>
            Utvalda lokaler i hela Sverige.
          </p>
        </div>
        <nav
          aria-label='Sidfot'
          className={styles['site-footer-nav']}>
          {FOOTER_LINKS.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={styles['site-footer-link']}>
              {label}
            </Link>
          ))}
        </nav>
        <small className={styles['site-footer-copyright']}>
          © {new Date().getFullYear()} BookingVenue AB
        </small>
      </Container>
    </footer>
  );
}
