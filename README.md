# MagicUI Changelog

A modern, responsive changelog built with Next.js 15, Fumadocs MDX, and Tailwind CSS. This project provides a beautiful timeline-style interface for displaying project updates, features, and bug fixes.

## Features

- ✨ **Beautiful Timeline Design** - Visual timeline with dates, versions, and content
- 🌙 **Dark Mode Support** - Automatic theme switching
- 📱 **Fully Responsive** - Optimized for all device sizes
- 🔄 **MDX Support** - Write changelog entries in MDX format
- 🏷️ **Tagged Releases** - Organize updates with tags and versions
- ⚡ **Fast & Performant** - Built with Next.js 15 and React Server Components

## Project Structure

```
magicui-changelog/
├── app/                    # Next.js App Router
├── changelog/content/      # MDX changelog entries
├── components/            # React components
├── lib/                   # Utilities
├── public/               # Static assets
├── source.config.ts      # Fumadocs MDX configuration
└── .source/             # Generated files (ignored in git)
```

## Getting Started

### Prerequisites

- Node.js 18 or higher
- pnpm (recommended) or npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

3. Run the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Adding Changelog Entries

1. Create a new MDX file in `changelog/content/` with the format `DD-MM-YYYY-changelog.mdx`
2. Add frontmatter with required fields:

```mdx
---
title: "Your Update Title"
description: "Brief description of the update"
date: "2025-06-15"
tags: ["Feature", "Bug Fix", "Security"]
version: "1.2"
---

Your changelog content here...
```

3. The entry will automatically appear in the timeline, sorted by date.

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Content**: Fumadocs MDX
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn/ui + Fumadocs UI
- **TypeScript**: Full type safety

## Configuration

The project uses Fumadocs MDX for content management. Configuration is in `source.config.ts`:

- Content directory: `changelog/content/`
- Frontmatter validation with Zod
- Git-based last modified time
- Custom MDX component provider

## Deployment

This project can be deployed to any platform that supports Next.js:

- [Vercel](https://vercel.com) (recommended)
- [Netlify](https://netlify.com)
- [Cloudflare Pages](https://pages.cloudflare.com)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add your changelog entry
4. Submit a pull request

## License

MIT License - feel free to use this project for your own changelog needs!
