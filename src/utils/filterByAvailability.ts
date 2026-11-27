export function filterByAvailability<T extends { venueId: number }>(
  venues: T[],
  availableVenueIds: number[] | null,
): T[] {
  if (availableVenueIds === null) return venues;
  return venues.filter((venue) => availableVenueIds.includes(venue.venueId));
}
