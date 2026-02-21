# Harvest Faith Ghana

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/Isaac97410/Hope-Way-church-platform)

A production-ready full-stack application built on Cloudflare Workers and Pages. This template provides a modern React frontend with a Hono-powered API backend, complete with UI components, state management, theming, and seamless deployment to Cloudflare's global edge network.

## Features

- **React 18** with Vite for fast development and hot module replacement
- **shadcn/ui** component library with Tailwind CSS and Radix UI primitives
- **Hono** for type-safe API routing on Cloudflare Workers
- **TanStack Query** for data fetching, caching, and mutations
- **Dark mode** support with `useTheme` hook and CSS variables
- **Responsive design** with Tailwind and custom animations
- **Error boundaries** and client-side error reporting
- **Sidebar layout** optional with mobile support
- **Sonner** toasts and rich notifications
- **Zustand** for lightweight state management (ready to use)
- **TypeScript** end-to-end with proper types for Workers
- **Cloudflare-first**: Assets served via Pages, API via Workers

## Tech Stack

| Frontend | Backend | Tools & Utils |
|----------|---------|---------------|
| React 18 | Hono | Vite, TypeScript |
| Vite | Cloudflare Workers | Tailwind CSS |
| shadcn/ui | Cloudflare KV/D1 ready | TanStack Query |
| Lucide Icons |  | Zod validation |
| Framer Motion |  | Sonner toasts |
| React Router |  | Immer + Zustand |

## Prerequisites

- [Bun](https://bun.sh/) (recommended package manager)
- [Cloudflare CLI (Wrangler)](https://developers.cloudflare.com/workers/wrangler/install/)
- Node.js 18+ (for type generation)

## Installation

1. Clone the repository or download the project files.

2. Install dependencies:
   ```bash
   bun install
   ```

3. Generate Worker types (if needed):
   ```bash
   bun run cf-typegen
   ```

## Local Development

1. Start the development server:
   ```bash
   bun dev
   ```
   - Frontend: http://localhost:3000 (or `${PORT:-3000}`)
   - Backend: Automatically proxied at `/api/*`

2. In a new terminal, preview the production build:
   ```bash
   bun run preview
   ```

3. Lint the codebase:
   ```bash
   bun lint
   ```

## Usage

- **Frontend**: Edit `src/pages/HomePage.tsx` or add routes in `src/main.tsx`.
- **Backend**: Add API routes in `worker/userRoutes.ts` (do not modify `worker/index.ts`).
- **Components**: Use shadcn/ui components from `@/components/ui/*`. Add custom ones in `@/components/`.
- **API Calls**: Use TanStack Query hooks. Example:
  ```tsx
  const { data } = useQuery({
    queryKey: ['test'],
    queryFn: () => fetch('/api/test').then(res => res.json()),
  });
  ```
- **Error Reporting**: Client errors are automatically sent to `/api/client-errors`.
- **Theme**: Toggle dark/light mode with `<ThemeToggle />`.
- **Layout**: Wrap pages in `<AppLayout>` for sidebar support.

## Build for Production

```bash
bun run build
```

Dist: `dist/` (frontend assets), Worker ready for deployment.

## Deployment

Deploy to Cloudflare Pages + Workers with one command:

```bash
bun run deploy
```

This bundles the Worker and uploads assets automatically.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/Isaac97410/Hope-Way-church-platform)

**Manual Steps (Wrangler)**:
1. Login: `wrangler login`
2. Deploy: `wrangler deploy`
3. Custom domain: Edit `wrangler.jsonc`.

Bindings (KV, D1, R2, DO) can be added to `wrangler.jsonc`.

## Project Structure

```
├── src/              # React app (Vite)
│   ├── components/   # UI components + shadcn/ui
│   ├── hooks/        # Custom hooks
│   ├── lib/          # Utilities
│   ├── pages/        # Page components
│   └── main.tsx      # Entry point + Router
├── worker/           # Cloudflare Worker (Hono API)
├── shared/           # Shared TS types (if needed)
├── vite.config.ts    # Vite + Cloudflare plugin
└── wrangler.jsonc    # Deployment config
```

## Scripts

| Script | Description |
|--------|-------------|
| `bun dev` | Start dev server (frontend + proxied API) |
| `bun build` | Build for production |
| `bun preview` | Preview production build |
| `bun lint` | Lint codebase |
| `bun deploy` | Deploy to Cloudflare |
| `bun cf-typegen` | Generate Worker types |

## Customization

- **UI**: Install more shadcn components: Reference `components.json`.
- **Routes**: Backend in `worker/userRoutes.ts`, Frontend in `src/main.tsx`.
- **Env Vars**: Add to `wrangler.jsonc` under `vars`.
- **Tailwind**: Extend `tailwind.config.js`.

## Contributing

1. Fork the repo.
2. Create a feature branch.
3. Install deps with `bun install`.
4. Commit changes.
5. Open a PR.

## License

MIT License. See [LICENSE](LICENSE) for details.