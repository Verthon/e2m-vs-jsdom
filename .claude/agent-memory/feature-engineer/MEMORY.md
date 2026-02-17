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

- `useStepper()` — public API: `{ activeKey, orderedKeys, direction, isFirst, isLast, steps, meta, next, prev, goTo, completeStep, setStepValidity, skip, reset }`
- `useStepperContext()` — internal context: `{ state, dispatch, orderedKeys, activeKey, isFirst, isLast, direction, registration }`
- `next` and `goTo` in `useStepper` are async — check `onBeforeLeave` before dispatching
- `setStepValidity` dispatches `SET_VALIDITY` (key, valid); `reset` dispatches `RESET` with `initialKey`

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
- Always use arrow functions for components and hooks (`export const Foo = () => ...`), never `function` declarations

### Custom Hook Naming & Decomposition

- Name hooks after their specific purpose, not generically (e.g., `useStepAnnouncer`, `useStepDocumentTitle` NOT `useStepperA11y`)
- If a hook does two distinct things, split into two purpose-named hooks and compose them
- Side-effect hooks (useEffect wrapping DOM/document mutations) MUST live in their own dedicated hook file, not inline in context/provider files
- Never put raw useEffect calls for side effects directly in context provider files
- Avoid useEffect for initializing state from props — derive initial state directly in the reducer initializer function instead

### Stepper Types (src/appointments/components/Stepper/types.ts)

- All types use `type`, never `interface`
- `StepperState` uses `Map<string, StepState>` and string keys (`activeKey`, `previousKey`) — NOT numeric indices
- `direction` is NOT in state; derived via `DeriveDirection` utility type exported from types.ts
- Actions that need ordering receive `orderedKeys: string[]` — reducer is pure, provider passes keys at dispatch time
- `StepMeta` holds per-step registration metadata (label, description, optional, onBeforeLeave)
- `DeriveDirection` is a function type signature: `(orderedKeys, activeKey, previousKey) => 'forward' | 'backward' | null`

### Stepper Feature (src/appointments/components/Stepper/)

- `stepperReducer.ts` - reducer + `createInitialState(initialKey, allKeys)`
- `types.ts` - `StepperState`, `StepperAction`, `StepState`, `StepMeta`, `DeriveDirection`
- `StepperContext.tsx` - context, `StepperProvider`, `useStepperContext`; exposes `registration` from `useRegistration()`
- `useStepAnnouncer.ts` - takes `liveRegionRef: RefObject<HTMLElement | null>`; reads context + registration; builds "Step {n} of {total}: {label}"; sets `.textContent` in useEffect
- `useStepDocumentTitle.ts` - takes `formatter: (step, total, label) => string`; captures previous title in ref before each update; restores on cleanup
- `useStepFocus.ts` - takes `(activeKey, stepKey, stepRef)`; focuses fieldset when step becomes active using wasActiveRef to detect transition
- `StepperProgress.tsx` - `useRender` with `defaultTagName: 'progress'`; `ProgressRenderState = { value, max, percentage }`
- `StepperNext.tsx` - async click: reads `onBeforeLeave` from `getMeta(stepKey)`, awaits, early-returns if false; dispatches `NEXT`; disabled when step `valid` is false
- `StepperPrev.tsx` - dispatches `PREV`; disabled when `isFirst`; no `onBeforeLeave` check
- `StepperSkip.tsx` - dispatches `SKIP_STEP`; disabled when step is NOT optional (reads `getMeta`)
- `StepperComplete.tsx` - `type="submit"` button; disabled when step `valid` is false; triggers form `onSubmit` → `onComplete`
- `StepperRoot.tsx` - uses inner `StepperInner` component to call `useStepAnnouncer` inside provider; live region uses `<output aria-live="polite">` NOT `<div role="status">` (sonarjs S6819)
- `useStepper.ts` — exports `UseStepperReturn` type (not interface); wraps all dispatch in `useCallback`
- `RegistrationContext.tsx` — `useRef<Map<string, StepMeta>>`; `getAllMeta` returns shallow copy; `register` merges with `DEFAULT_META`
- `StepperValidation.tsx` — dispatches `SET_VALIDITY` synchronously during render via ref-guarded comparison; returns `null`
- `StepperNav.tsx` — `<nav aria-label="Progress"><ol>`; accepts `renderItem` prop
- `StepperNavItem.tsx` — internal; `NavItemRenderState` type; `GO_TO` on click; `<span inert="">` for unvisited; `aria-current="step"` for active
- `StepperRoot.tsx` — `Object.assign(StepperRoot, { Step, Label, Description, Nav, Validation, Next, Prev, Skip, Complete, Progress })`; no index.ts barrel

### Accessibility

- Use `<output aria-live="polite">` for live regions — NOT `<div role="status">` (sonarjs rule S6819)
- `<output>` has implicit `role="status"` natively and is more broadly supported across AT

### CSS / Styling

- Project uses Tailwind v4 via `@import 'tailwindcss'` in `src/App.css`
- Vendor pseudo-element selectors (`::-webkit-progress-bar`, `::-moz-progress-bar`) cannot be Tailwind utilities — add to `src/App.css` as global styles, not inline `<style>` blocks in components
- Never use inline `<style>` blocks in components

### Link Component (src/ui/atoms/Link/Link.tsx)

- Polymorphic: default renders `<a>`, accepts `component` prop for router links
- Spreads `...rest` — `onClick`, `href` all forwarded to the rendered element
- Omit `href` for click-only dispatch-based navigation; just pass `onClick`
- Never add `className` to `Link` (design system constraint)
