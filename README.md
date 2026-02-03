## Personal Portfolio

Modern, responsive portfolio site built with Next.js and TypeScript. Includes an About page, recommendations, and a clean layout optimized for fast loads and easy updates.

## Quick Start

Install dependencies and start the dev server:

```bash
pnpm dev
```

Open `http://localhost:3000`.

## Project Structure

- `src/app/page.tsx` - home page
- `src/app/about/page.tsx` - about page
- `src/components` - reusable UI components
- `src/app/**/` - route-based pages and layouts
- `public/` - static assets

## Customize

- Update content in `src/app/page.tsx` and `src/app/about/page.tsx`.
- Update styles in the matching `*.module.css` files.
- Add new sections/components under `src/components`.

## Build

```bash
pnpm build
pnpm start
```
