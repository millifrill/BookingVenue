import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { ADMIN_PATH, MAIN_LINKS } from '../../config/navigation';
import Logo from '../Logo/Logo';
import styles from './Header.module.css';
import { useAdminAuth } from '../../context/AdminContext/useAdminContext';
import { PersonLock, PersonCheck } from 'react-bootstrap-icons';

export default function Header() {
  const { loggedIn } = useAdminAuth();

  return (
    <Navbar
      as='header'
      expand='lg'
      collapseOnSelect
      className={styles['site-header']}>
      <Container className={styles['site-header-container']}>
        <Navbar.Brand
          as={Link}
          to='/'
          className={styles['site-header-brand']}>
          <Logo />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls='mainMenu'
          label='Visa meny'
          className={styles['site-header-toggle']}
        />
        <Navbar.Collapse id='mainMenu'>
          <Nav
            as='nav'
            aria-label='Huvudmeny'
            className={styles['site-header-nav']}>
            {MAIN_LINKS.map(({ label, to, end }) => (
              <Nav.Link
                key={to}
                as={NavLink}
                to={to}
                end={end}
                eventKey={to}>
                {label}
              </Nav.Link>
            ))}
          </Nav>
          <Nav className={styles['site-header-actions']}>
            <Nav.Link
              as={NavLink}
              to={ADMIN_PATH}
              eventKey={ADMIN_PATH}
              className={styles['site-header-admin']}>
              {loggedIn ? <PersonCheck size={30} /> : <PersonLock size={30} />}
              Admin
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
