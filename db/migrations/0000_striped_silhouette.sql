CREATE TABLE "applicants" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"skills" text[],
	"experience" text,
	"education" text,
	"languages" text[],
	"job_preferences" jsonb,
	"remote_option" boolean,
	"relocation_option" boolean,
	"salary_expectations" text,
	"resume_url" text,
	"linkedin_url" text,
	"created_at" timestamp DEFAULT now()
);
