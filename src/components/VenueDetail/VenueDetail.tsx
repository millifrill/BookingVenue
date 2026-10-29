import type { Venue } from '../../types/Venue';
import { Image } from 'react-bootstrap';
import styles from './VenueDetail.module.css';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Tag,
  GeoAlt,
  People,
  ArrowsFullscreen,
  Wifi,
  Projector,
  Easel2,
  Speaker,
  CupStraw,
  ForkKnife,
  DoorOpen,
  CarFront,
  MusicNoteBeamed,
  PersonWheelchair,
  Check,
  type Icon,
} from 'react-bootstrap-icons';

const amenityIcons: Record<string, Icon> = {
  WiFi: Wifi,
  Projektor: Projector,
  Whiteboard: Easel2,
  Ljudanläggning: Speaker,
  Bar: CupStraw,
  Kök: ForkKnife,
  Omklädningsrum: DoorOpen,
  Parkering: CarFront,
  Scen: MusicNoteBeamed,
  Tillgänglighetsanpassat: PersonWheelchair,
  Default: Check,
};

interface VenueDetailProps {
  venue: Venue | null;
}

export default function VenueDetail({ venue }: VenueDetailProps) {
  return (
    <section className={styles['venue']}>
      <Link to='/venue' className={styles['all-venues-link']}>
        <ArrowLeft /> Alla Lokaler
      </Link>
      <Image
        src={venue?.imageURL}
        alt={venue?.venueName}
        className={styles['image']}
      />
      <div className={styles['content']}>
        <div className={styles['info']}>
          <div className={styles['name-location']}>
            <h1>{venue?.venueName}</h1>
            <div className={styles['location']}>
              <GeoAlt />
              <span>
                {venue?.street}, {venue?.postalNumber}
                {` `}
                {venue?.cityName}
              </span>
            </div>
          </div>
          <div className={styles['price-capacity-space']}>
            <div className={styles['price']}>
              <Tag />
              <span>{venue?.pricePerHour} kr/t</span>
            </div>

            <div className={styles['capacity']}>
              <People />
              <span>Upp till {venue?.capacity} personer</span>
            </div>
            <div className={styles['space']}>
              <ArrowsFullscreen />
              <span>{venue?.space} m²</span>
            </div>
          </div>

          <div className={styles['description']}>
            <p>{venue?.description}</p>
          </div>
          <h2>Det här ingår</h2>
          <ul className={styles['amenities']}>
            {venue?.amenities?.map((amenity) => (
              <li key={amenity.amenityId} className={styles['amenity']}>
                {(() => {
                  const IconComponent =
                    amenityIcons[amenity.name] || amenityIcons.Default;
                  return <IconComponent />;
                })()}
                <span>{amenity.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <aside className={styles['booking']}>
          <h2>Boka</h2>
        </aside>
      </div>
    </section>
  );
}
