import { Pool } from "pg";

const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
});

export const db = (text: string, params?: any, callback?: any) => {
  return pool.query(text, params, callback);
};
