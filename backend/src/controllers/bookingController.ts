import type { Request, Response } from 'express';
import pgPool from '../connectionPostgres.ts';
import { createBookingId } from '../utils/createBookingId.ts';

const pgDatabase = pgPool;

interface Booking {
  bookingId: string;
  venueId: number;
  firstName: string;
  lastName: string;
  startTime: Date;
  endTime: Date;
  venueName: string;
  venueImageURL: string;
}

export const getBookingById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const { id } = req.params;
  try {
    const result = await pgDatabase.query<Booking>(
      `SELECT b.bookingId AS "bookingId", b.venueId AS "venueId", b.firstName AS "firstName", b.lastName AS "lastName", b.startTime AS "startTime", b.endTime AS "endTime",
      v.name AS "venueName",
      v.imageURL AS "venueImageURL"
      FROM Booking b
      JOIN Venue v ON b.venueId = v.venueId
      WHERE b.bookingId = $1`,
      [id],
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ error: 'Booking not found', success: false });
    }
    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching booking:', err);
    return res
      .status(500)
      .json({ error: 'Failed to fetch booking', success: false });
  }
};

export const createBooking = async (req: Request, res: Response) => {
  const { venueId, firstName, lastName, startTime, endTime } = req.body;

  if (!venueId || !firstName || !lastName || !startTime || !endTime) {
    return res.status(400).json({
      error: 'Missing required fields',
      success: false,
    });
  }

  const st = new Date(startTime);
  const et = new Date(endTime);

  if (Number.isNaN(st.getTime()) || Number.isNaN(et.getTime())) {
    return res.status(400).json({
      error: 'Invalid date format',
      success: false,
    });
  }

  if (st >= et) {
    return res.status(400).json({
      error: 'Start time must be before end time',
      success: false,
    });
  }

  let isIdExisting: boolean;
  let bookingId: string;

  do {
    bookingId = createBookingId();

    const existingId = await pgDatabase.query<{ bookingId: string }>(
      'SELECT bookingId FROM Booking WHERE bookingId = $1',
      [bookingId],
    );

    isIdExisting = existingId.rows.length > 0;
  } while (isIdExisting);

  try {
    const existingBookings = await pgDatabase.query<Booking>(
      `SELECT * FROM Booking
     WHERE venueId = $1
     AND ((startTime < $2 AND endTime > $3) OR (startTime < $4 AND endTime > $5) OR (startTime >= $6 AND endTime <= $7))`,
      [venueId, et, et, st, st, st, et],
    );

    if (existingBookings.rows.length > 0) {
      return res.status(409).json({
        error: 'Venue is already booked within the selected time range',
        success: false,
      });
    }

    await pgDatabase.query(
      'INSERT INTO Booking (bookingId, venueId, firstName, lastName, startTime, endTime) VALUES ($1, $2, $3, $4, $5, $6)',
      [bookingId, venueId, firstName, lastName, st, et],
    );

    return res.status(201).json({
      message: 'Booking created successfully',
      bookingId,
      success: true,
    });
  } catch (err) {
    console.error('Error creating booking:', err);
    if ((err as { code?: string }).code === '23503') {
      return res.status(400).json({
        error: 'Invalid venueId',
        success: false,
      });
    }
    return res
      .status(500)
      .json({ error: 'Failed to create booking', success: false });
  }
};

export const updateBooking = async (
  req: Request<
    { id: string },
    { message?: string; success: boolean; error?: string },
    Pick<Booking, 'startTime' | 'endTime'>,
    void
  >,
  res: Response,
) => {
  const { id } = req.params;
  const { startTime, endTime } = req.body;

  if (!startTime || !endTime) {
    return res
      .status(400)
      .json({ error: 'Missing required fields', success: false });
  }

  const st = new Date(startTime);
  const et = new Date(endTime);

  if (Number.isNaN(st.getTime()) || Number.isNaN(et.getTime())) {
    return res.status(400).json({
      error: 'Invalid date format',
      success: false,
    });
  }

  if (st >= et) {
    return res.status(400).json({
      error: 'Start time must be before end time',
      success: false,
    });
  }

  try {
    const bookings = await pgDatabase.query<{ venueId: number }>(
      'SELECT venueId AS "venueId" FROM Booking WHERE bookingId = $1',
      [id],
    );

    const booking = bookings.rows[0];

    if (!booking) {
      return res.status(404).json({
        error: 'Booking not found',
        success: false,
      });
    }

    const { venueId } = booking;

    const existingBookings = await pgDatabase.query<Booking>(
      `SELECT * FROM Booking
     WHERE venueId = $1
     AND bookingId != $2
     AND ((startTime < $3 AND endTime > $4) OR (startTime < $5 AND endTime > $6) OR (startTime >= $7 AND endTime <= $8))`,
      [venueId, id, et, et, st, st, st, et],
    );

    if (existingBookings.rows.length > 0) {
      return res.status(409).json({
        error: 'Venue is already booked within the selected time range',
        success: false,
      });
    }

    await pgDatabase.query(
      'UPDATE Booking SET startTime = $1, endTime = $2 WHERE bookingId = $3',
      [st, et, id],
    );

    return res.status(200).json({
      message: 'Booking updated successfully',
      success: true,
    });
  } catch (err) {
    console.error('Error updating booking:', err);

    return res.status(500).json({
      error: 'Failed to update booking',
      success: false,
    });
  }
};

export const deleteBooking = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const { id } = req.params;
  try {
    const result = await pgDatabase.query(
      'DELETE FROM Booking WHERE bookingId = $1',
      [id],
    );
    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ error: 'Booking not found', success: false });
    }
    return res.status(200).json({
      message: 'Booking deleted successfully',
      success: true,
    });
  } catch (err) {
    console.error('Error deleting booking:', err);
    return res
      .status(500)
      .json({ error: 'Failed to delete booking', success: false });
  }
};
