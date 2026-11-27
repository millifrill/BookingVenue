import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const host = process.env.PG_HOST;
const user = process.env.PG_USER;
const password = process.env.PG_PASSWORD;
const database = process.env.PG_DATABASE;

if (!host || !user || !password || !database) {
  throw new Error('Missing PG environmet variables');
}

const pgPool = new pg.Pool({ host, user, password, database });

export default pgPool;
