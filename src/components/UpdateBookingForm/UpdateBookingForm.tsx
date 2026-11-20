import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from '../Booking/Booking.module.css';
import { todayIso, formatClock } from '../../utils/formatDate';
import { LOCALE, HOURS } from '../../utils/constants';
import { validateBookingTime } from '../../utils/validateBookingTime';

export type UpdateBookingFormProps = {
  startTime: string;
  endTime: string;
  onSave: (startTime: string, endTime: string) => void;
};

export default function UpdateBookingForm({
  startTime,
  endTime,
  onSave,
}: UpdateBookingFormProps) {
  const [date, setDate] = useState(
    new Date(startTime).toLocaleDateString(LOCALE),
  );
  const [from, setFrom] = useState(formatClock(startTime));
  const [to, setTo] = useState(formatClock(endTime));
  const [timeError, setTimeError] = useState<string | null>(null);

  function handleSave() {
    const validateBookingTimeMessage = validateBookingTime(date, from, to);
    setTimeError(validateBookingTimeMessage);
    if (validateBookingTimeMessage !== null) return;
    onSave(`${date} ${from}:00`, `${date} ${to}:00`);
  }

  return (
    <aside className={styles['booking']}>
      <Form.Group
        className={styles['field']}
        controlId='updateBookingDate'>
        <Form.Label>Datum</Form.Label>
        <Form.Control
          data-cy='update-booking-date'
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
          controlId='updateBookingFrom'>
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
          controlId='updateBookingTo'>
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
          data-cy='time-error'
          className={styles['error']}
          role='alert'>
          {timeError}
        </p>
      )}
      <Button
        className={styles['full-width']}
        variant='primary'
        onClick={handleSave}>
        Spara
      </Button>
    </aside>
  );
}
