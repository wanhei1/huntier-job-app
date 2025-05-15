import { serial, text, timestamp, boolean, jsonb } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';

export const applicants = pgTable('applicants', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  skills: text('skills').array(),
  experience: text('experience'),
  education: text('education'),
  languages: text('languages').array(),
  jobPreferences: jsonb('job_preferences').default({}),
  remoteOption: boolean('remote_option').default(false),
  relocationOption: boolean('relocation_option').default(false),
  salaryExpectations: text('salary_expectations'),
  resumeUrl: text('resume_url'),
  linkedinUrl: text('linkedin_url'),
  createdAt: timestamp('created_at').defaultNow()
});