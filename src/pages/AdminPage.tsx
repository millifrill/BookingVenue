import { Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminContext/useAdminContext';

export default function AdminPage() {
  const { loggedIn, setLoggedIn } = useAdminAuth();

  if (!loggedIn) {
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
      <Button onClick={() => setLoggedIn(false)}>Logga ut</Button>
    </section>
  );
}
