# ARIA Patterns & Fixes

## Selection Card Pattern Decision

### Three candidates

| Pattern | ARIA roles | Keyboard behaviour | Use when |
|---|---|---|---|
| `radiogroup` + hidden `<input type="radio">` | `radiogroup` / `radio` | Arrow keys move selection; Tab exits group | Exactly one must be selected; cannot deselect |
| `listbox` + `option[aria-selected]` | `listbox` / `option` | Arrow keys move focus; Space/Enter select | Single or multi-select; deselect possible |
| Toggle buttons `button[aria-pressed]` | `button` | Tab between cards; Space/Enter toggle | Each card independently togglable; multi-select |

### Recommendation for ChooseDoctor
Use **`radiogroup` + visually-hidden `<input type="radio">`** — identical to the ChooseSpecialty pattern already in the codebase.

Rationale:
- Exactly one doctor must be chosen before proceeding — semantics map to radio
- Arrow-key navigation reduces Tab stops for users of assistive technology
- Consistent with the established ChooseSpecialty pattern — no new pattern debt
- "Cannot deselect" is intentional UX here: user must pick one to advance the stepper

If product decides deselection is needed later, migrate to `listbox`/`option` with `aria-selected`.

## Code Fixes

### Fix 1 — ChooseDoctor: track selected state, pass isSelected, use radiogroup

```tsx
// src/appointments/components/ChooseDoctor/ChooseDoctor.tsx
import { useState } from 'react';
import { useAppointmentsTranslation } from '../../i18n/useAppointmentsTranslation';
import { DoctorCard } from './DoctorCard';

interface ChooseDoctorProps {
  readonly onDoctorSelect?: (doctorId: string) => void;
}

export function ChooseDoctor({ onDoctorSelect }: ChooseDoctorProps) {
  const { t } = useAppointmentsTranslation();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (doctorId: string) => {
    setSelectedId(doctorId);
    onDoctorSelect?.(doctorId);
  };

  const handleViewProfile = () => {};

  return (
    <section aria-label={t('appointments.chooseDoctor.section')} className="flex flex-col gap-6">
      <h2 className="text-slate-900 dark:text-white text-xl font-bold">
        {t('appointments.chooseDoctor.section')}
      </h2>
      {/* radiogroup: arrow-key navigation, single selection, matches ChooseSpecialty pattern */}
      <div role="radiogroup" aria-label={t('appointments.chooseDoctor.section')}>
        {DOCTORS.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            name={doctor.name}
            imageUrl={doctor.imageUrl}
            imageAlt={doctor.imageAlt}
            rating={doctor.rating}
            nextAvailable={doctor.nextAvailable}
            bio={doctor.bio}
            isSelected={selectedId === doctor.id}
            onSelect={() => handleSelect(doctor.id)}
            onViewProfile={handleViewProfile}
          />
        ))}
      </div>
    </section>
  );
}
```

### Fix 2 — DoctorCard: add isSelected prop, use hidden radio input + label, add visual indicator

```tsx
// src/appointments/components/ChooseDoctor/DoctorCard.tsx
interface DoctorCardProps {
  readonly name: string;
  readonly imageUrl: string;
  readonly imageAlt: string;
  readonly rating: string;
  readonly nextAvailable: string;
  readonly bio: string;
  readonly isSelected: boolean;   // NEW
  readonly onSelect: () => void;
  readonly onViewProfile: () => void;
}

export function DoctorCard({
  name, imageUrl, imageAlt, rating, nextAvailable, bio,
  isSelected, onSelect, onViewProfile,
}: DoctorCardProps) {
  const { t } = useAppointmentsTranslation();

  return (
    <label
      className={[
        'flex flex-col md:flex-row items-center gap-6 rounded-xl border-2 p-6 transition-all cursor-pointer',
        'focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
        isSelected
          ? 'border-primary bg-primary/5'
          : 'border-slate-700 dark:border-slate-600 bg-white dark:bg-slate-900/50 hover:shadow-lg',
      ].join(' ')}
    >
      {/* Visually hidden radio input — gives screen readers role="radio" and checked state */}
      <input
        type="radio"
        className="sr-only"
        checked={isSelected}
        onChange={onSelect}
        name="doctor-selection"
        value={name}
      />

      <img
        src={imageUrl}
        alt={imageAlt}
        className="h-40 w-full md:w-48 shrink-0 rounded-lg object-cover bg-slate-100"
      />
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-slate-900 dark:text-white text-2xl font-extrabold">{name}</h3>
          <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full text-primary font-bold">
            <Star size={14} className="fill-current" aria-hidden="true" />
            <span>{rating}</span>
          </div>
        </div>
        <p className="text-primary font-bold flex items-center gap-2">
          <CalendarCheck size={20} aria-hidden="true" />
          {nextAvailable}
        </p>
        <p className="text-slate-700 dark:text-slate-400 text-sm leading-relaxed max-w-xl">{bio}</p>

        {/* Visual selected indicator + View Profile button */}
        <div className="mt-4 flex flex-wrap gap-3 items-center">
          {/* Selected checkmark badge — aria-hidden because the radio input communicates state */}
          {isSelected && (
            <span
              aria-hidden="true"
              className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-sm font-bold text-white"
            >
              <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3" aria-hidden="true">
                <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {t('appointments.chooseDoctor.selectLabel')}ed
            </span>
          )}
          {/* Stop click bubbling so clicking the button doesn't also trigger the label's radio */}
          <Button
            variant="outline"
            onClick={(e) => { e.preventDefault(); onViewProfile(); }}
            aria-label={`${t('appointments.chooseDoctor.viewProfile')} ${name}`}
          >
            {t('appointments.chooseDoctor.viewProfile')}
          </Button>
        </div>
      </div>
    </label>
  );
}
```

### Fix 3 — ChooseDoctorPage: label the progressbar

```tsx
<div
  role="progressbar"
  aria-valuenow={75}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-label={t('appointments.chooseDoctor.stepLabel')}  // ADD
  className="h-full bg-primary rounded-full"
  style={{ width: '75%' }}
/>
```

### Fix 4 — rsbuild: set lang attribute

```ts
// rsbuild.config.ts
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    attrs: {
      lang: 'en',
    },
  },
});
```

### Fix 5 — i18n key for selected badge

```json
// src/appointments/i18n/en.json — add:
"appointments.chooseDoctor.selectedLabel": "Selected"
```

Then replace the hardcoded "ed" suffix in the badge with `t('appointments.chooseDoctor.selectedLabel')`.
