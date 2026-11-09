import type { Request, Response } from 'express';
import type { ResultSetHeader } from 'mysql2';
import mySqlPool from '../connectionMySql.ts';

const mySqlDatabase = mySqlPool;

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
