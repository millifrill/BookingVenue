import { filterByCity } from '../../src/utils/filterByCity.ts';

const venues = [
   { venueId: 1, cityId: 3 },
   { venueId: 2, cityId: 1 },
   { venueId: 3, cityId: 3 },
   { venueId: 4, cityId: 2 },
];

describe('filterByCity', () => {
   it('Given venues in several cities, When filtering on one city, Then only venues in that city are returned', () => {
      const result = filterByCity(venues, 3);

      expect(result.map((venue) => venue.venueId)).to.deep.equal([1, 3]);
   });

   it('Given venues in several cities, When no city is chosen, Then all venues are returned', () => {
      const result = filterByCity(venues, null);

      expect(result).to.have.length(4);
   });

   it('Given venues in several cities, When no venue is in the chosen city, Then an empty list is returned', () => {
      const result = filterByCity(venues, 99);

      expect(result).to.deep.equal([]);
   });

   it('Given a list of venues, When filtering, Then the original list is not changed', () => {
      const copy = [...venues];

      filterByCity(venues, 2);

      expect(venues).to.deep.equal(copy);
   });
});
