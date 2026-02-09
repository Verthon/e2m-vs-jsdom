# Feature Engineer Memory

## Key Patterns & Conventions

### Routing
- Uses `react-router` (NOT `react-router-dom`)
- Import `Link` from `'react-router'`
- Route paths defined in `src/routing/routesConfig.ts`
- Routes registered in `src/routing/Routes.tsx` with lazy loading

### Authentication
- `useAuth()` hook returns `{ authorizationStatus, userId }`
- `authorizationStatus` values: `'pending' | 'error' | 'authenticated' | 'unauthenticated'`
- `useUser()` hook returns `{ data, isPending, isError }` with user data
- `useLogout()` hook returns `{ logout, isPending }` for logout functionality
- Both hooks consume queries from `src/core/auth/queries/authQueries.ts`
- `SignedIn` and `SignedOut` components conditionally render children based on auth status
- Located at `src/core/auth/components/SignedIn.tsx` and `SignedOut.tsx`

### i18n/Translations
- Core translations stored in `src/core/i18n/en.json`
- Use `useCoreTranslation()` hook from `src/core/i18n/useCoreTranslation.ts`
- Hook provides `{ t, formatMessage, locale, setLocale }`
- Translation keys follow pattern: `core.<feature>.<key>` (e.g., `core.nav.brand`)
- Always add new translation keys to the JSON file before using them

### Available UI Components (src/ui/)
- `Box` - flex container with responsive padding, direction, justify props
- `Container` - centered layout with responsive horizontal padding
- `Text` - typography with weight, size, color props
- `Avatar` - user avatar with fallback initials from `avatarUrl`, `alt`, `fallback` props
- `Button` - interactive button component
- `Heading` - heading elements
- `PageLoader` - loading state for pages
- `Field` - form field organism

### Loading States
- No Skeleton component exists yet in design system
- For now, use placeholder divs with Tailwind classes: `bg-gray-200 rounded animate-pulse`
- Add TODO comments: `// TODO: Replace with Skeleton component when available in design system`

### Component Patterns
- Page components are default exports
- Use absolute imports for `src/` paths
- Relative imports for same-feature files (e.g., `../auth/useAuth`)
- Compose with existing `src/ui/` components, never modify them
