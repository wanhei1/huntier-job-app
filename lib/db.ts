
// lib/db.ts

import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool } from '@neondatabase/serverless';

// Log the DB connection string (masking sensitive data)
const dbUrl = process.env.DATABASE_URL || '';
let logUrl = dbUrl;
if (dbUrl) {
  // Mask password in connection string for logging
  try {
    const url = new URL(dbUrl);
    if (url.password) {
      url.password = '***';
      logUrl = url.toString();
    }
  } catch (e) {
    console.error('Error parsing DATABASE_URL:', e);
  }
}
console.log('DATABASE_URL configured:', logUrl ? 'Yes' : 'No');

// Create connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Create Drizzle ORM instance
export const db = drizzle(pool);

// Export a test connection function
export async function testDbConnection() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    client.release();
    console.log('Database connection test successful:', result.rows[0]);
    return { success: true, timestamp: result.rows[0].now };
  } catch (error) {
    console.error('Database connection test failed:', error);
    return { success: false, error: String(error) };
  }
}
