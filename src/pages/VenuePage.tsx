import { useParams, Navigate } from 'react-router-dom';
import VenueDetail from '../components/VenueDetail/VenueDetail';
import { useEffect, useState } from 'react';
import type { Venue } from '../types/Venue';

export default function VenueDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    async function fetchVenue() {
      try {
        const response = await fetch(`http://localhost:3000/api/venue/${id}`);
        if (!response.ok) {
          setIsNotFound(true);
          throw new Error(`Error status: ${response.status}`);
        }
        const data: Venue = await response.json();
        setVenue(data);
        console.log('Venue details:', data);
      } catch (error) {
        console.error('Error fetching venue:', error);
        setIsNotFound(true);
      }
    }
    fetchVenue();
  }, [id]);

  if (isNotFound) {
    return (
      <Navigate
        to='/404'
        replace
      />
    );
  }

  return (
    <>
      <VenueDetail venue={venue} />
    </>
  );
}
