import { useState } from 'react';
import VenueList from '../components/VenueList/VenueList';
import CapacityFilter from '../components/CapacityFilter/CapacityFilter';
import CityFilter from '../components/CityFilter/CityFilter';
import AreaFilter from '../components/AreaFilter/AreaFilter';
import { useVenueContext } from '../context/VenueContext/useVenueContext';
import { filterByCity } from '../utils/filterByCity';
import { filterByArea } from '../utils/filterByArea';
import { filterByCapacity } from '../utils/filterByCapacity';
import type { Venue, City } from '../types/Venue';
import { Form } from 'react-bootstrap';
import DateTimeFilter, {
  type DateTimeFilterValue,
} from '../components/DateTimeFilter/DateTimeFilter';

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
  const [dateTime, setDateTime] = useState<DateTimeFilterValue>({
    date: '',
    from: '',
    to: '',
  });

  const venues = filterByCity(
    filterByArea(filterByCapacity(allVenues, capacity), minSpace),
    cityId,
  );

  return (
    <>
      <Form>
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
        <DateTimeFilter
          value={dateTime}
          onChange={setDateTime}
        />
      </Form>
      <VenueList venues={venues} />
    </>
  );
}

export default HomePage;
