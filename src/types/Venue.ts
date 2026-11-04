export interface Amenity {
  amenityId: number;
  name: string;
}

export interface Venue {
  venueId: number;
  name: string;
  cityId: number;
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
