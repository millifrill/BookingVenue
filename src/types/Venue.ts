export interface Amenity {
   amenityId: number;
   name: string;
}

export interface Venue {
   venueId: number;
   cityId: number;
   name: string;
   cityName: string;
   street: string;
   postalNumber: string;
   description: string | undefined;
   space: number;
   capacity: number;
   pricePerHour: number;
   imageURL: string | undefined;
   amenities: Amenity[];
}

export interface VenueContextValue {
   allVenues: Venue[];
   errorMsg: string | null;
   setErrorMsg: React.Dispatch<React.SetStateAction<string | null>>;
}
