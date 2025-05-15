import { NextResponse } from 'next/server';
import { checkDatabaseConnection } from '@/utils/db-utils';

export async function GET() {
  try {
    const connectionStatus = await checkDatabaseConnection();
    
    if (connectionStatus.success) {
      return NextResponse.json({
        success: true,
        message: 'Database connection is working properly',
        data: connectionStatus
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Failed to connect to the database',
        error: connectionStatus.error
      }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Error checking database connection',
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
