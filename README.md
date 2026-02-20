# Google Drive Clone

A Google Drive clone built with modern web technologies.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI**: React 19, Tailwind CSS v4, Radix UI
- **Database**: Neon (serverless MySQL) with Drizzle ORM
- **Authentication**: Better Auth
- **File Storage**: UploadThing
- **Forms**: React Hook Form + Zod
- **State Management**: TanStack React Query
- **Email**: Resend + React Email

## Features

### File Management

- Upload files 
- Create, rename, and delete files

### Folder Organization

- Create nested folders
- Navigate folders with breadcrumbs
- Move files between folders

### Trash & Recovery

- Move files/folders to trash
- Restore items from trash
- Permanently delete items

### Starred Items

- Star/favorite files and folders
- Quick access to starred items

### User Management

- Sign up and login
- Change password
- Profile picture upload/change
- Delete account

## Project Structure

```
src/
├── action/              # Server actions for mutations
├── app/                 # Next.js App Router
│   ├── (main)/         # Protected routes
│   │   ├── dashboard/  # Main file view
│   │   ├── star/       # Starred items
│   │   └── trash/      # Trash view
│   ├── (profile)/      # Profile routes
│   │   └── profile/    # User profile
│   ├── api/            # API routes
│   │   ├── auth/       # Auth endpoints
│   │   └── uploadthing/ # File upload
│   └── auth/           # Auth pages (login/signup)
├── components/
│   ├── ui/             # Reusable UI components
│   ├── forms/          # Form components
│   ├── dialogs/        # Dialog components
│   ├── cards/          # Content card components
│   └── empty/          # Empty state components
├── contexts/           # React contexts
├── hooks/              # Custom hooks
├── lib/
│   ├── types/          # TypeScript types
│   └── utils.ts        # Utilities
└── server/
    ├── auth/           # Auth configuration
    └── db/             # Database schema & queries
```

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 
- Neon database account
- UploadThing account
- Resend account (for emails)

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Fill in your credentials in .env

# Generate database migrations
pnpm db:generate

# Push schema to database
pnpm db:push

# Start development server
pnpm dev
```

### Environment Variables

See `.env.example` for required variables:

- `DATABASE_URL` - Neon database connection string
- `AUTH_SECRET` - Better Auth secret key
- `UPLOADTHING_SECRET` - UploadThing API secret
- `UPLOADTHING_APP_ID` - UploadThing app ID
- `RESEND_API_KEY` - Resend API key for emails

## Available Scripts

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm typecheck    # TypeScript check
pnpm check        # Lint + typecheck
pnpm db:studio    # Open Drizzle Studio
```

## License

MIT
