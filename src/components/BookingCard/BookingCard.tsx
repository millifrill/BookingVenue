import { Calendar, Clock } from 'react-bootstrap-icons';
import {
  formatBookingDate,
  formatBookingTime,
} from '../../utils/formatBooking';
import styles from './BookingCard.module.css';

export type FoundBooking = {
  bookingId: string;
  venueId: number;
  venueName: string;
  venueImageURL: string;
  firstName: string;
  lastName: string;
  startTime: string;
  endTime: string;
};

export default function BookingCard({ booking }: { booking: FoundBooking }) {
  return (
    <article className={styles['booking-card']}>
      <img
        className={styles['booking-img']}
        src={booking.venueImageURL}
        alt={booking.venueName}
      />
      <div className={styles['booking-info']}>
        <p className={styles['booking-number']}># {booking.bookingId}</p>
        <h3 className={styles['booking-venue']}>{booking.venueName}</h3>
        <div className={styles['booking-meta']}>
          <span>
            <Calendar size={18} />
            {formatBookingDate(booking.startTime)}
          </span>
          <span>
            <Clock size={18} />
            {formatBookingTime(booking.startTime, booking.endTime)}
          </span>
        </div>
      </div>
    </article>
  );
}
