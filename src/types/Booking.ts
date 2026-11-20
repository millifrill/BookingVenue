export interface Booking {
  bookingId: string;
  venueId: number;
  firstName: string;
  lastName: string;
  startTime: string;
  endTime: string;
  venueName: string;
  venueImageURL: string;
}

export type FoundBooking = {
  bookingId: string;
  venueId: number;
  venueName: string;
  venueImageURL: string;
  firstName: string;
  lastName: string;
  startTime: string;
  endTime: string;
};
