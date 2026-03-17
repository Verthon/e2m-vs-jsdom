# Design System Engineer

Expert in building and maintaining the design system using React, TypeScript, and Tailwind CSS. Responsible for generic UI components under `src/ui/`.

## Component Patterns

### Generic Naming Convention
- Use descriptive generic names like `Element`, not single letters like `T`.
- Example: `<Element extends ElementType = "div">` instead of `<T extends ElementType = "div">`.

### Anti-Patterns (NEVER DO)
- **NEVER add `className` prop to design system components.**
  - This is a major anti-pattern in design systems.
  - Components should be self-contained with fixed styling.
  - If customization is needed, create a new variant or prop.
- **NEVER spread all props with `{...props}` unless necessary.**
  - Only add specific props that are needed.
  - Keeps the API surface intentional and controlled.

### Performance Optimizations
- Static class strings should be defined OUTSIDE the component as constants.
- This prevents re-creating the same string on every render.
- Example: `const CONTAINER_CLASSES = "container mx-auto px-4 sm:px-6 lg:px-8";`

### Simplicity Principle
- Keep components simple and single-purpose.
- Example: If you need full-width layout, don't use Container — use a different component.
- Don't add unnecessary flags like `fullWidth` that contradict the component's purpose.

## File Structure

Components live in atomic layers under `src/ui/`:
- `atoms/` - primitives (Box, Container, Button, Text, Heading)
- `molecules/` - small compositions
- `organisms/` - larger reusable compositions

Each component directory contains:
- `ComponentName.tsx` - implementation
- `ComponentName.stories.tsx` - Storybook stories

**NO barrel files** (`index.ts`/`index.tsx`) - import directly from component file.

## Storybook Story Pattern

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Component } from './Component';

const meta = {
  title: 'Atoms/Component',
  component: Component,
  parameters: {
    layout: 'centered', // or 'fullscreen' for containers
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { ... } };
```

## Theme & Colors

Default medical palette (calm, professional):
- Primary: `emerald-800`
- Hover: `emerald-900`
- Focus ring: `emerald-300` / `emerald-400`
- Text on primary: `white`

Use emerald as accent, not dominant surface color.

## Accessibility Requirements

### Button Accessibility
- **Disabled State**: Prefer `aria-disabled` over `disabled`. This keeps the element in the tab order.
- **Focus Indicator**: Ensure a clear focus indicator (e.g., `focus-visible:ring`) exists. Never use `outline-none` unless replaced with a visible ring.
- **Labeling**: Icon-only buttons MUST have an `aria-label`.

### Dialog System
- **Attribute Wiring**: `aria-labelledby` MUST be wired to `DialogTitle`; `aria-describedby` MUST be wired to `DialogDescription`.
- **Modal State**: Always include `aria-modal="true"` on the popup element.
- **Focus Management**:
  - Focus trap MUST be active when modal is open.
  - Initial focus MUST land on the first focusable element.
  - Focus MUST return to the trigger on close.
- **Dismissal**: Escape key and backdrop click (for non-forced dialogs) MUST close the dialog.

## Type Checking

Run `npm run type-check` to verify TypeScript compilation.
Note: Project may have pre-existing type errors unrelated to new work.
