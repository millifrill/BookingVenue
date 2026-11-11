import { useState } from 'react';
import VenueList from '../components/VenueList/VenueList';
import CapacityFilter from '../components/CapacityFilter/CapacityFilter';
import CityFilter from '../components/CityFilter/CityFilter';
import type { City } from '../components/CityFilter/CityFilter';
import AreaFilter from '../components/AreaFilter/AreaFilter';
import { useVenueContext } from '../context/VenueContext/useVenueContext';
import { filterByCity } from '../utils/filterByCity';
import { filterByArea } from '../utils/filterByArea';
import { filterByCapacity } from '../utils/filterByCapacity';
import type { Venue } from '../types/Venue';

function getCities(venues: Venue[]): City[] {
  const cities = new Map<number, City>();
  venues.forEach((venue) =>
    cities.set(venue.cityId, { cityId: venue.cityId, name: venue.cityName }),
  );
  return [...cities.values()];
}

function HomePage() {
  const { allVenues } = useVenueContext();
  const [cityId, setCityId] = useState<number | null>(null);
  const [minSpace, setMinSpace] = useState<number | null>(null);
  const [capacity, setCapacity] = useState<number | null>(1);

  const venues = filterByCity(
    filterByArea(filterByCapacity(allVenues, capacity), minSpace),
    cityId,
  );

  return (
    <>
      <CityFilter
        cities={getCities(allVenues)}
        value={cityId}
        onChange={setCityId}
      />
      <AreaFilter
        value={minSpace}
        onChange={setMinSpace}
      />
      <CapacityFilter
        value={capacity}
        onChange={setCapacity}
      />
      <VenueList venues={venues} />
    </>
  );
}

export default HomePage;
