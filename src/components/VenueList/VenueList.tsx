import { useVenueContext } from '../../context/VenueContext/useVenueContext';
import VenueCard from '../VenueCard/VenueCard';
import styles from './VenueList.module.css';
import type { Venue } from '../../types/Venue';

function VenueList() {
  const { allVenues, errorMsg } = useVenueContext();

  if (errorMsg) {
    return <p>{errorMsg}</p>;
  }

  if (allVenues.length === 0) {
    return <p>Det finns inga lokaler att visa.</p>;
  }

  return (
    <div className={styles['venue-list-grid']}>
      {allVenues.map((venue: Venue) => (
        <VenueCard
          key={venue.venueId}
          venue={venue}
        />
      ))}
    </div>
  );
}

export default VenueList;
