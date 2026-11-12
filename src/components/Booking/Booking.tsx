import { useState } from 'react';
import type { FormEvent } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import type { Venue } from '../../types/Venue';
import { formatLongDate } from '../../utils/formatLongDate';
import styles from './Booking.module.css';

const API_URL = 'http://localhost:3000/api/booking';
const SELECT_TIME_MESSAGE = 'Välj datum och tid';
const END_BEFORE_START_MESSAGE = 'Sluttiden måste vara efter starttiden';
const NAME_MESSAGE = 'Ange för- och efternamn';
const FAILED_MESSAGE = 'Något gick fel, försök igen';

export default function Booking({ venue }: { venue: Venue }) {
  const [date, setDate] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [timeError, setTimeError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nameError, setNameError] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);

  function handleBook() {
    if (!date || !from || !to) {
      setTimeError(SELECT_TIME_MESSAGE);
      return;
    }
    if (to <= from) {
      setTimeError(END_BEFORE_START_MESSAGE);
      return;
    }
    setTimeError(null);
    setShowModal(true);
  }

  function handleClose() {
    setShowModal(false);
    setNameError(null);
    if (bookingId) {
      setBookingId(null);
      setDate('');
      setFrom('');
      setTo('');
      setFirstName('');
      setLastName('');
    }
  }

  async function handleConfirm(e: FormEvent) {
    e.preventDefault();
    setNameError(null);

    if (firstName.trim() === '' || lastName.trim() === '') {
      setNameError(NAME_MESSAGE);
      return;
    }

    try {
      const res = await axios.post<{ bookingId: string }>(API_URL, {
        venueId: venue.venueId,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        startTime: `${date} ${from}:00`,
        endTime: `${date} ${to}:00`,
      });
      setBookingId(res.data.bookingId);
    } catch {
      setNameError(FAILED_MESSAGE);
    }
  }

  return (
    <aside className={styles['booking']}>
      <h2>Boka</h2>
      <Form.Group
        className={styles['field']}
        controlId='bookingDate'>
        <Form.Label>Datum</Form.Label>
        <Form.Control
          className={styles['input']}
          type='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </Form.Group>
      <div className={styles['time-row']}>
        <Form.Group
          className={styles['field']}
          controlId='bookingFrom'>
          <Form.Label>Från</Form.Label>
          <Form.Control
            className={styles['input']}
            type='time'
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </Form.Group>
        <Form.Group
          className={styles['field']}
          controlId='bookingTo'>
          <Form.Label>Till</Form.Label>
          <Form.Control
            className={styles['input']}
            type='time'
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </Form.Group>
      </div>
      {timeError && (
        <p
          className={styles['error']}
          role='alert'>
          {timeError}
        </p>
      )}
      <Button
        className={styles['full-width']}
        variant='primary'
        onClick={handleBook}>
        Boka
      </Button>

      <Modal
        show={showModal}
        onHide={handleClose}
        centered>
        <Modal.Header
          closeButton
          closeLabel='Stäng'>
          <Modal.Title as='h3'>
            {bookingId ? 'Bokningen är bekräftad' : 'Slutför bokning'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles['summary']}>
            <img
              className={styles['summary-img']}
              src={venue.imageURL}
              alt={venue.name}
            />
            <div>
              <p className={styles['summary-venue']}>{venue.name}</p>
              <p className={styles['summary-date']}>{formatLongDate(date)}</p>
              <p className={styles['summary-time']}>
                {from}–{to}
              </p>
            </div>
          </div>
          {bookingId ? (
            <div className={styles['confirmation']}>
              <p>
                Ditt bokningsnummer är{' '}
                <strong className={styles['booking-number']}>
                  {bookingId}
                </strong>
                . Spara det för att kunna hitta din bokning senare.
              </p>
              <Link
                to='/hitta-bokning'
                className='btn btn-outline'>
                Hitta bokning
              </Link>
            </div>
          ) : (
            <Form
              onSubmit={handleConfirm}
              noValidate>
              <Form.Group
                className={styles['field']}
                controlId='firstName'>
                <Form.Label>Förnamn</Form.Label>
                <Form.Control
                  className={styles['input']}
                  type='text'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className={styles['field']}
                controlId='lastName'>
                <Form.Label>Efternamn</Form.Label>
                <Form.Control
                  className={styles['input']}
                  type='text'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>
              {nameError && (
                <p
                  className={styles['error']}
                  role='alert'>
                  {nameError}
                </p>
              )}
              <Button
                className={styles['full-width']}
                type='submit'
                variant='primary'>
                Bekräfta bokning
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </aside>
  );
}
