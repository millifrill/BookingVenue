export function filterByCity<T extends { cityId: number }>(
   venues: T[],
   cityId: number | null,
): T[] {
   if (cityId === null) return venues;
   return venues.filter((venue) => venue.cityId === cityId);
}
