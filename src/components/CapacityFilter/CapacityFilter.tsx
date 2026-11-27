import Form from 'react-bootstrap/Form';
import minusIcon from '../../assets/icons/minus.svg';
import plusIcon from '../../assets/icons/plus.svg';
import styles from '../FilterBar/FilterBar.module.css';

export type CapacityFilterProps = {
  value: number | null;
  onChange: (value: number | null) => void;
};

export default function CapacityFilter({
  value,
  onChange,
}: CapacityFilterProps) {
  const decreaseCapacity = () => {
    if (value === null || value <= 1) return;
    onChange(value - 1);
  };

  const increaseCapacity = () => {
    if (value !== null) {
      onChange(value + 1);
      return;
    }
    onChange(1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      onChange(null);
      return;
    }
    if (!/^\d+$/.test(e.target.value)) return;
    if (Number(e.target.value) < 1) return;
    onChange(Number(e.target.value));
  };

  return (
    <Form.Group
      className={styles['field']}
      controlId='capacityFilter'>
      <Form.Label className={styles['label']}>Antal personer</Form.Label>
      <div className={styles['stepper']}>
        <button
          className={styles['stepper-button']}
          type='button'
          aria-label='Minska antal personer'
          onClick={decreaseCapacity}>
          <img
            src={minusIcon}
            alt=''
          />
        </button>
        <Form.Control
          className={styles['stepper-input']}
          type='text'
          inputMode='numeric'
          pattern='[0-9]*'
          placeholder='Ange antal personer'
          value={value ?? ''}
          onChange={handleInputChange}
        />
        <button
          className={styles['stepper-button']}
          type='button'
          aria-label='Öka antal personer'
          onClick={increaseCapacity}>
          <img
            src={plusIcon}
            alt=''
          />
        </button>
      </div>
    </Form.Group>
  );
}
