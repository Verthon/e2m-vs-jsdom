Skill: Markup Integration (Stitch → Feature Components)

Trigger: User pastes raw HTML/markup from Stitch, Figma export, or any external design tool.

---

## Pipeline

Every paste follows these steps in order. Do NOT skip steps. Do NOT combine steps silently.

### Step 1 — Receive

Dump the raw markup into a single temporary page component at `src/<feature>/<PageName>.tsx`.
No transformations yet. This is a checkpoint — confirm with the user that it renders.

### Step 2 — Audit

Diff the paste against DESIGN.md and the design-system-engineer rules. Produce a violation report as a checklist before making any changes. Categories:

| Category | What to flag |
|---|---|
| Icons | Any non-Lucide icon (material-symbols-outlined, inline SVGs, icon fonts, custom icons) |
| Typography | Sizes/weights that don't match the type scale (H1=2.441rem/600, H2=1.953rem/600, H3=1.563rem/500, H4=1.25rem/500, Body=1rem/400, Small=0.8rem/400) |
| Radius | Any radius value not in tokens: 0.625rem (large), ~8px (medium), ~6px (small) |
| Colors | Raw hex values or Tailwind colors not mapped to design tokens (Surgical Teal, Near Black, Muted Steel, etc.) |
| Dark mode | Any `dark:` prefixed classes → will be stripped |
| Stitch artifacts | Custom utility classes that don't exist in the project Tailwind config (e.g., `hairline-border`, `no-shadow`) |
| Inline overrides | Inline font declarations (`font-['Inter']`), hardcoded font stacks |
| Raw elements | `<button>`, `<a>`, `<input>`, `<h1>`–`<h6>`, `<p>` that have `src/ui/` equivalents |
| Shadows/gradients | Any box-shadow or gradient → DESIGN.md forbids them |
| Hardcoded strings | Any user-visible text not going through i18n |

Present the report to the user. Wait for acknowledgment before proceeding.

### Step 3 — Map (Design System Translation)

Replace raw HTML elements with `src/ui/` component imports. Mapping rules:

| Raw element | Maps to | Notes |
|---|---|---|
| `<h1>`–`<h6>` | `Heading` from `src/ui/Heading/Heading` | Use `level` prop matching the semantic level |
| `<p>`, body text `<span>` | `Text` from `src/ui/Text/Text` | |
| `<a>` | `Link` from `src/ui/Link/Link` | If it exists; otherwise keep `<a>` |
| `<button>` | `Button` from `src/ui/Button/Button` | Match variant: primary/secondary/destructive/ghost |
| `<input>`, `<select>`, `<textarea>` | Corresponding `src/ui/` form component | If it exists; otherwise keep raw + flag for design-system-engineer |

**Rules:**
- NEVER add `className` to `src/ui/` components. If styling doesn't match a variant, flag it for the design-system-engineer.
- If no `src/ui/` equivalent exists for an element (`<nav>`, `<footer>`, `<ul>`, `<section>`, `<header>`, `<main>`), keep it as raw semantic HTML.
- Replace non-Lucide icons with the closest Lucide React equivalent. If no match, leave a `{/* TODO: icon — <original name> */}` comment and flag it.

### Step 4 — Strip & Normalize

Remove or replace in this order:

1. **Dark mode** — Delete all `dark:` prefixed classes.
2. **Stitch artifacts** — Delete custom utility classes not in the project Tailwind config. If the class provides essential styling (e.g., border), replace with the equivalent Tailwind utility using project tokens.
3. **Inline font declarations** — Delete `font-['Inter']` and similar. The font is set at the root.
4. **Non-token values** — Replace with the closest design token:
   - Arbitrary radius (e.g., `rounded-[10px]`) → `rounded-[0.625rem]`
   - Arbitrary colors → mapped to design token Tailwind classes
   - Arbitrary sizes not on the type scale → closest scale step
5. **Shadows and gradients** — Delete. No replacements.

### Step 5 — Extract (Propose → Approve)

Analyze the page component and propose a component split. Present the proposal as:

```
Proposed extraction:
- <ComponentName> — one-line description of responsibility
  Lines: ~XX–YY in the current file
- <ComponentName> — ...
- Stays inline: description of what remains in the page component
```

**Do NOT extract until the user approves the split.**

Extraction rules once approved:
- Each extracted component lives in `src/<feature>/components/<ComponentName>.tsx`
- Props should be typed, minimal, and explicit — no prop spreading.
- The page component imports and composes the extracted components.
- Shared types go in `src/<feature>/types.ts`.

### Step 6 — i18n

Extract every hardcoded user-visible string into `src/<feature>/locales/en.json`.

Key naming convention: `<feature>.<section>.<semanticIntent>`

Examples:
- `pricing.header.title` → "Select Your Treatment Plan"
- `pricing.header.subtitle` → "All plans include access to our AI. It has opinions."
- `pricing.tier.vitalSigns.name` → "Vital Signs"
- `pricing.tier.vitalSigns.price` → "$29"
- `pricing.tier.vitalSigns.selectButton` → "Select Vital Signs"
- `pricing.tier.vitalSigns.features.biometricMonitoring` → "Daily biometric monitoring"
- `pricing.footer.trialNote` → "All plans include a 14-day free trial. No credit card required. Cancel anytime — we won't guilt-trip you. Much."
- `pricing.footer.disclaimer` → "All services subject to clinical review and availability."

**Key rules:**
- Never flat keys (`text1`, `button`, `description`).
- Never duplicate the value in the key (`pricing.selectYourTreatmentPlan`).
- Group by semantic section, not by component tree.
- Dynamic values use `{varName}` interpolation: `"Starting at {price}/mo"`
- Plurals use ICU syntax.
- De-emphasized segments use `<sub>` tag: `sub: (chunks) => <span>{chunks}</span>`
- Use `t()` from `useLocale()`. Never `useIntl()` or `FormattedMessage`.

---

## Boundary Reminders

- This skill does NOT create or modify `src/ui/` components. If a design system component is missing or needs a new variant, flag it and redirect to design-system-engineer.
- All file creation stays within `src/<feature>/`.
- Icons: Lucide React only. If the paste uses a different library, translate or flag — never install a package.