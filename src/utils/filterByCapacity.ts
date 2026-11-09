export function filterByCapacity<T extends { capacity: number }>(
  venues: T[],
  minimumCapacity: number | null,
): T[] {
  return venues.filter(
    (venue) => minimumCapacity === null || venue.capacity >= minimumCapacity,
  );
}
