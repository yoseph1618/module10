import db from '../dist/connection.js';
// Helper function to execute a query
export async function executeQuery(query, params = []) {
    const res = await db.query(query, params);
    return res.rows;
}
