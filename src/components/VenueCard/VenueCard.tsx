import Card from 'react-bootstrap/Card';
import styles from './VenueCard.module.css';
import type { Venue } from '../../types/Venue';
import { Link } from 'react-router-dom';
import { GeoAlt, HouseDoor, People, Tag } from 'react-bootstrap-icons';

function VenueCard({ venue }: { venue: Venue }) {
  return (
    <Card
      className={styles['venue-card']}
      data-cy='venue-card'>
      <Card.Img
        className={styles['venue-img']}
        variant='top'
        src={venue.imageURL}
        alt={venue.name}
      />
      <Card.Body>
        <Card.Title as={'h3'}>{venue.name}</Card.Title>
        <div className={styles['venue-info']}>
          <span>
            <GeoAlt size={18} />
            {venue.cityName}
          </span>
          <span>
            <People size={18} />
            Upp till {venue.capacity} personer
          </span>
          <span>
            <HouseDoor size={18} />
            {venue.space} m²
          </span>
          <span>
            <Tag size={18} />
            {venue.pricePerHour} kr/timme
          </span>
        </div>
        <Card.Text className={styles['venue-description']}>
          {venue.description}
        </Card.Text>
        <Link
          to={`/venue/${venue.venueId}`}
          className='btn btn-outline'
          aria-label={`Visa lokal ${venue.name}`}>
          Visa lokal
        </Link>
      </Card.Body>
    </Card>
  );
}

export default VenueCard;
