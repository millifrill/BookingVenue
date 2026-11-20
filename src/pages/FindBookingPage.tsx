import { useState, type FormEvent } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Search } from 'react-bootstrap-icons';
import BookingCard from '../components/BookingCard/BookingCard';
import styles from './FindBookingPage.module.css';
import type { FoundBooking } from '../types/Booking';

const API_URL = 'http://localhost:3000/api/booking';
const EMPTY_FIELD_MESSAGE = 'Ange ett bokningsnummer';
const NOT_FOUND_MESSAGE = 'Ingen bokning hittades';
const FAILED_MESSAGE = 'Något gick fel, försök igen';
const ALREADY_BOOKED_MESSAGE = 'Lokalen är redan bokad under den tiden';

export default function FindBookingPage() {
  const [bookingNumber, setBookingNumber] = useState('');
  const [booking, setBooking] = useState<FoundBooking | null>(null);
  const [updateMsg, setUpdateMsg] = useState<string | null>(null);
  const [cancelMsg, setCancelMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setBooking(null);
    setUpdateMsg(null);
    setCancelMsg(null);
    setErrorMsg(null);

    const id = bookingNumber.trim();
    if (id === '') {
      setErrorMsg(EMPTY_FIELD_MESSAGE);
      return;
    }

    try {
      const res = await axios.get<FoundBooking>(`${API_URL}/${id}`);
      setBooking(res.data);
    } catch (error) {
      const isNotFound =
        axios.isAxiosError(error) && error.response?.status === 404;
      setErrorMsg(isNotFound ? NOT_FOUND_MESSAGE : FAILED_MESSAGE);
    }
  }

  async function handleUpdate(startTime: string, endTime: string) {
    if (!booking) return;
    setUpdateMsg(null);
    setErrorMsg(null);

    try {
      await axios.put(`${API_URL}/${booking.bookingId}`, {
        startTime,
        endTime,
      });
      setBooking({ ...booking, startTime, endTime });
      setUpdateMsg(`Uppdateringen lyckades! ${bookingNumber} har uppdaterats.`);
    } catch (error) {
      console.error(error);
      const isAlreadyBooked =
        axios.isAxiosError(error) && error.response?.status === 409;
      setErrorMsg(isAlreadyBooked ? ALREADY_BOOKED_MESSAGE : FAILED_MESSAGE);
    }
  }

  async function handleCancel() {
    if (!booking) return;
    setErrorMsg(null);
    setCancelMsg(null);

    try {
      await axios.delete<FoundBooking>(`${API_URL}/${booking.bookingId}`);
      setBooking(null);
      setCancelMsg(`Avbokning lyckades! ${bookingNumber} har raderats.`);
      setBookingNumber('');
    } catch (error) {
      console.error(error);
      setErrorMsg(FAILED_MESSAGE);
    }
  }

  return (
    <section className={styles['find-booking']}>
      <p className={styles['eyebrow']}>Ändra eller avboka</p>
      <h1 className={styles['title']}>Hitta bokning</h1>
      <p className={styles['lead']}>
        Ange bokningsnumret från din bekräftelse, t.ex. K7P2XQ9M.
      </p>
      <Form
        className={styles['search-card']}
        onSubmit={handleSubmit}
        noValidate>
        <Form.Group controlId='bookingNumber'>
          <Form.Label>Bokningsnummer</Form.Label>
          <div className={styles['search-row']}>
            <Form.Control
              className={styles['search-input']}
              type='text'
              value={bookingNumber}
              isInvalid={errorMsg !== null}
              onChange={(e) => setBookingNumber(e.target.value)}
            />
            <Button
              type='submit'
              variant='primary'>
              <Search size={16} /> Sök
            </Button>
          </div>
        </Form.Group>
      </Form>

      {errorMsg && (
        <p
          className={styles['error']}
          role='alert'>
          {errorMsg}
        </p>
      )}
      {updateMsg && (
        <p
          className={styles['update']}
          role='alert'>
          {updateMsg}
        </p>
      )}
      {cancelMsg && (
        <p
          className={styles['cancel']}
          role='alert'>
          {cancelMsg}
        </p>
      )}
      {booking && (
        <BookingCard
          booking={booking}
          cancelBooking={handleCancel}
          updateBooking={handleUpdate}
        />
      )}
    </section>
  );
}
