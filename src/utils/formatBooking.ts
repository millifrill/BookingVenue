const LOCALE = 'sv-SE';

const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

const formatClock = (isoTime: string) =>
  new Date(isoTime).toLocaleTimeString(LOCALE, {
    hour: '2-digit',
    minute: '2-digit',
  });

export function formatBookingDate(startTime: string): string {
  const date = new Date(startTime).toLocaleDateString(LOCALE, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
  return capitalize(date);
}

export function formatBookingTime(startTime: string, endTime: string): string {
  return `${formatClock(startTime)}–${formatClock(endTime)}`;
}
