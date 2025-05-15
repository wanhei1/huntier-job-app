import { sql } from 'drizzle-orm';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db } from '@/lib/db';

export async function migrateToNewSchema() {
  console.log('Starting database migration to add new fields...');

  try {
    // Add new columns
    await db.execute(sql`
      ALTER TABLE applicants 
      ADD COLUMN IF NOT EXISTS first_name TEXT,
      ADD COLUMN IF NOT EXISTS last_name TEXT,
      ADD COLUMN IF NOT EXISTS chinese_name TEXT,
      ADD COLUMN IF NOT EXISTS certifications TEXT[],
      ADD COLUMN IF NOT EXISTS projects JSONB,
      ADD COLUMN IF NOT EXISTS location TEXT,
      ADD COLUMN IF NOT EXISTS github_url TEXT,
      ADD COLUMN IF NOT EXISTS portfolio_url TEXT
    `);

    // Update existing records to separate firstName and lastName from name
    await db.execute(sql`
      WITH split_names AS (
        SELECT 
          id,
          CASE 
            WHEN position(' ' in name) > 0 
            THEN substring(name from 1 for position(' ' in name) - 1) 
            ELSE name 
          END as first_name,
          CASE 
            WHEN position(' ' in name) > 0 
            THEN substring(name from position(' ' in name) + 1) 
            ELSE '' 
          END as last_name
        FROM applicants
        WHERE first_name IS NULL OR last_name IS NULL
      )
      UPDATE applicants a
      SET 
        first_name = s.first_name,
        last_name = s.last_name
      FROM split_names s
      WHERE a.id = s.id
    `);

    // Copy URLs from job_preferences to their dedicated columns
    await db.execute(sql`
      UPDATE applicants
      SET 
        github_url = job_preferences->>'githubUrl',
        portfolio_url = job_preferences->>'portfolioUrl',
        location = job_preferences->>'location'
      WHERE (github_url IS NULL OR portfolio_url IS NULL OR location IS NULL)
        AND job_preferences IS NOT NULL
    `);

    console.log('Migration completed successfully');
    return { success: true };
  } catch (error) {
    console.error('Migration failed:', error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}
