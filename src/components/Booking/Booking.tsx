import { useState } from 'react';
import type { SubmitEvent } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import type { Venue } from '../../types/Venue';
import {
  SELECT_TIME_MESSAGE,
  END_BEFORE_START_MESSAGE,
  NAME_MESSAGE,
  FAILED_MESSAGE,
  PAST_MESSAGE,
  ALREADY_BOOKED_MESSAGE,
  HOURS,
  API_URL,
} from '../../utils/constants';
import { formatLongDate, todayIso } from '../../utils/formatDate';
import styles from './Booking.module.css';

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
    if (new Date(`${date}T${from}:00`) <= new Date()) {
      setTimeError(PAST_MESSAGE);
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

  async function handleConfirm(e: SubmitEvent) {
    e.preventDefault();
    setNameError(null);

    if (firstName.trim() === '' || lastName.trim() === '') {
      setNameError(NAME_MESSAGE);
      return;
    }

    try {
      const res = await axios.post<{ bookingId: string }>(
        `${API_URL}/booking`,
        {
          venueId: venue.venueId,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          startTime: `${date} ${from}:00`,
          endTime: `${date} ${to}:00`,
        },
      );
      setBookingId(res.data.bookingId);
    } catch (error) {
      const alreadyBooked =
        axios.isAxiosError(error) && error.response?.status === 409;
      setNameError(alreadyBooked ? ALREADY_BOOKED_MESSAGE : FAILED_MESSAGE);
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
          min={todayIso()}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </Form.Group>
      <div className={styles['time-row']}>
        <Form.Group
          className={styles['field']}
          controlId='bookingFrom'>
          <Form.Label>Från</Form.Label>
          <Form.Select
            className={styles['input']}
            value={from}
            onChange={(e) => setFrom(e.target.value)}>
            <option value=''>--:--</option>
            {HOURS.map((hour) => (
              <option
                key={hour}
                value={hour}>
                {hour}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group
          className={styles['field']}
          controlId='bookingTo'>
          <Form.Label>Till</Form.Label>
          <Form.Select
            className={styles['input']}
            value={to}
            onChange={(e) => setTo(e.target.value)}>
            <option value=''>--:--</option>
            {HOURS.map((hour) => (
              <option
                key={hour}
                value={hour}>
                {hour}
              </option>
            ))}
          </Form.Select>
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
