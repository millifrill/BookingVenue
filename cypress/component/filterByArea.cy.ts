import { filterByArea } from '../../src/utils/filterByArea.ts';
import { filterByCity } from '../../src/utils/filterByCity.ts';

const venues = [
  { venueId: 1, cityId: 3, space: 40 },
  { venueId: 2, cityId: 1, space: 200 },
  { venueId: 3, cityId: 3, space: 150 },
  { venueId: 4, cityId: 2, space: 25 },
];

describe('filterByArea', () => {
  it('Given venues of different sizes, When filtering on an area, Then only venues with at least that area are returned', () => {
    const result = filterByArea(venues, 100);

    expect(result.map((venue) => venue.venueId)).to.deep.equal([2, 3]);
  });

  it('Given a venue with exactly the chosen area, When filtering, Then that venue is included', () => {
    const result = filterByArea(venues, 150);

    expect(result.map((venue) => venue.venueId)).to.deep.equal([2, 3]);
  });

  it('Given venues of different sizes, When no area is chosen, Then all venues are returned', () => {
    expect(filterByArea(venues, null)).to.have.length(4);
  });

  it('Given venues of different sizes, When no venue is large enough, Then an empty list is returned', () => {
    expect(filterByArea(venues, 1000)).to.deep.equal([]);
  });

  it('Given a list of venues, When filtering, Then the original list is not changed', () => {
    const copy = [...venues];

    filterByArea(venues, 100);

    expect(venues).to.deep.equal(copy);
  });

  it('Given an area and a city, When both filters are applied, Then only venues matching both are returned', () => {
    const result = filterByCity(filterByArea(venues, 100), 3);

    expect(result.map((venue) => venue.venueId)).to.deep.equal([3]);
  });
});
