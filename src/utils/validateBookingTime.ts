import {
  END_BEFORE_START_MESSAGE,
  PAST_MESSAGE,
  SELECT_TIME_MESSAGE,
} from './constants';

export function validateBookingTime(
  date: string,
  from: string,
  to: string,
): string | null {
  if (!date || !from || !to) {
    return SELECT_TIME_MESSAGE;
  }
  if (to <= from) {
    return END_BEFORE_START_MESSAGE;
  }
  if (new Date(`${date}T${from}:00`) <= new Date()) {
    return PAST_MESSAGE;
  }
  return null;
}
