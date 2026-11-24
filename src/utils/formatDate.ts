import { LOCALE } from './constants';

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function formatClock(isoTime: string): string {
  return new Date(isoTime).toLocaleTimeString(LOCALE, {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatBookingDate(startTime: string): string {
  const formattedDate = new Date(startTime).toLocaleDateString(LOCALE, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
  return capitalize(formattedDate);
}

export function formatBookingTime(startTime: string, endTime: string): string {
  return `${formatClock(startTime)}–${formatClock(endTime)}`;
}

export function todayIso(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

export function formatLongDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number);
  const formattedDate = new Date(year, month - 1, day).toLocaleDateString(
    LOCALE,
    {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    },
  );
  return capitalize(formattedDate);
}
