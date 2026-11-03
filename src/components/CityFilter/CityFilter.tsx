import Form from 'react-bootstrap/Form';

export type City = {
  cityId: number;
  name: string;
};

export type CityFilterProps = {
  cities: City[];
  value: number | null;
  onChange: (cityId: number | null) => void;
};

const ALL_CITIES = '';

export default function CityFilter({
  cities,
  value,
  onChange,
}: CityFilterProps) {
  return (
    <Form.Group controlId='cityFilter'>
      <Form.Label>Stad</Form.Label>
      <Form.Select
        value={value ?? ALL_CITIES}
        onChange={(e) =>
          onChange(
            e.target.value === ALL_CITIES ? null : Number(e.target.value),
          )
        }>
        <option value={ALL_CITIES}>Alla städer</option>
        {cities.map((city) => (
          <option
            key={city.cityId}
            value={city.cityId}>
            {city.name}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
}
