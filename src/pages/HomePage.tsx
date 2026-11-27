import { useEffect, useState } from 'react';
import VenueList from '../components/VenueList/VenueList';
import CapacityFilter from '../components/CapacityFilter/CapacityFilter';
import CityFilter from '../components/CityFilter/CityFilter';
import AreaFilter from '../components/AreaFilter/AreaFilter';
import { useVenueContext } from '../context/VenueContext/useVenueContext';
import { filterByCity } from '../utils/filterByCity';
import { filterByArea } from '../utils/filterByArea';
import { filterByCapacity } from '../utils/filterByCapacity';
import type { Venue, City } from '../types/Venue';
import { Alert } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import DateTimeFilter, {
  type DateTimeFilterValue,
} from '../components/DateTimeFilter/DateTimeFilter';
import { filterByAvailability } from '../utils/filterByAvailability';
import axios from 'axios';
import { API_URL } from '../utils/constants';
import { validateBookingTime } from '../utils/validateBookingTime';

function getCities(venues: Venue[]): City[] {
  const cities = new Map<number, City>();
  venues.forEach((venue) =>
    cities.set(venue.cityId, { cityId: venue.cityId, name: venue.cityName }),
  );
  return [...cities.values()];
}

function HomePage() {
  const { allVenues, alert } = useVenueContext();
  const [cityId, setCityId] = useState<number | null>(null);
  const [minSpace, setMinSpace] = useState<number | null>(null);
  const [capacity, setCapacity] = useState<number | null>(1);
  const [availableVenueIds, setAvailableVenueIds] = useState<number[] | null>(
    null,
  );
  const [dateTime, setDateTime] = useState<DateTimeFilterValue>({
    date: '',
    from: '',
    to: '',
  });

  useEffect(() => {
    async function getAvailableVenueIds(): Promise<void> {
      const validationError = validateBookingTime(
        dateTime.date,
        dateTime.from,
        dateTime.to,
      );

      if (validationError !== null) {
        setAvailableVenueIds(null);
        return;
      }

      const startTime = `${dateTime.date}T${dateTime.from}:00`;
      const endTime = `${dateTime.date}T${dateTime.to}:00`;

      try {
        const res = await axios.get<number[]>(`${API_URL}/venues/available`, {
          params: { startTime, endTime },
        });
        setAvailableVenueIds(res.data);
      } catch (error) {
        console.error('Failed to fetch available venues', error);
        setAvailableVenueIds(null);
      }
    }
    getAvailableVenueIds();
  }, [dateTime]);

  const venues = filterByCity(
    filterByArea(
      filterByCapacity(
        filterByAvailability(allVenues, availableVenueIds),
        capacity,
      ),
      minSpace,
    ),
    cityId,
  );

  return (
    <>
      {alert && (
        <Alert
          className='alert'
          variant={alert.variant}>
          {alert.text}
        </Alert>
      )}
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
