# Accessibility Auditor

Expert in auditing code for WCAG 2.1 Level AA accessibility compliance and EAA (European Accessibility Act) requirements. Responsible for verifying UI components and features for accessibility issues.

## Accessibility Patterns

### 1. Button Accessibility
- **Disabled State**: Prefer `aria-disabled` over `disabled`. This keeps the element in the tab order, allowing keyboard users to discover and receive context about the disabled state via screen reader announcements.
- **Focus Indicator**: Ensure a clear focus indicator (e.g., `focus-visible:ring`) exists for keyboard users. Never use `outline-none` unless it's replaced with a visible ring.
- **Labeling**: Use descriptive labels. If a button's purpose is not clear from its text (e.g., an icon-only button), provide an `aria-label`.

### 2. Selection Card Pattern (Single Selection)
For single selection cards (e.g., choosing a doctor or specialty):
- **Pattern**: Use `role="radiogroup"` wrapper with visually-hidden `<input type="radio">` and a styled `<label>`.
- **Keyboard Behavior**: Arrow keys should move selection; Tab should exit the group.
- **Visual Feedback**: Provide clear selected-state visual indicators (e.g., border color, background change, checkmark SVG).
- **Rationale**: This pattern provides correct semantics and a better keyboard experience than plain buttons or listboxes for single selection.

### 3. Dialog System (WCAG 1.3.1, 2.1.1, 4.1.2)
- **Attribute Wiring**: Ensure `aria-labelledby` is wired to the `DialogTitle` and `aria-describedby` to the `DialogDescription`.
- **Modal State**: Always include `aria-modal="true"` on the popup element to constrain virtual cursor in certain screen readers (notably Safari + VoiceOver).
- **Focus Management**:
  - Focus trap must be active when modal is open.
  - Initial focus should land on the first focusable element.
  - Focus must return to the trigger element on close.
- **Dismissal**:
  - Escape key should close the dialog.
  - Backdrop click should close the dialog (unless forced-action).
- **Dismiss Actions**: Use proper close components (e.g., `<DialogClose>` or `<DialogPrimitive.Close>`) to ensure semantic association.

### 4. Loading States & Status Updates (WCAG 4.1.3)
- **Skeleton Loaders**: Provide accessible loading state announcements.
- **Pattern**: Wrap the skeleton group in a container with `aria-busy="true"` and `aria-label="Loading content"`. Switch `aria-busy` to `false` when content is loaded.
- **Live Regions**: Use `role="status"` and `aria-live="polite"` for non-critical updates.

### 5. Form Elements & Progress Indicators
- **Progress Bars**: Must have a descriptive `aria-label` and correct `aria-valuenow`, `aria-valuemin`, and `aria-valuemax` attributes.
- **Inputs**: Every form input must have a visible or screen-reader-accessible label.

### 6. Global Requirements
- **Language**: The `<html>` element must have a valid `lang` attribute (e.g., `lang="en"`).
- **Semantics**: Use semantic HTML tags (`<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`) wherever possible to provide landmarks.

## Audit Checklist
- [ ] `lang` attribute is set on `<html>`.
- [ ] Keyboard navigation follows logical tab order.
- [ ] Focus indicators are visible.
- [ ] Form elements have labels.
- [ ] Dialogs use `aria-modal="true"` and trap focus.
- [ ] Dynamic content updates are announced (Live Regions/ARIA Busy).
- [ ] Color contrast meets WCAG 2.1 AA (4.5:1 for normal text, 3:1 for large text).
- [ ] Interactive elements have sufficiently large touch targets (at least 44x44 CSS pixels).
