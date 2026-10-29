import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const host = process.env.MYSQL_HOST;
const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const database = process.env.MYSQL_DATABASE;

if (!host || !user || !password || !database) {
   throw new Error('Missing MySQL environmet variables');
}

const mySqlPool = mysql.createPool({ host, user, password, database });

export default mySqlPool;
