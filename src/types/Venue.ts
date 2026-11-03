export interface Amenity {
   amenityId: number;
   name: string;
}

export interface Venue {
   venueId: number;
   cityId: number;
   venueName: string;
   name: string;
   street: string;
   postalNumber: string;
   description: string;
   space: number;
   capacity: number;
   pricePerHour: number;
   imageURL: string;
   amenities: Amenity[];
}

export interface VenueContextValue {
   allVenues: Venue[];
   errorMsg: string | null;
   setErrorMsg: React.Dispatch<React.SetStateAction<string | null>>;
}
