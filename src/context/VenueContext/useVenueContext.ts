import { createContext, useContext } from 'react';
import type { VenueContextValue } from '../../types/Venue';

export const VenueContext = createContext<VenueContextValue | null>(null);

export function useVenueContext() {
  const context = useContext(VenueContext);

  if (!context) {
    throw new Error('useVenue must be used inside <VenueProvider>');
  }

  return context;
}
