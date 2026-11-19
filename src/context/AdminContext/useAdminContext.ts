import { createContext, useContext } from 'react';

export type AdminAuthValue = {
  loggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
};

export const AdminAuthContext = createContext<AdminAuthValue | null>(null);

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error('useAdminAuth must be used inside <AdminAuthProvider>');
  }

  return context;
}
