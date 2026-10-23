import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { ADMIN_PATH, MAIN_LINKS } from '../../config/navigation';
import Logo from '../Logo/Logo';
import './Header.css';

function LockIcon() {
   return (
      <svg
         className="site-header__icon"
         width="16"
         height="16"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round"
         aria-hidden="true"
      >
         <rect x="3" y="11" width="18" height="11" rx="2" />
         <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
   );
}

export default function Header() {
   return (
      <Navbar
         as="header"
         expand="md"
         collapseOnSelect
         className="site-header"
      >
         <Container className="site-header__container">
            <Navbar.Brand as={Link} to="/" className="site-header__brand">
               <Logo />
            </Navbar.Brand>
            <Navbar.Toggle
               aria-controls="main-menu"
               label="Visa meny"
               className="site-header__toggle"
            />
            <Navbar.Collapse id="main-menu">
               <Nav
                  as="nav"
                  aria-label="Huvudmeny"
                  className="site-header__nav"
               >
                  {MAIN_LINKS.map(({ label, to, end }) => (
                     <Nav.Link
                        key={to}
                        as={NavLink}
                        to={to}
                        end={end}
                        eventKey={to}
                     >
                        {label}
                     </Nav.Link>
                  ))}
               </Nav>
               <Nav className="site-header__actions">
                  <Nav.Link
                     as={NavLink}
                     to={ADMIN_PATH}
                     eventKey={ADMIN_PATH}
                     className="site-header__admin"
                  >
                     <LockIcon />
                     Admin
                  </Nav.Link>
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
}
