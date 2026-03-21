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

## 2. TypoGraphy

- **Trigger:** Building UI elements within a feature that needs any sort of the text (p, span, headings etc)
- **Rules**:
- use the `src/ui/Text/Text` or for headings `scr/ui/Heading/Heading`, 
- for any text always add the translation for corresponding en.json to the module your are working on
