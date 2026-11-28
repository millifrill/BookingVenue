import {
  VENUE_NAME_MESSAGE,
  VENUE_CITY_MESSAGE,
  VENUE_STREET_MESSAGE,
  VENUE_POSTAL_NUMBER_MESSAGE,
  VENUE_SPACE_MESSAGE,
  VENUE_CAPACITY_MESSAGE,
  VENUE_PRICE_MESSAGE,
} from './constants';

export type VenueFields = {
  name: string;
  cityId: string;
  street: string;
  postalNumber: string;
  space: string;
  capacity: string;
  pricePerHour: string;
};

export type VenueErrors = Partial<Record<keyof VenueFields, string>>;

export function validateVenue(fields: VenueFields): VenueErrors {
  const errors: VenueErrors = {};

  if (fields.name.trim() === '') errors.name = VENUE_NAME_MESSAGE;
  if (fields.cityId === '') errors.cityId = VENUE_CITY_MESSAGE;
  if (fields.street.trim() === '') errors.street = VENUE_STREET_MESSAGE;
  if (!/^\d{5}$/.test(fields.postalNumber)) {
    errors.postalNumber = VENUE_POSTAL_NUMBER_MESSAGE;
  }
  if (Number(fields.space) <= 0) errors.space = VENUE_SPACE_MESSAGE;
  if (Number(fields.capacity) <= 0) errors.capacity = VENUE_CAPACITY_MESSAGE;
  if (Number(fields.pricePerHour) <= 0)
    errors.pricePerHour = VENUE_PRICE_MESSAGE;

  return errors;
}
