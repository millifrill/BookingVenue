export interface Amenity {
  amenityId: number;
  name: string;
}

export type City = {
  cityId: number;
  name: string;
};

export interface Venue {
  venueId: number;
  cityId: number;
  name: string;
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
