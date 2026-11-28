import { Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminContext/useAdminContext';
import AddVenue from '../components/AddVenue/AddVenue';

export default function AdminPage() {
  const { isLoggedIn, setIsLoggedIn, setToken } = useAdminAuth();

  function logOut() {
    setIsLoggedIn(false);
    setToken(null);
  }

  if (!isLoggedIn) {
    return (
      <Navigate
        to='/admin/login'
        replace
      />
    );
  }

  return (
    <section className='text-center'>
      <h1>Admin</h1>
      <Button onClick={logOut}>Logga ut</Button>
      <AddVenue />
    </section>
  );
}
