import type { Request, Response } from 'express';
import pgPool from '../connectionPostgres.ts';

const pgDatabase = pgPool;

interface Venue {
  venueId: number;
  cityId: number;
  name: string;
  cityName: string;
  street: string;
  postalNumber: string;
  description: string;
  space: number;
  capacity: number;
  pricePerHour: number;
  imageURL: string;
}

interface Amenity {
  amenityId: number;
  name: string;
}

export const getVenues = async (_req: Request, res: Response) => {
  try {
    const result = await pgDatabase.query<Venue>(
      `SELECT 
        Venue.venueid AS "venueId", 
        Venue.cityid AS "cityId",
        Venue.name,
        Venue.street,
        Venue.postalnumber AS "postalNumber",
        Venue.description,
        Venue.space,
        Venue.capacity,
        Venue.priceperhour AS "pricePerHour",
        Venue.imageurl AS "imageURL",
        City.name AS "cityName"
       FROM Venue
       JOIN City ON Venue.cityId = City.cityId`,
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ error: 'Venues not found', success: false });
    }
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching venues:', err);

    return res
      .status(500)
      .json({ error: 'Failed to fetch venues', success: false });
  }
};

export const getAvailableVenueIds = async (req: Request, res: Response) => {
  const { startTime, endTime } = req.query;

  if (typeof startTime !== 'string' || typeof endTime !== 'string') {
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

  const sqlQuery = `SELECT venueId FROM Venue
     WHERE venueId NOT IN ( SELECT venueId FROM Booking
                            WHERE startTime < ? AND endTime > ?)`;

  try {
    const [availableVenues] = await mySqlDatabase.execute<RowDataPacket[]>(
      sqlQuery,
      [endTime, startTime],
    );
    const venueIds = availableVenues.map((venue) => venue.venueId);
    res.status(200).json(venueIds);
  } catch (err) {
    console.error('Error fetching available venues:', err);
    return res
      .status(500)
      .json({ error: 'Failed to fetch available venues', success: false });
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
  const sqlQuery = `SELECT
   v.venueId AS "venueId", v.cityId AS "cityId", v.name AS "name", c.name AS "cityName", v.street AS "street", v.postalNumber AS "postalNumber", v.description AS "description", v.space AS "space", v.capacity AS "capacity", v.pricePerHour AS "pricePerHour", v.imageurl AS "imageURL"
   FROM Venue v
   JOIN City c ON v.cityId = c.cityId
   WHERE v.venueId = $1`;
  try {
    const result = await pgDatabase.query<Venue>(sqlQuery, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Venue not found', success: false });
    }
    const amenities = await pgDatabase.query<Amenity>(
      `SELECT a.amenityId AS "amenityId", a.name
       FROM Amenity a
       JOIN VenueAmenity va ON a.amenityId = va.amenityId
       WHERE va.venueId = $1`,
      [id],
    );
    res.status(200).json({ ...result.rows[0], amenities: amenities.rows });
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

  const hasDescription = description !== undefined && description !== '';
  const hasImage = imageURL !== undefined && imageURL !== '';

  const sqlQuery = `INSERT INTO Venue(cityId, name, street, postalNumber, description, space, capacity, pricePerHour, imageURL)
   VALUES ($1,$2,$3,$4, ${hasDescription ? '$5' : 'DEFAULT'}, ${hasDescription ? '$6' : '$5'},${hasDescription ? '$7' : '$6'},${hasDescription ? '$8' : '$7'}, ${hasImage ? `${hasDescription ? '$9' : '$8'}` : 'DEFAULT'})`;

  const sqlValues = [cityId, name, street, postalNumber];

  if (hasDescription) {
    sqlValues.push(description);
  }

  sqlValues.push(space, capacity, pricePerHour);

  if (hasImage) {
    sqlValues.push(imageURL);
  }

  try {
    await pgDatabase.query<Venue>(sqlQuery, sqlValues);
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

  const hasDescription = description !== undefined && description !== '';
  const hasImage = imageURL !== undefined && imageURL !== '';

  const sqlQuery = `UPDATE Venue SET cityId = $1, name = $2, street = $3, postalNumber = $4, description = ${hasDescription ? '$5' : 'DEFAULT'}, space = ${hasDescription ? '$6' : '$5'}, capacity = ${hasDescription ? '$7' : '$6'}, pricePerHour = ${hasDescription ? '$8' : '$7'}, imageURL = ${hasImage ? `${hasDescription ? '$9' : '$8'}` : 'DEFAULT'} WHERE venueId = $${8 + (hasDescription ? 1 : 0) + (hasImage ? 1 : 0)}`;

  const sqlValues = [cityId, name, street, postalNumber];

  if (hasDescription) {
    sqlValues.push(description);
  }

  sqlValues.push(space, capacity, pricePerHour);

  if (hasImage) {
    sqlValues.push(imageURL);
  }

  sqlValues.push(id);

  try {
    const result = await pgDatabase.query<Venue>(sqlQuery, sqlValues);
    if (result.rowCount === 0) {
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
  const sqlQuery = 'DELETE FROM Venue WHERE venueId = $1';
  try {
    const result = await pgDatabase.query<Venue>(sqlQuery, [id]);
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Venue not found', success: false });
    } else {
      res.status(200).json({
        message: 'Venue deleted successfully',
        success: true,
      });
    }
  } catch (err) {
    console.error('Error deleting venue:', err);
    if ((err as { code?: string }).code === '23503') {
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
