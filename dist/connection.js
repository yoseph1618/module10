import pool from '../db/db.js';

async function query(text, params) {
  const res = await pool.query(text, params);
  return res.rows;
}

export default query;
