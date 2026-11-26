export const API_URL =
  import.meta.env?.VITE_API_URL ?? 'http://localhost:3000/api';

export const SELECT_TIME_MESSAGE = 'Välj datum och tid';
export const END_BEFORE_START_MESSAGE = 'Sluttiden måste vara efter starttiden';
export const PAST_MESSAGE = 'Du kan inte boka en tid som redan har passerat';
export const NAME_MESSAGE = 'Ange för- och efternamn';
export const FAILED_MESSAGE = 'Något gick fel, försök igen';
export const ALREADY_BOOKED_MESSAGE = 'Lokalen är redan bokad under den tiden';

export const LOCALE = 'sv-SE';

export const HOURS = Array.from(
  { length: 16 },
  (_, i) => `${String(i + 7).padStart(2, '0')}:00`,
);
