import { useVenueContext } from '../../context/VenueContext/useVenueContext';
import VenueCard from '../VenueCard/VenueCard';
import styles from './VenueList.module.css';
import type { Venue } from '../../types/Venue';

function VenueList() {
   const { allVenues } = useVenueContext();

   return (
      <div className={styles['venue-list-grid']}>
         {allVenues.map((venue: Venue) => (
            <VenueCard key={venue.venueId} venue={venue} />
         ))}
      </div>
   );
}

export default VenueList;
