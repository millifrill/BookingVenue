import Card from 'react-bootstrap/Card';
import styles from './VenueCard.module.css';
import type { Venue } from '../../types/Venue';
import { Link } from 'react-router-dom';
import { GeoAlt, HouseDoor, People, Tag } from 'react-bootstrap-icons';
import { useAdminAuth } from '../../context/AdminContext/useAdminContext';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { API_URL } from '../../utils/constants';
import { useVenueContext } from '../../context/VenueContext/useVenueContext';

function VenueCard({ venue }: { venue: Venue }) {
  const { isLoggedIn, token, setIsLoggedIn, setToken } = useAdminAuth();
  const { setAllVenues, setAlert } = useVenueContext();

  async function handleDelete() {
    try {
      await axios.delete(`${API_URL}/venue/${venue.venueId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllVenues((venues) =>
        venues.filter((item) => item.venueId !== venue.venueId),
      );
      setAlert({
        variant: 'success',
        text: `Borttagning lyckades. ${venue.name} togs bort.`,
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        setAlert({
          variant: 'danger',
          text: `Borttagning misslyckades. ${venue.name} har aktiva bokningar.`,
        });
        return;
      }
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setAlert({
          variant: 'danger',
          text: 'Borttagning misslyckades. Lokalen hittades inte.',
        });
        return;
      }
      if (
        axios.isAxiosError(error) &&
        (error.response?.status === 401 || error.response?.status === 403)
      ) {
        setToken(null);
        setIsLoggedIn(false);
        setAlert({
          variant: 'danger',
          text: `Borttagning misslyckades. Du är inte längre inloggad.`,
        });
        return;
      }
      setAlert({
        variant: 'danger',
        text: 'Borttagning misslyckades. Något gick fel.',
      });
    }
  }

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
        <div className={styles['venue-buttons']}>
          <Link
            to={`/venue/${venue.venueId}`}
            className='btn btn-outline'
            aria-label={`Visa lokal ${venue.name}`}>
            Visa lokal
          </Link>
          {isLoggedIn && (
            <Button
              className={styles['venue-delete']}
              onClick={handleDelete}>
              Ta bort
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default VenueCard;
