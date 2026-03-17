# Skill: MSW & Testing Mocks

## 1. Mock Factory Pattern

- **Trigger:** Creating mock data for a new feature.
- **Rules:** Use `createXxxHandlers(baseUrl)` factory pattern. Store data in `fixtures.ts`.
- **Blueprint Placeholder:**

```typescript
// mocks/handlers.ts
import { http, HttpResponse } from 'msw';
import { appointmentFixtures } from './fixtures';

export function createAppointmentHandlers(baseUrl: string) {
  return [
    http.get(`${baseUrl}/appointments`, () => {
      return HttpResponse.json(appointmentFixtures);
    }),
  ];
}
```
