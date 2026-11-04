import Form from 'react-bootstrap/Form';

export type AreaFilterProps = {
  value: number | null;
  onChange: (minSpace: number | null) => void;
};

const NO_AREA = '';
const ERROR_MESSAGE = 'Ange en yta större än 0';

export default function AreaFilter({ value, onChange }: AreaFilterProps) {
  const isInvalid = value !== null && value <= 0;

  return (
    <Form.Group controlId='areaFilter'>
      <Form.Label>Yta (m²)</Form.Label>
      <Form.Control
        type='number'
        value={value ?? NO_AREA}
        isInvalid={isInvalid}
        onChange={(e) =>
          onChange(e.target.value === NO_AREA ? null : Number(e.target.value))
        }
      />
      {isInvalid && (
        <Form.Control.Feedback type='invalid'>
          {ERROR_MESSAGE}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
}
