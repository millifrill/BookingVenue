import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import styles from './VenueCard.module.css';
import type { Venue } from '../../types/Venue';
import { Link } from 'react-router-dom';
import { HouseDoor, People, PinAngle, Tag } from 'react-bootstrap-icons';

function VenueCard({ venue }: { venue: Venue }) {
  return (
    <Card className={styles['venue-card']}>
      <Card.Img
        className={styles['venue-img']}
        variant='top'
        src={venue.imageURL}
      />
      <Card.Body>
        <Card.Title as={'h3'}>{venue.name}</Card.Title>
        <div className={styles['venue-info']}>
          <span>
            <PinAngle size={20} />
            {venue.cityName}
          </span>
          <span>
            <People size={20} />
            Upp till {venue.capacity} pers
          </span>
          <span>
            <HouseDoor size={18} />
            {venue.space} kvm
          </span>
          <span>
            <Tag size={20} />
            {venue.pricePerHour} kr/timme
          </span>
        </div>
        <Card.Text className={styles['venue-description']}>
          {venue.description}
        </Card.Text>
        <Link to={`/venue/${venue.venueId}`}>
          <Button
            className={styles['show-venue-btn']}
            variant='primary'>
            Visa lokal
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default VenueCard;
