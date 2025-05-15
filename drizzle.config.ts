import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

// Parse the database connection string
const dbUrl = new URL(process.env.DATABASE_URL!);
const host = dbUrl.hostname;
const port = parseInt(dbUrl.port || '5432');
const user = dbUrl.username;
const password = dbUrl.password;
const database = dbUrl.pathname.substring(1); // Remove leading '/'

export default {
  schema: './db/schema/*',
  out: './db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host,
    port,
    user,
    password,
    database,
    ssl: true
  }
} satisfies Config;