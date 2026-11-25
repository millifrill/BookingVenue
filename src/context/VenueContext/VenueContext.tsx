import { useEffect, useState } from 'react';
import axios from 'axios';
import type { Venue } from '../../types/Venue';
import { VenueContext } from './useVenueContext';
import { API_URL } from '../../utils/constants';

export default function VenueProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [allVenues, setAllVenues] = useState<Venue[] | []>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [alert, setAlert] = useState<{
    variant: 'success' | 'danger';
    text: string;
  } | null>(null);

  useEffect(() => {
    async function getAllVenues(): Promise<void> {
      setErrorMsg(null);
      try {
        const res = await axios.get<Venue[]>(`${API_URL}/venues`);
        setAllVenues(res.data);
      } catch (error) {
        console.error('Failed to fetch Venues', error);
        setErrorMsg('Misslyckades med att ladda lokalerna');
      }
    }
    getAllVenues();
  }, []);

  return (
    <VenueContext.Provider
      value={{
        allVenues,
        errorMsg,
        setErrorMsg,
        setAllVenues,
        alert,
        setAlert,
      }}>
      {children}
    </VenueContext.Provider>
  );
}
