# Art School Website

Official website for the Children's Art School in Taraz, Kazakhstan. Built with modern web technologies to showcase school information, events, achievements, and news.

## Tech Stack

- **Frontend Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with HttpOnly cookies
- **File Storage**: Supabase Storage
- **Deployment**: Vercel
- **Contact Forms**: Formspree

## Features

- **Bilingual Support**: Kazakh and Russian languages with instant switching
- **Admin Panel**: Secure content management system with authentication
- **Article Management**: Create, edit, and delete articles with rich text, images, files, and external links
- **Event Management**: Events with date/time scheduling
- **File Uploads**: Support for images, PDFs, and Word documents (.doc, .docx)
- **External Links**: Articles can link to external websites
- **Incremental Static Regeneration**: Optimized performance with ISR
- **Mobile Responsive**: Fully responsive design for all devices

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Supabase account and project
- Formspree account (for contact form)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd art_school
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables (see `.env.example` below)

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Environment Variables

Create a `.env.local` file:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Admin (for authentication)
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your-secure-password
```

## Supabase Setup

### 1. Database Tables

Run these SQL commands in Supabase SQL Editor:

```sql
-- Articles table
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  published BOOLEAN DEFAULT FALSE,
  event_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blocks table (for article content)
CREATE TABLE IF NOT EXISTS blocks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  content TEXT,
  order_num INTEGER NOT NULL
);

-- Index for better performance
CREATE INDEX IF NOT EXISTS idx_blocks_article_id ON blocks(article_id);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published);
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON articles(created_at DESC);

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

### 2. Block Type Constraint

```sql
ALTER TABLE blocks DROP CONSTRAINT IF EXISTS blocks_type_check;
ALTER TABLE blocks ADD CONSTRAINT blocks_type_check CHECK (type IN ('title', 'text', 'image', 'file', 'link'));
```

### 3. Storage Buckets

Create these storage buckets in Supabase Storage:

- `uploads` - For images and files (make public)

### 4. Row Level Security (RLS)

Enable RLS and create policies:

```sql
-- Enable RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocks ENABLE ROW LEVEL SECURITY;

-- Public can read published articles
CREATE POLICY "Public articles are readable by everyone"
ON articles FOR SELECT
USING (published = true);

-- Public can read blocks from published articles
CREATE POLICY "Blocks from published articles are readable"
ON blocks FOR SELECT
USING (
  article_id IN (
    SELECT id FROM articles WHERE published = true
  )
);

-- Admins can do everything (you'll need to set up admin authentication)
CREATE POLICY "Admins can manage articles"
ON articles FOR ALL
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can manage blocks"
ON blocks FOR ALL
USING (auth.uid() IS NOT NULL);
```

## Formspree Setup

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form
3. Copy your form ID (the part after `/f/` in the URL)
4. Update the form action in `components/pages/ContactPageContent.tsx`:
```tsx
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

## Project Structure

```
art_school/
├── app/                      # Next.js app router pages
│   ├── admin/               # Admin panel
│   ├── api/                 # API routes
│   ├── [category]/          # Category pages
│   └── ...
├── components/
│   ├── blocks/              # Article block components
│   ├── editor/              # Rich text editor
│   ├── home/                # Homepage sections
│   ├── layout/              # Navbar, Footer
│   └── pages/               # Page components
├── lib/
│   ├── supabase/            # Supabase utilities
│   ├── auth-helpers.ts      # Authentication helpers
│   └── translations.ts      # Language translations
├── types/
│   └── article.ts           # TypeScript types
└── public/                  # Static assets
```

## Building for Production

```bash
npm run build
npm start
```

## Deployment

This project is configured for Vercel deployment:

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

## Admin Access

- Navigate to `/admin/login`
- Enter credentials from environment variables
- Create, edit, and delete articles
- Manage categories and content

## External Services Used

- **Formspree** - Contact form handling
- **Google Docs Viewer** - Inline Word document viewing
- **Supabase** - Database, auth, and storage

## License

[Your License Here]
