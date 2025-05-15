// This file is a utility to test the database schema
import { db } from '@/lib/db';
import { applicants } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function getApplicantDetails(id: number) {
  try {
    const result = await db.select().from(applicants).where(eq(applicants.id, id));
    
    if (result.length === 0) {
      return { success: false, error: 'Applicant not found' };
    }
    
    return { 
      success: true, 
      data: result[0]
    };
  } catch (error) {
    console.error('Error fetching applicant:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : String(error)
    };
  }
}
