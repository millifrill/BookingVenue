import { Calendar, Clock, Pencil } from 'react-bootstrap-icons';
import {
  formatBookingDate,
  formatBookingTime,
} from '../../utils/formatBooking';
import styles from './BookingCard.module.css';
import { Button, Modal } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import { useState } from 'react';
import UpdateBookingForm from '../UpdateBookingForm/UpdateBookingForm';

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

export default function BookingCard({
  booking,
  cancelBooking,
  updateBooking,
}: {
  booking: FoundBooking;
  cancelBooking: () => void;
  updateBooking: (startTime: string, endTime: string) => void;
}) {
  const [showModal, setShowModal] = useState(false);

  function openModal() {
    setShowModal(true);
  }

  function handleClose() {
    setShowModal(false);
  }

  function handleUpdate(startTime: string, endTime: string) {
    updateBooking(startTime, endTime);
    handleClose();
  }

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
          <div
            className={styles['btn-group']}
            role='group'
            aria-label='Hantera bokning'>
            <Button
              variant={'outline'}
              onClick={openModal}>
              <Pencil /> Ändra
            </Button>
            <Button
              variant={'danger'}
              onClick={cancelBooking}>
              <Trash /> Avboka
            </Button>
          </div>
        </div>
      </div>

      <Modal
        show={showModal}
        onHide={handleClose}
        centered>
        <Modal.Header
          closeButton
          closeLabel='Stäng'>
          <Modal.Title as='h3'>Ändra bokning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateBookingForm
            startTime={booking.startTime}
            endTime={booking.endTime}
            onSave={handleUpdate}
          />
        </Modal.Body>
      </Modal>
    </article>
  );
}
