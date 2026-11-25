import { Form } from 'react-bootstrap';
import { HOURS } from '../../utils/constants';
import { todayIso } from '../../utils/formatDate';
import styles from '../Booking/Booking.module.css';

export type DateTimeFilterValue = {
  date: string;
  from: string;
  to: string;
};

export type DateTimeFilterProps = {
  value: DateTimeFilterValue;
  onChange: (dateTime: DateTimeFilterValue) => void;
};

export default function DateTimeFilter({
  value,
  onChange,
}: DateTimeFilterProps) {
  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange({ ...value, date: e.target.value });
  }

  function handleFromChange(
    e: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>,
  ) {
    onChange({ ...value, from: e.target.value });
  }

  function handleToChange(
    e: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>,
  ) {
    onChange({ ...value, to: e.target.value });
  }

  return (
    <fieldset>
      <Form.Label
        as='legend'
        visuallyHidden>
        Datum och tid
      </Form.Label>
      <Form.Group
        className={styles['field']}
        controlId='filterDate'>
        <Form.Label>Datum</Form.Label>
        <Form.Control
          data-cy='filter-date'
          className={styles['input']}
          type='date'
          min={todayIso()}
          value={value.date}
          onChange={handleDateChange}
        />
      </Form.Group>
      <div className={styles['time-row']}>
        <Form.Group
          className={styles['field']}
          controlId='filterTimeFrom'>
          <Form.Label>Från</Form.Label>
          <Form.Select
            className={styles['input']}
            value={value.from}
            onChange={handleFromChange}>
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
          controlId='filterTimeTo'>
          <Form.Label>Till</Form.Label>
          <Form.Select
            className={styles['input']}
            value={value.to}
            onChange={handleToChange}>
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
    </fieldset>
  );
}
