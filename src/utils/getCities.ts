import type { Venue, City } from '../types/Venue';

export function getCities(venues: Venue[]): City[] {
  const cities = new Map<number, City>();
  venues.forEach((venue) =>
    cities.set(venue.cityId, { cityId: venue.cityId, name: venue.cityName }),
  );
  return [...cities.values()];
}
