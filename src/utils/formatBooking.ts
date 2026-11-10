export function formatBookingDate(startTime: string): string {
  return startTime;
}

export function formatBookingTime(startTime: string, endTime: string): string {
  return `${startTime}${endTime}`;
}
