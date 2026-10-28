import type { Venue } from '../../types/Venue';
import { Image } from 'react-bootstrap'
import { ArrowLeft } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import './VenueDetail.css';

interface VenueDetailProps {
   venueId: string | undefined;
   venue: Venue | null;
}

export default function VenueDetail({ venueId, venue }: VenueDetailProps) {
   return (
      <section className="venue-detail">
         <Link to="/venue"><ArrowLeft/> Alla Lokaler</Link>
         <Image src={venue?.imageURL} alt={venue?.name} className="venue-detail-image" />
         <p>Venue ID: {venueId}</p>
         <p>{venue?.name}</p>
      </section>
   );
}
