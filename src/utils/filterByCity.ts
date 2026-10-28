/* eslint-disable @typescript-eslint/no-unused-vars */
export function filterByCity<T extends { cityId: number }>(
   _venues: T[],
   _cityId: number | null,
): T[] {
   throw new Error('Not implemented');
}
