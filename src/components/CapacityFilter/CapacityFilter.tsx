import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
    <div>
      <Form.Group controlId='capacityFilter'>
        <Form.Label>Antal personer</Form.Label>
        <Button
          aria-label='Minska antal personer'
          variant='secondary'
          onClick={decreaseCapacity}>
          -
        </Button>
        <Form.Control
          type='text'
          inputMode='numeric'
          pattern='[0-9]*'
          placeholder='Ange antal personer'
          value={value ?? ''}
          onChange={handleInputChange}
        />
        <Button
          aria-label='Öka antal personer'
          variant='secondary'
          onClick={increaseCapacity}>
          +
        </Button>
      </Form.Group>
    </div>
  );
}
