import { useState } from 'react';
import { AdminAuthContext } from './useAdminContext';

export default function AdminAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <AdminAuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </AdminAuthContext.Provider>
  );
}
