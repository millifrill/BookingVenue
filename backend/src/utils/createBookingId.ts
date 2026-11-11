import { randomBytes } from 'crypto';

export const createBookingId = (): string => {
  return randomBytes(4).toString('hex').toUpperCase();
};
