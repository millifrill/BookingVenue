import { createContext, useContext } from 'react';

export type AdminAuthValue = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  token: string | null;
  setToken: (value: string | null) => void;
};

export const AdminAuthContext = createContext<AdminAuthValue | null>(null);

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error('useAdminAuth must be used inside <AdminAuthProvider>');
  }

  return context;
}
