# Design System Engineer Memory

## Component Patterns

### Generic Naming Convention
- Use descriptive generic names like `Element`, not single letters like `T`
- Example: `<Element extends ElementType = "div">` instead of `<T extends ElementType = "div">`

### Anti-Patterns (NEVER DO)
- NEVER add `className` prop to design system components
  - This is a major anti-pattern in design systems
  - Components should be self-contained with fixed styling
  - If customization is needed, create a new variant or prop
- NEVER spread all props with `{...props}` unless necessary
  - Only add specific props that are needed
  - Keeps the API surface intentional and controlled

### Performance Optimizations
- Static class strings should be defined OUTSIDE the component as constants
- This prevents re-creating the same string on every render
- Example: `const CONTAINER_CLASSES = "container mx-auto px-4 sm:px-6 lg:px-8";`

### Simplicity Principle
- Keep components simple and single-purpose
- Example: If you need full-width layout, don't use Container — use a different component
- Don't add unnecessary flags like `fullWidth` that contradict the component's purpose

## File Structure

Components live in atomic layers:
- `/src/ui/atoms/` - primitives (Box, Container, Button, Text, Heading)
- `/src/ui/molecules/` - small compositions
- `/src/ui/organisms/` - larger reusable compositions

Each component directory contains:
- `ComponentName.tsx` - implementation
- `ComponentName.stories.tsx` - Storybook stories

NO barrel files (`index.ts`/`index.tsx`) - import directly from component file.

## Reference Components

Always read these first before starting work:
- `/src/ui/atoms/Box/Box.tsx` - component pattern, JSDoc style, prop typing
- `/src/ui/atoms/Box/Box.stories.tsx` - story structure, naming, organization

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

## Type Checking

Run `npm run type-check` to verify TypeScript compilation.
Note: Project may have pre-existing type errors unrelated to new work.
