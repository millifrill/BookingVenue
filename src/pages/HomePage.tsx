import VenueList from '../components/VenueList/VenueList';
import CapacityFilter from '../components/CapacityFilter/CapacityFilter';
import { useState } from 'react';

function HomePage() {
  const [capacity, setCapacity] = useState<number | null>(1);

  return (
    <>
      <CapacityFilter
        value={capacity}
        onChange={setCapacity}
      />
      <VenueList />
    </>
  );
}

export default HomePage;
