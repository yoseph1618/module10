import dotenv from 'dotenv';
dotenv.config();
import pg from 'pg';
const { Pool } = pg;
const pool = new Pool({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 5432
});
const connectDb = async () => {
    try {
        const client = await pool.connect();
        console.log('Connected to company database.');
        // Query to get the current database name
        const res = await client.query('SELECT current_database();');
        console.log(`Connected to database: ${res.rows[0].current_database}`);
        // Release the client back to the pool
        client.release();
    }
    catch (err) {
        console.error('Error connecting to database.', err);
        process.exit(1);
    }
};
export { pool, connectDb };
