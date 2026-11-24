import { useState, useEffect } from 'react';
import { AdminAuthContext } from './useAdminContext';

export default function AdminAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState(() => localStorage.getItem('admin'));
  const [loggedIn, setLoggedIn] = useState(
    () => localStorage.getItem('admin') !== null,
  );

  useEffect(() => {
    if (token === null) {
      localStorage.removeItem('admin');
      return;
    }
    localStorage.setItem('admin', token);
  }, [token]);

  return (
    <AdminAuthContext.Provider
      value={{ loggedIn, setLoggedIn, token, setToken }}>
      {children}
    </AdminAuthContext.Provider>
  );
}
