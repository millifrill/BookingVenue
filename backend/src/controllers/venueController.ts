import type { Request, Response } from 'express';
import mySqlPool from '../connectionMysql.js';
import type { ResultSetHeader, RowDataPacket } from 'mysql2';

const mySqlDatabase = mySqlPool;

interface Venue extends RowDataPacket {
   venueId: number;
   cityId: number;
   name: string;
   street: string;
   postalNumber: string;
   description: string;
   space: number;
   capacity: number;
   pricePerHour: number;
   imageURL: string;
}

export const getVenues = async (_req: Request, res: Response) => {
   try {
      const [result] = await mySqlDatabase.query<Venue[]>(
         'SELECT * FROM Venue',
      );
      if (result.length === 0) {
         return res
            .status(404)
            .json({ error: 'Venues not found', success: false });
      }
      res.status(200).json(result);
   } catch (err) {
      console.error('Error fetching venues:', err);
      return res
         .status(500)
         .json({ error: 'Failed to fetch venues', success: false });
   }
};

export const getVenueById = async (
   req: Request<
      { id: string },
      { success?: boolean; error?: string },
      void,
      void
   >,
   res: Response,
) => {
   const { id } = req.params;
   const sqlQuery = 'SELECT * FROM Venue WHERE venueId = ?';
   try {
      const [result] = await mySqlDatabase.execute<Venue[]>(sqlQuery, [id]);
      if (result.length === 0) {
         return res
            .status(404)
            .json({ error: 'Venue not found', success: false });
      }
      res.status(200).json(result[0]);
   } catch (err) {
      console.error('Error fetchig venue:', err);
      return res
         .status(500)
         .json({ error: 'Failed to fetch venue', success: false });
   }
};

export const createVenue = async (
   req: Request<
      void,
      { message?: string; success: boolean; error?: string },
      Omit<Venue, 'venueId'>,
      void
   >,
   res: Response,
) => {
   const {
      cityId,
      name,
      street,
      postalNumber,
      description,
      space,
      capacity,
      pricePerHour,
      imageURL,
   } = req.body;
   if (
      !cityId ||
      !name ||
      !street ||
      !postalNumber ||
      !space ||
      !capacity ||
      !pricePerHour
   ) {
      return res
         .status(400)
         .json({ error: 'Missing required fields', success: false });
   }
   const sqlQuery = `INSERT INTO Venue(cityId, name, street, postalNumber, description, space, capacity, pricePerHour, imageURL)
   VALUES (?,?,?,${description !== undefined ? '?' : 'DEFAULT'},?,?,?,?,${imageURL !== undefined ? '?' : 'DEFAULT'})`;
   try {
      await mySqlDatabase.execute<Venue[]>(sqlQuery, [
         cityId,
         name,
         street,
         postalNumber,
         description,
         space,
         capacity,
         pricePerHour,
         imageURL,
      ]);
      res.status(201).json({
         message: 'Venue created successfully',
         success: true,
      });
   } catch (err) {
      console.error('Error creating venue:', err);
      return res
         .status(500)
         .json({ error: 'Failed to create venue', success: false });
   }
};

export const updateVenue = async (
   req: Request<
      { id: string },
      { message?: string; success: boolean; error?: string },
      Omit<Venue, 'venueId'>,
      void
   >,
   res: Response,
) => {
   const { id } = req.params;
   const {
      cityId,
      name,
      street,
      postalNumber,
      description,
      space,
      capacity,
      pricePerHour,
      imageURL,
   } = req.body;
   if (
      !cityId ||
      !name ||
      !street ||
      !postalNumber ||
      !space ||
      !capacity ||
      !pricePerHour
   ) {
      return res
         .status(400)
         .json({ error: 'Missing required fields', success: false });
   }
   const sqlQuery = `UPDATE Venue SET cityId = ?, name = ?, street = ?, postalNumber = ?, description = ${description !== undefined ? '?' : 'DEFAULT'}, space = ?, capacity = ?, pricePerHour = ?, imageURL = ${imageURL !== undefined ? '?' : 'DEFAULT'} WHERE venueId = ?`;
   try {
      const [result] = await mySqlDatabase.execute<ResultSetHeader>(sqlQuery, [
         cityId,
         name,
         street,
         postalNumber,
         description,
         space,
         capacity,
         pricePerHour,
         imageURL,
         id,
      ]);
      if (result.affectedRows === 0) {
         res.status(404).json({ error: 'Venue not found', success: false });
      } else {
         res.status(200).json({
            message: 'Venue was updated successfully',
            success: true,
         });
      }
   } catch (err) {
      console.error('Error updating venue:', err);
      return res
         .status(500)
         .json({ error: 'Failed to update venue', success: false });
   }
};

export const deleteVenue = async (
   req: Request<
      { id: string },
      { message?: string; success: boolean; error?: string },
      Omit<Venue, 'venueId'>,
      void
   >,
   res: Response,
) => {
   const { id } = req.params;
   const sqlQuery = 'DELETE FROM Venue WHERE venueId = ?';
   try {
      const [result] = await mySqlDatabase.execute<ResultSetHeader>(sqlQuery, [
         id,
      ]);
      if (result.affectedRows === 0) {
         res.status(404).json({ error: 'Venue not found', success: false });
      } else {
         res.status(200).json({
            message: 'Venue deleted successfully',
            success: true,
         });
      }
   } catch (err) {
      console.error('Error deleting venue:', err);
      if ((err as { code?: string }).code === 'ER_ROW_IS_REFERENCED_2') {
         return res.status(409).json({
            error: 'Cannot delete a venue with bookings',
            success: false,
         });
      } else {
         return res
            .status(500)
            .json({ error: 'Failed to delete venue', success: false });
      }
   }
};
