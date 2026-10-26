import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ADMIN_PATH, MAIN_LINKS } from '../../config/navigation';
import Logo from '../Logo/Logo';
import './Footer.css';

const FOOTER_LINKS = [...MAIN_LINKS, { label: 'För värdar', to: ADMIN_PATH }];

export default function Footer() {
   return (
      <footer className="site-footer">
         <Container className="site-footer__container">
            <div className="site-footer__brand">
               <Link to="/" className="site-footer__logo-link">
                  <Logo />
               </Link>
               <p className="site-footer__tagline">
                  Utvalda lokaler i hela Sverige.
               </p>
            </div>
            <nav aria-label="Sidfot" className="site-footer__nav">
               {FOOTER_LINKS.map(({ label, to }) => (
                  <Link key={to} to={to} className="site-footer__link">
                     {label}
                  </Link>
               ))}
            </nav>
            <small className="site-footer__copyright">
               © {new Date().getFullYear()} BookingVenue AB
            </small>
         </Container>
      </footer>
   );
}
