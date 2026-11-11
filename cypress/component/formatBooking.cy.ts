import {
  formatBookingDate,
  formatBookingTime,
} from '../../src/utils/formatBooking.ts';

const at = (hour: number, minute = 0) =>
  new Date(2026, 9, 23, hour, minute).toISOString();

describe('formatBooking', () => {
  it('Given a start time on Friday 23 October, When formatting the date, Then it is shown as "Fre 23 okt."', () => {
    expect(formatBookingDate(at(10))).to.equal('Fre 23 okt.');
  });

  it('Given a start and an end time, When formatting the time, Then it is shown as "10:00–13:00"', () => {
    expect(formatBookingTime(at(10), at(13))).to.equal('10:00–13:00');
  });

  it('Given a time with minutes, When formatting the time, Then the minutes are kept', () => {
    expect(formatBookingTime(at(9, 30), at(11, 45))).to.equal('09:30–11:45');
  });
});
