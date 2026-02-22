# Accessibility Auditor Memory

## Project Structure
- React + TypeScript, Tailwind CSS, rsbuild (no custom HTML template — `lang` attribute must be set via rsbuild config or a template)
- Design system atoms: `src/ui/atoms/` — Button uses `@base-ui/react/button` primitive
- Appointments feature: `src/appointments/`
- i18n keys: `src/appointments/i18n/en.json` and `src/core/i18n/en.json`

## Known Patterns

### Button component (`src/ui/atoms/Button/Button.tsx`)
- Uses `focus-visible:ring-[3px]` — focus indicator EXISTS for keyboard users via `:focus-visible`
- Uses `outline-none` base class — safe because ring replaces it
- `isDisabled` uses `aria-disabled` (not `disabled`), keeps element in tab order — correct pattern

### ChooseSpecialty (`src/appointments/components/ChooseSpecialty/ChooseSpecialty.tsx`)
- CORRECT pattern: `role="radiogroup"` wrapper + visually-hidden `<input type="radio">` + styled `<label>` — the gold standard for selection cards in this codebase
- Has selected-state visual indicator (border color, bg, checkmark SVG)

### ChooseDoctor / DoctorCard — AUDIT FAILURES (see patterns.md for fixes)
- No selected state tracked in ChooseDoctor — `onDoctorSelect` fires but selected ID is not stored
- DoctorCard has no `isSelected` prop — no visual or semantic selected state
- Uses a plain `<Button>` for selection instead of the radiogroup/radio pattern used in ChooseSpecialty
- "Select" button `aria-label` includes doctor name — good — but wrong interaction pattern
- `onDoctorSelect` prop is not connected in `CreateAppointment.tsx` (`<ChooseDoctor />` used without prop)

### ChooseDoctorPage (`src/appointments/pages/ChooseDoctorPage.tsx`)
- `role="progressbar"` present with `aria-valuenow/min/max` — PASS
- Missing `aria-label` on progressbar — FAIL 1.3.1

### Global
- No `lang` attribute on `<html>` — rsbuild default template omits it — FAIL 3.1.1
- `src/styles/global.css` `outline-ring/50` base reset is safe (only applies border, not focus outline)

## Detailed Findings
See `patterns.md` for full ARIA pattern analysis and code fixes.
