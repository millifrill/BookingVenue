import type { Request, Response } from 'express';
import type { ResultSetHeader, RowDataPacket } from 'mysql2';
import mySqlPool from '../connectionMySql.ts';
import { createBookingId } from '../utils/createBookingId.ts';

const mySqlDatabase = mySqlPool;

interface Booking extends RowDataPacket {
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
    const [result] = await mySqlDatabase.execute<Booking[]>(
      `SELECT b.bookingId, b.venueId, b.firstName, b.lastName, b.startTime, b.endTime,
      v.name AS venueName,
      v.imageURL AS venueImageURL
      FROM Booking b 
      JOIN Venue v ON b.venueId = v.venueId
      WHERE b.bookingId = ?`,
      [id],
    );
    if (result.length === 0) {
      return res
        .status(404)
        .json({ error: 'Booking not found', success: false });
    }
    return res.status(200).json(result[0]);
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

  if (new Date(startTime) >= new Date(endTime)) {
    return res.status(400).json({
      error: 'Start time must be before end time',
      success: false,
    });
  }

  const bookingId = createBookingId();

  try {
    await mySqlDatabase.execute<ResultSetHeader>(
      'INSERT INTO Booking (bookingId, venueId, firstName, lastName, startTime, endTime) VALUES (?, ?, ?, ?, ?, ?)',
      [bookingId, venueId, firstName, lastName, startTime, endTime],
    );

    return res.status(201).json({
      message: 'Booking created successfully',
      bookingId,
      success: true,
    });
  } catch (err) {
    console.error('Error creating booking:', err);
    return res
      .status(500)
      .json({ error: 'Failed to create booking', success: false });
  }
};

export const deleteBooking = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const { id } = req.params;
  try {
    const [result] = await mySqlDatabase.execute<ResultSetHeader>(
      'DELETE FROM Booking WHERE bookingId = ?',
      [id],
    );
    if (result.affectedRows === 0) {
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
