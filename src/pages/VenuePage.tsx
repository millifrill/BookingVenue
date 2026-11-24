import { useParams, Navigate } from 'react-router-dom';
import VenueDetail from '../components/VenueDetail/VenueDetail';
import { useEffect, useState } from 'react';
import type { Venue } from '../types/Venue';
import { API_URL } from '../utils/constants';
import axios from 'axios';

export default function VenueDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchVenue() {
      try {
        const response = await axios.get(`${API_URL}/venue/${id}`);
        const data: Venue = response.data;
        setVenue(data);
      } catch (error) {
        console.error('Error fetching venue:', error);
        setNotFound(true);
      }
    }
    fetchVenue();
  }, [id]);

  if (notFound) {
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
