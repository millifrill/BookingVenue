import { useParams, Navigate } from "react-router-dom";
import VenueDetail from "../components/VenueDetail/VenueDetail";
import { useEffect, useState } from "react";
import type { Venue } from "../types/Venue";
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'react-bootstrap-icons';

export default function VenueDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {

    async function fetchVenue() {
      try {
        const response = await fetch(`http://localhost:3000/api/venue/${id}`);
        if (!response.ok) {
          setNotFound(true);
          throw new Error(`Error status: ${response.status}`);
        }
        const data: Venue = await response.json();
        setVenue(data);
        console.log("Venue details:", data);
      } catch (error) {
        console.error("Error fetching venue:", error);
        setNotFound(true);
      }
    }
    fetchVenue();
  }, [id]);

  if (notFound) {
    return <Navigate to="/venue" replace />;
  }

  return(
  <>
    <VenueDetail venue={venue} venueId={id} />
  </>
)
}