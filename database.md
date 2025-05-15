# Huntier Job Application - Neon Database & Drizzle Setup

This README provides instructions for setting up and configuring Neon (serverless Postgres) with Drizzle ORM to store CV data from job-seekers using the Huntier job application platform.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setting Up Neon Database](#setting-up-neon-database)
- [Installing Dependencies](#installing-dependencies)
- [Configuring Database Connection](#configuring-database-connection)
- [Creating Schema with Drizzle](#creating-schema-with-drizzle)
- [Setting Up Environment Variables](#setting-up-environment-variables)
- [Implementing API Routes](#implementing-api-routes)
- [Testing the Setup](#testing-the-setup)
- [Migrating the Database](#migrating-the-database)

## Prerequisites

- Node.js (16.x or later)
- Bun package manager
- A Neon account (free tier available)

## Setting Up Neon Database

1. Go to [Neon](https://neon.tech) and create an account
2. Create a new project
3. Make note of your connection string, which will look like:
   ```
   postgres://username:password@endpoint/database
   ```

## Installing Dependencies

Add the required packages to your project:

```bash
bun add drizzle-orm @neondatabase/serverless dotenv
bun add -D drizzle-kit pg
```

## Configuring Database Connection

Create a new file in your project at `lib/db.ts`:

```typescript
// lib/db.ts
import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool } from '@neondatabase/serverless';

// Create connection pool
const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL 
});

// Create Drizzle ORM instance
export const db = drizzle(pool);
```

## Creating Schema with Drizzle

Create a new directory `db/schema` and add files for your tables:

```typescript
// db/schema/applicants.ts
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
  jobPreferences: jsonb('job_preferences'),
  remoteOption: boolean('remote_option'),
  relocationOption: boolean('relocation_option'),
  salaryExpectations: text('salary_expectations'),
  resumeUrl: text('resume_url'),
  linkedinUrl: text('linkedin_url'),
  createdAt: timestamp('created_at').defaultNow()
});
```

Create an index file to export the schema:

```typescript
// db/schema/index.ts
export * from './applicants';
```

## Setting Up Environment Variables

Create a `.env` file in your project root:

```
DATABASE_URL=postgres://username:password@endpoint/database
```

## Implementing API Routes

Create an API route to handle CV submissions:

```typescript
// app/api/applicants/route.ts
import { db } from '@/lib/db';
import { applicants } from '@/db/schema';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    
    // Insert data into database
    const result = await db.insert(applicants).values({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || null,
      skills: formData.skills || [],
      experience: formData.experience || null,
      languages: formData.languages || [],
      jobPreferences: formData.jobPreferences || {},
      remoteOption: formData.remoteOption || false,
      relocationOption: formData.relocationOption || false,
      salaryExpectations: formData.salaryExpectations || null,
      resumeUrl: formData.resumeUrl || null,
      linkedinUrl: formData.linkedinUrl || null,
    }).returning();

    return NextResponse.json({ success: true, data: result[0] });
  } catch (error) {
    console.error('Error saving applicant data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save applicant data' },
      { status: 500 }
    );
  }
}
```

## Migrating the Database

Set up Drizzle migrations:

1. Create a `drizzle.config.ts` file in your project root:

```typescript
// drizzle.config.ts
import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

export default {
  schema: './db/schema/*',
  out: './db/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  }
} satisfies Config;
```

2. Add migration scripts to your `package.json`:

```json
"scripts": {
  "db:generate": "drizzle-kit generate:pg",
  "db:migrate": "bun run db/migrations/migrate.ts",
  "db:push": "drizzle-kit push:pg",
  "db:studio": "drizzle-kit studio"
}
```

3. Create a migration script:

```typescript
// db/migrations/migrate.ts
import { drizzle } from 'drizzle-orm/neon-serverless';
import { migrate } from 'drizzle-orm/neon-serverless/migrator';
import { Pool } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config();

async function runMigrations() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool);

  console.log('Running migrations...');
  
  await migrate(db, { migrationsFolder: 'db/migrations' });
  
  console.log('Migrations completed successfully');
  
  await pool.end();
}

runMigrations().catch((error) => {
  console.error('Migration failed:', error);
  process.exit(1);
});
```

## Testing the Setup

1. Generate migrations:
   ```bash
   bun run db:generate
   ```

2. Apply migrations:
   ```bash
   bun run db:migrate
   ```

3. Use Drizzle Studio to visualize your database:
   ```bash
   bun run db:studio
   ```

## Modify Your CV Upload Component

Update your CV upload component to submit data to the API route:

```typescript
// Inside your CV upload component's submit handler
const onSubmit = async () => {
  try {
    const response = await fetch('/api/applicants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(applicantData),
    });
    
    const result = await response.json();
    
    if (result.success) {
      // Handle success case (e.g., show success message, navigate to next step)
    } else {
      // Handle error
      console.error('Error submitting CV data:', result.error);
    }
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};
```

## Additional Resources

- [Neon Documentation](https://neon.tech/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)
- [Next.js API Routes Documentation](https://nextjs.org/docs/api-routes/introduction)