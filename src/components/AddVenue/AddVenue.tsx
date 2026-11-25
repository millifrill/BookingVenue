import { useState } from 'react';
import axios from 'axios';
import AddVenueForm, { type NewVenue } from '../AddVenueForm/AddVenueForm';
import { useVenueContext } from '../../context/VenueContext/useVenueContext';
import { getCities } from '../../utils/getCities';
import {
  API_URL,
  FAILED_MESSAGE,
  VENUE_ADDED_MESSAGE,
} from '../../utils/constants';
import bookingStyles from '../Booking/Booking.module.css';
import styles from './AddVenue.module.css';

export default function AddVenue() {
  const { allVenues, reloadVenues } = useVenueContext();
  const [message, setMessage] = useState<string | null>(null);
  const [addError, setAddError] = useState<string | null>(null);

  async function handleAdd(venue: NewVenue) {
    setMessage(null);
    setAddError(null);

    try {
      await axios.post(`${API_URL}/venue`, venue);
      reloadVenues();
      setMessage(VENUE_ADDED_MESSAGE);
    } catch {
      setAddError(FAILED_MESSAGE);
    }
  }

  return (
    <section className={styles['add-venue']}>
      <AddVenueForm
        cities={getCities(allVenues)}
        onAdd={handleAdd}
      />
      {message && <p role='status'>{message}</p>}
      {addError && (
        <p
          className={bookingStyles['error']}
          role='alert'>
          {addError}
        </p>
      )}
    </section>
  );
}
