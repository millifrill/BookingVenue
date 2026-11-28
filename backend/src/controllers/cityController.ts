import type { Request, Response } from 'express';
import pgPool from '../connectionPostgres.ts';

const pgDatabase = pgPool;

interface City {
  cityId: number;
  name: string;
}

export const getCities = async (_req: Request, res: Response) => {
  try {
    const result = await pgDatabase.query<City>(
      `SELECT cityId AS "cityId", name
       FROM City
       ORDER BY name`,
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching cities:', err);
    return res
      .status(500)
      .json({ error: 'Failed to fetch cities', success: false });
  }
};
