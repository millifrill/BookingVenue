import { useEffect, useState } from 'react';
import axios from 'axios';
import type { Venue } from '../../types/Venue';
import { VenueContext } from './useVenue';

export default function VenueProvider({
   children,
}: {
   children: React.ReactNode;
}) {
   const [allVenues, setAllVenues] = useState<Venue[] | []>([]);
   const [errorMsg, setErrorMsg] = useState<string | null>(null);

   useEffect(() => {
      async function getAllVenues(): Promise<void> {
         setErrorMsg(null);
         try {
            const res = await axios.get<Venue[]>(
               'http://localhost:3000/api/venues',
            );
            console.log('res.data', res.data);
            setAllVenues(res.data);
         } catch (error) {
            console.error('Failed to fetch Venues', error);
            setErrorMsg('Misslyckades med att ladda lokalerna');
         }
      }
      getAllVenues();
   }, []);

   return (
      <VenueContext.Provider value={{ allVenues, errorMsg, setErrorMsg }}>
         {children}
      </VenueContext.Provider>
   );
}
