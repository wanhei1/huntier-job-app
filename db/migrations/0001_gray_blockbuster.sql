ALTER TABLE "applicants" ALTER COLUMN "job_preferences" SET DEFAULT '{}'::jsonb;--> statement-breakpoint
ALTER TABLE "applicants" ALTER COLUMN "remote_option" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "applicants" ALTER COLUMN "relocation_option" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "applicants" ADD COLUMN "first_name" text;--> statement-breakpoint
ALTER TABLE "applicants" ADD COLUMN "last_name" text;--> statement-breakpoint
ALTER TABLE "applicants" ADD COLUMN "chinese_name" text;--> statement-breakpoint
ALTER TABLE "applicants" ADD COLUMN "certifications" text[];--> statement-breakpoint
ALTER TABLE "applicants" ADD COLUMN "projects" jsonb;--> statement-breakpoint
ALTER TABLE "applicants" ADD COLUMN "location" text;--> statement-breakpoint
ALTER TABLE "applicants" ADD COLUMN "github_url" text;--> statement-breakpoint
ALTER TABLE "applicants" ADD COLUMN "portfolio_url" text;