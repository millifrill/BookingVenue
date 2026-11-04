export function filterByArea<T extends { space: number }>(
  venues: T[],
  minSpace: number | null,
): T[] {
  if (minSpace === null) return venues;
  return venues.filter((venue) => venue.space >= minSpace);
}
