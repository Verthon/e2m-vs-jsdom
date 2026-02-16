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

- Core translations stored in `src/core/i18n/en.json`; use `useCoreTranslation()` for core keys
- Each feature has its own `src/<feature>/i18n/en.json` and `use<Feature>Translation.ts` hook
- Feature hook pattern: `createUseTranslation<typeof en>()` from `src/i18n/useTranslation`
- Hook provides `{ t, formatMessage, locale, setLocale }`
- New feature `en.json` must be merged into `src/i18n/I18nProvider.tsx` `messagesByLocale` object
- Translation keys follow pattern: `<feature>.<area>.<key>` (e.g., `appointments.stepper.back`)

### useStepper vs useStepperContext

- `useStepper()` — public API for navigation: `{ isFirst, isLast, prev, next, goTo, steps, ... }`; does NOT expose `state` or `stepLabels`
- `useStepperContext()` — internal context access; exposes `{ state, dispatch, stepLabels, ... }`
- For `StepperProgress`, source `state`, `dispatch`, `stepLabels` from `useStepperContext()` directly

### Available UI Components (src/ui/)

- `Box` - flex container with responsive padding, direction, justify props
- `Container` - centered layout with responsive horizontal padding
- `Text` - typography with weight, size, color props
- `Avatar` - user avatar with fallback initials from `avatarUrl`, `alt`, `fallback` props
- `Button` - interactive button component
- `Heading` - heading elements
- `PageLoader` - loading state for pages
- `Skeleton` - skeleton loading placeholder (exists in `src/ui/atoms/Skeleton/`)
- `Field` - form field organism

### Loading States

- `Skeleton` component exists in `src/ui/atoms/Skeleton/` - use it directly
- `sr-only` Tailwind class is confirmed in use (e.g., PageLoader) for visually hidden elements

### Component Patterns

- Page components are default exports
- Use absolute imports for `src/` paths
- Relative imports for same-feature files (e.g., `../auth/useAuth`)
- Compose with existing `src/ui/` components, never modify them

### Custom Hook Naming & Decomposition

- Name hooks after their specific purpose, not generically (e.g., `useStepAnnouncer`, `useStepDocumentTitle` NOT `useStepperA11y`)
- If a hook does two distinct things, split into two purpose-named hooks and compose them
- Side-effect hooks (useEffect wrapping DOM/document mutations) MUST live in their own dedicated hook file, not inline in context/provider files
- Never put raw useEffect calls for side effects directly in context provider files
- Avoid useEffect for initializing state from props — derive initial state directly in the reducer initializer function instead

### Stepper Feature (src/appointments/components/Stepper/)

- `stepperReducer.ts` - reducer + `createInitialState(totalSteps)`
- `types.ts` - `StepperState`, `StepperAction`, `StepState`
- `StepperContext.tsx` - context, `StepperProvider`, `useStepperContext`
- `useStepAnnouncer.ts` - updates aria-live region ref on step change
- `useStepDocumentTitle.ts` - updates `document.title` on step change
- `StepperProgress.tsx` - visual step progress: `<ol>` + `<progress>`, accepts `{ state, dispatch, stepLabels }`
- `buildInitialState` in context handles `initialStep` offset without useEffect
- Live region: `role="status"` + `aria-live="polite"` + `className="sr-only"` (NOT display:none)
- `useStepper.ts` — public hook API; exports `UseStepperReturn` interface; wraps all dispatch calls in `useCallback`; error guard inherited from `useStepperContext` throw

### CSS / Styling

- Project uses Tailwind v4 via `@import 'tailwindcss'` in `src/App.css`
- Vendor pseudo-element selectors (`::-webkit-progress-bar`, `::-moz-progress-bar`) cannot be Tailwind utilities — add to `src/App.css` as global styles, not inline `<style>` blocks in components
- Never use inline `<style>` blocks in components

### Link Component (src/ui/atoms/Link/Link.tsx)

- Polymorphic: default renders `<a>`, accepts `component` prop for router links
- Spreads `...rest` — `onClick`, `href` all forwarded to the rendered element
- Omit `href` for click-only dispatch-based navigation; just pass `onClick`
- Never add `className` to `Link` (design system constraint)
