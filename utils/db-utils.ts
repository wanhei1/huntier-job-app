// This file contains helper functions to check the database connection
import { db } from '@/lib/db';
import { applicants } from '@/db/schema';
import { sql } from 'drizzle-orm';

export async function checkDatabaseConnection() {
  try {
    // Try to execute a simple query using SQL count function
    const result = await db.select({
      count: sql<number>`count(*)`
    }).from(applicants);
    
    console.log('Database connection check: Success');
    console.log('Current applicant count:', result[0]?.count);
    
    return {
      success: true,
      message: 'Database connection successful',
      count: result[0]?.count
    };
  } catch (error) {
    console.error('Database connection check failed:', error);
    
    return {
      success: false,
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : String(error)
    };
  }
}
