import { NextResponse } from 'next/server';
import { migrateToNewSchema } from '@/db/migrations/manual-migration';

// This endpoint should only be accessible to administrators
export async function GET() {
  try {
    const result = await migrateToNewSchema();
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Database schema migration completed successfully'
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Database schema migration failed',
        error: result.error
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error during migration:', error);
    return NextResponse.json({
      success: false,
      message: 'Error executing migration',
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
