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

- Upload files with drag-and-drop support
- Create, rename, and delete files
- Move files between folders via drag-and-drop
- In-browser image preview for image files
- File size tracking per user

### Folder Organization

- Create nested folders
- Navigate folders with breadcrumbs
- Drag-and-drop to move files/folders between folders

### Search

- Global search across all files and folders
- Real-time search results

### Trash & Recovery

- Move files/folders to trash
- Restore items from trash
- Permanently delete items
- Empty trash functionality

### Starred Items

- Star/favorite files and folders
- Quick access to starred items view

### User Management

- Sign up and login (email/password + Google OAuth)
- Email verification
- Change password
- Profile picture upload/change
- Delete account
- Storage usage tracking and display

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── (main)/         # Protected routes
│   │   ├── dashboard/  # Main file view
│   │   ├── star/       # Starred items
│   │   └── trash/      # Trash view
│   ├── (profile)/      # Profile routes
│   │   └── profile/    # User profile
│   ├── api/            # API routes
│   │   ├── auth/       # Auth endpoints
│   │   ├── search/     # Search API
│   │   └── uploadthing/ # File upload
│   └── auth/           # Auth pages (login/signup)
├── components/
│   ├── ui/             # Reusable UI components
│   ├── forms/          # Form components
│   ├── dialogs/        # Dialog components
│   ├── cards/          # Content card components
│   ├── empty/          # Empty state components
│   └── button/         # Button components
├── lib/
│   ├── types/          # TypeScript types
│   └── utils.ts        # Utilities
└── server/
    ├── actions/        # Server actions for mutations
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
- `BETTER_AUTH_SECRET` - Better Auth secret key
- `BETTER_AUTH_URL` - Your app URL
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `UPLOADTHING_TOKEN` - UploadThing API token

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
