import { NextResponse } from 'next/server';
import { getApplicantDetails } from '@/utils/test-applicant';

export async function GET(request: Request) {
  try {
    // Get the ID from the URL or query parameter
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({
        success: false,
        error: 'Invalid or missing ID parameter'
      }, { status: 400 });
    }
    
    const result = await getApplicantDetails(parseInt(id));
    
    if (!result.success) {
      return NextResponse.json({
        success: false,
        error: result.error
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      data: result.data
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
