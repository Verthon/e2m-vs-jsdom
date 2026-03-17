# Skill: Feature-Specific UI & Design System

## 1. Design System Consumption

- **Trigger:** Building UI elements within a feature.
- **Rules:** Import from `src/ui/`. Do not edit them. Do not add `className`.
- **Blueprint Placeholder:**

```tsx
import { CalendarCheck, Star } from 'lucide-react';
import { Button } from 'src/ui/atoms/Button/Button';

<Button variant="primary" onClick={onSelect}>Book</Button>
<Button variant="outline" onClick={onCancel}>Cancel</Button>
<Star size={14} className="fill-current" />
<CalendarCheck size={20} />
```
