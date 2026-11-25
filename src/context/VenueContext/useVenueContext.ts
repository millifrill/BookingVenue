import { createContext, useContext } from 'react';
import type { Venue } from '../../types/Venue';

interface VenueContextValue {
  allVenues: Venue[];
  errorMsg: string | null;
  setErrorMsg: React.Dispatch<React.SetStateAction<string | null>>;
  setAllVenues: React.Dispatch<React.SetStateAction<Venue[]>>;
  alert: { variant: 'success' | 'danger'; text: string } | null;
  setAlert: React.Dispatch<
    React.SetStateAction<{ variant: 'success' | 'danger'; text: string } | null>
  >;
}

export const VenueContext = createContext<VenueContextValue | null>(null);

export function useVenueContext() {
  const context = useContext(VenueContext);

  if (!context) {
    throw new Error('useVenue must be used inside <VenueProvider>');
  }

  return context;
}
