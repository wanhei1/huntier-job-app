import { db } from '@/lib/db';
import { sql } from 'drizzle-orm';
import { applicants } from '@/db/schema';

export async function runMigrations() {
  console.log('Starting database migration to add new fields...');

  try {
    // Check if the connection is working
    const testConnection = await db.execute(sql`SELECT 1`);
    console.log('Database connection successful');

    // Add new columns if they don't exist
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
    console.log('Added new columns to the applicants table');

    // Update existing records to separate firstName and lastName from name
    await db.execute(sql`
      UPDATE applicants
      SET 
        first_name = CASE 
          WHEN position(' ' in name) > 0 
          THEN substring(name from 1 for position(' ' in name) - 1) 
          ELSE name 
        END,
        last_name = CASE 
          WHEN position(' ' in name) > 0 
          THEN substring(name from position(' ' in name) + 1) 
          ELSE '' 
        END
      WHERE (first_name IS NULL OR first_name = '') AND name IS NOT NULL
    `);
    console.log('Updated existing records with split names');

    // Copy URLs from job_preferences to their dedicated columns
    await db.execute(sql`
      UPDATE applicants
      SET 
        github_url = job_preferences->>'githubUrl',
        portfolio_url = job_preferences->>'portfolioUrl',
        location = job_preferences->>'location'
      WHERE job_preferences IS NOT NULL AND job_preferences::text != '{}'::text
    `);
    console.log('Copied URL data from job_preferences to dedicated columns');

    const result = await db.select({
      count: sql<number>`count(*)`
    }).from(applicants);
    
    console.log('Migration completed successfully');
    console.log(`Total records in database: ${result[0]?.count}`);
    
    return { 
      success: true, 
      message: 'Migration completed successfully',
      recordCount: result[0]?.count
    };
  } catch (error) {
    console.error('Migration failed:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : String(error) 
    };
  }
}
