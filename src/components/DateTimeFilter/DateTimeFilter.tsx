import { Form } from 'react-bootstrap';
import { HOURS } from '../../utils/constants';
import styles from '../FilterBar/FilterBar.module.css';
import { todayIso } from '../../utils/formatDate';

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
    <fieldset className={styles['group']}>
      <Form.Label
        as='legend'
        visuallyHidden>
        Datum och tid
      </Form.Label>
      <Form.Group
        className={styles['field']}
        controlId='filterDate'>
        <Form.Label className={styles['label']}>Datum</Form.Label>
        <Form.Control
          data-cy='filter-date'
          className={styles['control']}
          type='date'
          min={todayIso()}
          value={value.date}
          onChange={handleDateChange}
        />
      </Form.Group>
      <div className={styles['group']}>
        <Form.Group
          className={styles['field']}
          controlId='filterTimeFrom'>
          <Form.Label className={styles['label']}>Från</Form.Label>
          <Form.Select
            className={styles['select']}
            value={value.from}
            onChange={handleFromChange}
            disabled={!value.date}>
            <option value=''>--:--</option>
            {HOURS.map((hour) => (
              <option
                key={hour}
                value={hour}
                disabled={value.to !== '' && hour >= value.to}>
                {hour}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group
          className={styles['field']}
          controlId='filterTimeTo'>
          <Form.Label className={styles['label']}>Till</Form.Label>
          <Form.Select
            className={styles['select']}
            value={value.to}
            onChange={handleToChange}
            disabled={!value.date}>
            <option value=''>--:--</option>
            {HOURS.map((hour) => (
              <option
                key={hour}
                value={hour}
                disabled={value.from !== '' && hour <= value.from}>
                {hour}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </div>
    </fieldset>
  );
}
