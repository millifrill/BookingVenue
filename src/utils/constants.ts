export const API_URL = 'http://localhost:3000/api';

export const SELECT_TIME_MESSAGE = 'Välj datum och tid';
export const END_BEFORE_START_MESSAGE = 'Sluttiden måste vara efter starttiden';
export const PAST_MESSAGE = 'Du kan inte boka en tid som redan har passerat';
export const NAME_MESSAGE = 'Ange för- och efternamn';
export const FAILED_MESSAGE = 'Något gick fel, försök igen';
export const ALREADY_BOOKED_MESSAGE = 'Lokalen är redan bokad under den tiden';

export const VENUE_NAME_MESSAGE = 'Ange namn';
export const VENUE_CITY_MESSAGE = 'Välj en stad';
export const VENUE_STREET_MESSAGE = 'Ange gatuadress';
export const VENUE_POSTAL_NUMBER_MESSAGE = 'Postnummer måste vara fem siffror';
export const VENUE_SPACE_MESSAGE = 'Ange en yta större än 0';
export const VENUE_CAPACITY_MESSAGE = 'Ange ett antal personer större än 0';
export const VENUE_PRICE_MESSAGE = 'Ange ett pris större än 0';
export const VENUE_ADDED_MESSAGE = 'Lokalen har lagts till';

export const LOCALE = 'sv-SE';

export const HOURS = Array.from(
  { length: 16 },
  (_, i) => `${String(i + 7).padStart(2, '0')}:00`,
);
