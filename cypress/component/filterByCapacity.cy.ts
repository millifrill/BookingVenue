import { filterByCapacity } from '../../src/utils/filterByCapacity.ts';

const venues = [
  { venueId: 1, capacity: 1 },
  { venueId: 2, capacity: 10 },
  { venueId: 3, capacity: 50 },
  { venueId: 4, capacity: 250 },
  { venueId: 5, capacity: 1000 },
];

describe('filterByCapacity', () => {
  it('returns venues with capacity equal to or greater than the specified value', () => {
    const result = filterByCapacity(venues, 50);

    expect(result.map((venue) => venue.venueId)).to.deep.equal([3, 4, 5]);
  });
  it('returns all venues when no minimum capacity is specified', () => {
    const result = filterByCapacity(venues, null);

    expect(result.map((venue) => venue.venueId)).to.deep.equal([1, 2, 3, 4, 5]);
  });
  it('returns an empty array when no venues meet the capacity requirement', () => {
    const result = filterByCapacity(venues, 1001);

    expect(result).to.deep.equal([]);
  });
  it('does not modify the original array of venues', () => {
    const copy = [...venues];

    filterByCapacity(venues, 50);

    expect(venues).to.deep.equal(copy);
  });
});
