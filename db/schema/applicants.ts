import { serial, text, timestamp, boolean, jsonb } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';

export const applicants = pgTable('applicants', {
  id: serial('id').primaryKey(),
  // Basic information
  name: text('name').notNull(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  chineseName: text('chinese_name'),
  email: text('email').notNull(),
  phone: text('phone'),
  
  // Skills and languages
  skills: text('skills').array(),
  languages: text('languages').array(),
  certifications: text('certifications').array(),
  
  // Experience and education
  experience: text('experience'),  // Contains both years and detailed work history
  education: text('education'),    // Contains both level and detailed education history
  
  // Projects
  projects: jsonb('projects'),
  
  // Job preferences
  location: text('location'),
  jobPreferences: jsonb('job_preferences').default({}),
  remoteOption: boolean('remote_option').default(false),
  relocationOption: boolean('relocation_option').default(false),
  salaryExpectations: text('salary_expectations'),
  
  // URLs and links
  resumeUrl: text('resume_url'),
  linkedinUrl: text('linkedin_url'),
  githubUrl: text('github_url'),
  portfolioUrl: text('portfolio_url'),
  
  // Metadata
  createdAt: timestamp('created_at').defaultNow()
});