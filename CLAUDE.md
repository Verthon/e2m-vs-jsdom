# Project: Medical Appointment Booking (Flatline)

## Stack
React 19, TypeScript 5.9, React Query v5, React Router v7, Tailwind CSS v4, Base UI React, Rsbuild, Vitest 4, MSW 2

## Architecture

Feature-based modules under `src/`. Each feature is self-contained:
```
src/<feature>/
  components/    — UI components
  hooks/         — React hooks (consume queries/mutations)
  pages/         — Route-level components (lazy-loaded)
  queries/       — React Query definitions (query factories)
  services/      — Plain fetch functions (no React)
  mocks/         — MSW handlers + fixtures
  types.ts       — Feature types
```

## Off-limits
**Do NOT modify `src/ui/`** — local design system, import and use only.

## Patterns — follow exactly

### Service (plain functions, no hooks)
See `src/core/auth/services/authService.ts`:
- Env var for API base: `import.meta.env.PUBLIC_<NAME>_API`
- Use `fetch` with `credentials: 'include'`
- Typed request/response via feature `types.ts`

### Queries (query factory pattern)
See `src/core/auth/queries/authQueries.ts`:
- Use `queryOptions()` and `mutationOptions()` from `@tanstack/react-query`
- Hierarchical keys: `['feature', 'entity']`
- Group as `const featureQueries = { all, list, detail } as const`
- Mutations in separate `const featureMutations = { ... } as const`

### Hooks (consume queries)
See `src/core/auth/useUser.ts`:
- Wrap `useQuery(featureQueries.xxx())`
- Return `{ data, isPending, isError }` — transform data to frontend shape

### MSW mocks
See `src/core/auth/mocks/authHandlers.ts`:
- Export `createXxxHandlers(baseUrl: string)` factory
- Fixtures in separate `fixtures.ts`
- Register in `src/integrations/mockServer.ts`

### Routing
- Add paths to `src/routing/routesConfig.ts`
- Lazy-load pages in `src/routing/Routes.tsx`

### Env vars
Prefix with `PUBLIC_`. Add new APIs to `.env.local` and `.env.example`.

## Commands
- `npm run dev` — start dev server
- `npm run build` — production build
- `npm test` — run vitest

## PRD
See `PRD.md` for functional requirements. MVP: login → book appointment (5 steps) → view list → cancel.
