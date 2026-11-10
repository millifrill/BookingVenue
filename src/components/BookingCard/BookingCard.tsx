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

export default function BookingCard({ booking }: { booking: FoundBooking }) {
  return <div data-venue={booking.venueId} />;
}
