
import { db } from '@/lib/db';
import { applicants } from '@/db/schema';
import { NextResponse } from 'next/server';
import { logRequest, logResponse } from '@/utils/api-logger';

export async function POST(request: Request) {
  // Log the API request
  await logRequest('POST', '/api/applicants');
  
  try {
    console.log("API endpoint called");
    
    // Try to parse the request body
    let formData;
    try {
      formData = await request.json();
      console.log("Request successfully parsed:", formData);
    } catch (parseError) {
      console.error("Error parsing request JSON:", parseError);
      const response = { success: false, error: 'Invalid JSON in request body' };
      await logResponse(400, response);
      return NextResponse.json(response, { status: 400 });
    }      // Validate required fields
    if (!formData.name) {
      console.error("Missing required field: name");
      const response = { success: false, error: 'Name is required' };
      await logResponse(400, response);
      return NextResponse.json(response, { status: 400 });
    }
    
    if (!formData.email) {
      console.error("Missing required field: email");
      const response = { success: false, error: 'Email is required' };
      await logResponse(400, response);
      return NextResponse.json(response, { status: 400 });
    }
    
    // Log keys received in formData
    console.log("Form data keys received:", Object.keys(formData));// Ensure skills is an array
    let skills = [];
    if (Array.isArray(formData.skills)) {
      skills = formData.skills;
      console.log("Skills array received:", skills);
    } else if (formData.skills) {
      skills = [formData.skills];
      console.log("Single skill converted to array:", skills);
    } else {
      console.log("No skills provided");
    }
    
    // Ensure languages is an array
    let languages = [];
    if (Array.isArray(formData.languages)) {
      languages = formData.languages;
      console.log("Languages array received:", languages);
    } else if (formData.languages) {
      languages = [formData.languages];
      console.log("Single language converted to array:", languages);
    } else {
      console.log("No languages provided");
    }
      // Parse job preferences
    const jobPreferences = typeof formData.jobPreferences === 'object' ? 
                          formData.jobPreferences : { additionalInfo: formData.additionalInfo || '' };
    console.log("Job preferences:", jobPreferences);
    
    // Handle education data - could be a string or an array of education objects
    let educationData = formData.education || null;
    if (formData.educationLevel) {
      if (Array.isArray(formData.education)) {
        // If we have detailed education objects, keep them and add the education level
        educationData = {
          level: formData.educationLevel,
          details: formData.education
        };
      } else {
        // If we just have the education level string
        educationData = formData.educationLevel;
      }
    }
    
    // Handle work history if available
    let experienceData = formData.experience || null;
    if (Array.isArray(formData.workHistory) && formData.workHistory.length > 0) {
      experienceData = {
        years: formData.experience,
        details: formData.workHistory
      };
    }
        // Prepare the values for insertion
    const values = {
      // Basic information
      name: formData.name || '',
      firstName: formData.firstName || null,
      lastName: formData.lastName || null,
      chineseName: formData.chineseName || null,
      email: formData.email || '',
      phone: formData.phone || null,
      
      // Skills and languages
      skills: skills.filter(Boolean), // Filter out any empty or null items
      languages: languages.filter(Boolean), // Filter out any empty or null items
      certifications: Array.isArray(formData.certifications) ? formData.certifications.filter(Boolean) : [],
      
      // Experience and education
      experience: experienceData,
      education: educationData,
      
      // Projects
      projects: Array.isArray(formData.projects) ? formData.projects : null,
      
      // Job preferences
      location: formData.location || null,
      jobPreferences: jobPreferences,
      remoteOption: formData.remoteOption === true || formData.remoteOption === "true",
      relocationOption: formData.relocationOption === true || formData.relocationOption === "true",
      salaryExpectations: formData.salaryExpectations ? formData.salaryExpectations.toString() : null,
      
      // URLs and links
      resumeUrl: formData.resumeUrl || null,
      linkedinUrl: formData.linkedinUrl || null,
      githubUrl: formData.githubUrl || null,
      portfolioUrl: formData.portfolioUrl || null,
    };
    
    console.log("About to insert into database:", values);
      // Test database connection
    try {
      const testConnection = await db.select().from(applicants).limit(1);
      console.log("Database connection test successful:", testConnection);
    } catch (dbConnError) {
      console.error("Database connection test failed:", dbConnError);
      const errorResponse = { 
        success: false, 
        error: 'Database connection error: ' + (dbConnError instanceof Error ? dbConnError.message : String(dbConnError)) 
      };
      await logResponse(500, errorResponse);
      return NextResponse.json(errorResponse, { status: 500 });
    }// Insert into database
    try {      
      const result = await db.insert(applicants).values(values).returning();
      console.log("Database insert result:", result);
      
      if (!result || result.length === 0) {
        console.error("Insert successful but no data returned");
        const response = { success: false, error: 'Database did not return inserted data' };
        await logResponse(500, response);
        return NextResponse.json(response, { status: 500 });
      }
      
      const successResponse = { 
        success: true, 
        data: result[0],
        message: 'Applicant data saved successfully' 
      };
      await logResponse(200, successResponse);
      return NextResponse.json(successResponse);
    } catch (insertError) {
      console.error("Database insert error:", insertError);
      const errorResponse = { 
        success: false, 
        error: 'Database insert error: ' + (insertError instanceof Error ? insertError.message : String(insertError)) 
      };
      await logResponse(500, errorResponse);
      return NextResponse.json(errorResponse, { status: 500 });
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    const errorResponse = { 
      success: false, 
      error: 'Unexpected error: ' + (error instanceof Error ? error.message : String(error)) 
    };
    await logResponse(500, errorResponse);
    return NextResponse.json(errorResponse, { status: 500 });
  }
}