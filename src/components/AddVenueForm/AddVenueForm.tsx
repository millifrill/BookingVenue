import { useState, type SubmitEvent } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import type { City } from '../../types/Venue';
import { validateVenue, type VenueErrors } from '../../utils/validateVenue';
import styles from '../Booking/Booking.module.css';

export type NewVenue = {
  cityId: number;
  name: string;
  street: string;
  postalNumber: string;
  description: string;
  space: number;
  capacity: number;
  pricePerHour: number;
  imageURL: string;
};

export type AddVenueFormProps = {
  cities: City[];
  onAdd: (venue: NewVenue) => void;
};

export default function AddVenueForm({ cities, onAdd }: AddVenueFormProps) {
  const [name, setName] = useState('');
  const [cityId, setCityId] = useState('');
  const [street, setStreet] = useState('');
  const [postalNumber, setPostalNumber] = useState('');
  const [space, setSpace] = useState('');
  const [capacity, setCapacity] = useState('');
  const [pricePerHour, setPricePerHour] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [errors, setErrors] = useState<VenueErrors>({});

  function handleNumberChange(setValue: (value: string) => void) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!/^\d*$/.test(e.target.value)) return;
      setValue(e.target.value);
    };
  }

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const venueErrors = validateVenue({
      name,
      cityId,
      street,
      postalNumber,
      space,
      capacity,
      pricePerHour,
    });
    setErrors(venueErrors);
    if (Object.keys(venueErrors).length > 0) return;

    onAdd({
      cityId: Number(cityId),
      name: name.trim(),
      street: street.trim(),
      postalNumber,
      description: description.trim(),
      space: Number(space),
      capacity: Number(capacity),
      pricePerHour: Number(pricePerHour),
      imageURL: imageURL.trim(),
    });
  }

  return (
    <Form
      className={styles['booking']}
      onSubmit={handleSubmit}
      noValidate>
      <Form.Group
        className={styles['field']}
        controlId='venueName'>
        <Form.Label>Namn</Form.Label>
        <Form.Control
          className={styles['input']}
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && (
          <p
            className={styles['error']}
            role='alert'>
            {errors.name}
          </p>
        )}
      </Form.Group>
      <Form.Group
        className={styles['field']}
        controlId='venueCity'>
        <Form.Label>Stad</Form.Label>
        <Form.Select
          className={styles['input']}
          value={cityId}
          onChange={(e) => setCityId(e.target.value)}>
          <option value=''>Välj stad</option>
          {cities.map((city) => (
            <option
              key={city.cityId}
              value={city.cityId}>
              {city.name}
            </option>
          ))}
        </Form.Select>
        {errors.cityId && (
          <p
            className={styles['error']}
            role='alert'>
            {errors.cityId}
          </p>
        )}
      </Form.Group>
      <Form.Group
        className={styles['field']}
        controlId='venueStreet'>
        <Form.Label>Gatuadress</Form.Label>
        <Form.Control
          className={styles['input']}
          type='text'
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        {errors.street && (
          <p
            className={styles['error']}
            role='alert'>
            {errors.street}
          </p>
        )}
      </Form.Group>
      <Form.Group
        className={styles['field']}
        controlId='venuePostalNumber'>
        <Form.Label>Postnummer</Form.Label>
        <Form.Control
          className={styles['input']}
          type='text'
          value={postalNumber}
          onChange={(e) => setPostalNumber(e.target.value)}
        />
        {errors.postalNumber && (
          <p
            className={styles['error']}
            role='alert'>
            {errors.postalNumber}
          </p>
        )}
      </Form.Group>
      <Form.Group
        className={styles['field']}
        controlId='venueSpace'>
        <Form.Label>Yta (m²)</Form.Label>
        <Form.Control
          className={styles['input']}
          type='text'
          inputMode='numeric'
          pattern='[0-9]*'
          value={space}
          onChange={handleNumberChange(setSpace)}
        />
        {errors.space && (
          <p
            className={styles['error']}
            role='alert'>
            {errors.space}
          </p>
        )}
      </Form.Group>
      <Form.Group
        className={styles['field']}
        controlId='venueCapacity'>
        <Form.Label>Max antal personer</Form.Label>
        <Form.Control
          className={styles['input']}
          type='text'
          inputMode='numeric'
          pattern='[0-9]*'
          value={capacity}
          onChange={handleNumberChange(setCapacity)}
        />
        {errors.capacity && (
          <p
            className={styles['error']}
            role='alert'>
            {errors.capacity}
          </p>
        )}
      </Form.Group>
      <Form.Group
        className={styles['field']}
        controlId='venuePricePerHour'>
        <Form.Label>Pris per timme (kr)</Form.Label>
        <Form.Control
          className={styles['input']}
          type='text'
          inputMode='numeric'
          pattern='[0-9]*'
          value={pricePerHour}
          onChange={handleNumberChange(setPricePerHour)}
        />
        {errors.pricePerHour && (
          <p
            className={styles['error']}
            role='alert'>
            {errors.pricePerHour}
          </p>
        )}
      </Form.Group>
      <Form.Group
        className={styles['field']}
        controlId='venueDescription'>
        <Form.Label>Beskrivning (valfritt)</Form.Label>
        <Form.Control
          className={styles['input']}
          type='text'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
      <Form.Group
        className={styles['field']}
        controlId='venueImageUrl'>
        <Form.Label>Bild-URL (valfritt)</Form.Label>
        <Form.Control
          className={styles['input']}
          type='text'
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
        />
      </Form.Group>
      <Button
        className={styles['full-width']}
        variant='primary'
        type='submit'>
        Lägg till lokal
      </Button>
    </Form>
  );
}
