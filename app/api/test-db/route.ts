import { testDbConnection } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const testResult = await testDbConnection();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database connection tested',
      result: testResult
    });
  } catch (error) {
    console.error('Error testing database connection:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error testing database connection: ' + 
          (error instanceof Error ? error.message : String(error))
      },
      { status: 500 }
    );
  }
}
