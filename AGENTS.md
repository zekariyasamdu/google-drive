# AGENTS.md - Developer Guide for This Project

## Project Overview

This is a Google Drive clone built with Next.js 16, React 19, TypeScript, and Drizzle ORM. It uses Neon (serverless MySQL) for the database and UploadThing for file storage.

---

## Commands

### Development

```bash
pnpm dev          # Start dev server with Turbopack
pnpm build        # Production build
pnpm start        # Start production server
```

### Code Quality

```bash
pnpm lint         # Run ESLint
pnpm typecheck    # Run TypeScript compiler (noEmit)
pnpm check        # Run lint + typecheck
pnpm format:check # Check Prettier formatting
pnpm format:write # Fix formatting with Prettier
```

### Database

```bash
pnpm db:generate  # Generate Drizzle migrations
pnpm db:migrate   # Run Drizzle migrations
pnpm db:push      # Push schema changes to DB
pnpm db:studio    # Open Drizzle Studio
```

---

## Code Style Guidelines

### Imports & Path Aliases

- Use the `~/*` path alias for all internal imports: `import { Button } from "~/components/ui/button"`
- Use inline type imports:

  ```typescript
  // Good
  import { db } from "~/server/db";
  import type { TFileInsert } from "~/lib/types/db";

  // Avoid
  import { db, type TFileInsert } from "~/server/db";
  ```

- Order imports: external libs → internal (~/\*) → types

### TypeScript Strictness

- This project uses `strict: true` and `noUncheckedIndexedAccess: true`
- Always define return types for functions when not obvious
- Use `type` for type-only imports, `interface` for object shapes
- Access array elements with optional chaining or null checks due to `noUncheckedIndexedAccess`

### Naming Conventions

- **Files**: kebab-case (e.g., `change-password.tsx`, `content-items.tsx`)
- **Components**: PascalCase (e.g., `ContentItemsCard.tsx` - but file can be kebab)
- **Functions/variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE or camelCase with prefix (e.g., `QUERIES`, `MUTATION`)
- **Database queries**: Prefix with `get`, `create`, `update`, `delete`
- **Server actions**: Prefix with action name (e.g., `uploadFile`, `deleteFolder`)

### Component Patterns

- Use `cn()` from `~/lib/utils` for conditional className merging
- Server components by default in `src/app/`
- Client components add `"use client"` at the top
- UI components live in `src/components/ui/` (Radix UI primitives)
- Feature components organized by domain in `src/components/`

### Server Actions (src/action/)

- Always use `async`/`await`
- Include proper error handling with try/catch
- Validate input with Zod schemas
- Return structured responses (not just values)
- Mark files with `"use server"` directive

### Database (Drizzle ORM)

- All DB operations go through `QUERIES` (reads) and `MUTATION` (writes) in `src/server/db/queries.ts`
- **MANDATORY**: All `update()` and `delete()` must include `where` clause (enforced by ESLint)
- Use `eq()` for equality checks, `and()`/`or()` for compound conditions
- Schema definitions in `src/server/db/schema.ts`

### Authentication

- Use Better Auth: `auth.api.getSession({ headers: await headers() })`
- Always check session in server components; redirect to `/auth/login` if null
- Get user ID from `session.user.id`

### Error Handling

- Server actions: wrap in try/catch, return errors or throw
- Components: use error boundaries for graceful failures
- Forms: use `react-hook-form` with Zod validation
- Display errors with `sonner` toasts: `toast.error("message")`

### CSS & Styling

- Use Tailwind CSS v4 exclusively
- Use `cn()` utility for conditional classes
- Follow Prettier's automatic formatting (includes Tailwind class sorting)
- Avoid custom CSS; use Tailwind utilities

---

## Project Structure

```
src/
├── action/           # Server actions
├── app/              # Next.js App Router pages
│   ├── (main)/       # Protected routes (dashboard, trash, star)
│   ├── (profile)/    # Profile routes
│   ├── api/          # API routes (auth, uploadthing)
│   └── auth/         # Auth pages (login, signup)
├── components/
│   ├── ui/           # Reusable UI primitives
│   ├── forms/        # Form components
│   ├── dialogs/      # Dialog components
│   ├── cards/        # Card components
│   └── empty/        # Empty state components
├── contexts/         # React contexts
├── hooks/            # Custom React hooks
├── lib/
│   ├── types/        # TypeScript types
│   └── utils.ts      # Utilities (cn function)
└── server/
    ├── auth/         # Auth configuration
    └── db/           # Database schema & queries
```

---

## Common Patterns

### Fetching Data in Pages

```typescript
const session = await auth.api.getSession({ headers: await headers() });
if (!session) redirect("/auth/login");
const userId = session.user.id;
const [folders, files] = await Promise.all([
  QUERIES.getFolders(userId),
  QUERIES.getFiles(userId),
]);
```

### Creating a New Component

1. Create file in appropriate `src/components/` folder
2. Use `cn()` for className merging
3. Import types from `~/lib/types/`
4. Add proper TypeScript types

### Database Queries

```typescript
// In src/server/db/queries.ts
export const QUERIES = {
  getTrashFolders: (owner_id: string) => {
    return db
      .select()
      .from(foldersSchema)
      .where(eq(foldersSchema.owner_id, owner_id));
  },
};

export const MUTATION = {
  updateFile: (fileId: number, updateData: Partial<TFileInsert> = {}) => {
    return db
      .update(filesSchema)
      .set({ ...updateData })
      .where(eq(filesSchema.id, fileId)); // Mandatory where clause
  },
};
```

---

## Pre-commit Checklist

Before committing:

- [ ] Run `pnpm check` (lint + typecheck)
- [ ] Run `pnpm format:write`
- [ ] Verify no `console.log` statements (use toasts or proper logging)
- [ ] Ensure all DB delete/update operations have `where` clauses
