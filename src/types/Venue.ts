export interface Amenity {
  amenityId: number;
  name: string;
}

export interface Venue {
  venueId: number;
  cityId: number;
  venueName: string;
  cityName: string;
  street: string;
  postalNumber: string;
  description: string;
  space: number;
  capacity: number;
  pricePerHour: number;
  imageURL: string;
  amenities: Amenity[];
}
