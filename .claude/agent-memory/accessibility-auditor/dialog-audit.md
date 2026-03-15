---
name: dialog-audit
description: WCAG 2.1 AA audit findings for the Dialog component system and its three consumer dialogs
type: project
---

# Dialog System Audit (2026-03-15)

## Files audited
- `src/ui/molecules/Dialog/Dialog.tsx` — base component wrapping `@base-ui/react/dialog`
- `src/appointments/components/ReviewAndConfirm/TermsOfServiceDialog.tsx`
- `src/appointments/components/ReviewAndConfirm/CancellationPolicyDialog.tsx`
- `src/appointments/components/ReviewAndConfirm/SlotTimer/SlotExpiredDialog.tsx`
- `src/appointments/hooks/useModal.ts`

## What @base-ui/react/dialog provides automatically (PASS)
- `role="dialog"` on the popup element (via `useRole` hook defaulting to "dialog")
- `aria-labelledby` wired to `DialogTitle` element ID
- `aria-describedby` wired to `DialogDescription` element ID
- Focus trap via `FloatingFocusManager` (Tab/Shift+Tab contained)
- Initial focus on open (first focusable element, or popup itself for touch)
- Return focus to trigger on close (`restoreFocus: "popup"`)
- Escape key closes topmost dialog (`escapeKey: isTopmost`)
- Backdrop click closes (via `useDismiss`, `outsidePress` handler)
- Scroll lock on body when `modal=true` (default)
- `aria-hidden` applied to background content via `markOthers` in FloatingFocusManager
- Backdrop has `role="presentation"` (correct — removes it from accessibility tree)

## Confirmed FAILURES

### FAIL-D1 — Missing `aria-modal` attribute (WCAG 1.3.1, APG dialog pattern)
The ARIA dialog spec and APG pattern require `aria-modal="true"` on the popup element when using a modal dialog. Neither the base-ui library nor the wrapper adds it. The `FloatingFocusManager` relies on `markOthers` (aria-hidden on siblings) as its strategy instead of `aria-modal`, which is incomplete — some AT/browser combos (notably Safari + VoiceOver) do not honour aria-hidden and require `aria-modal` to constrain virtual cursor.
- File: `src/ui/molecules/Dialog/Dialog.tsx` line 50 (`DialogPrimitive.Popup`)
- Fix: pass `aria-modal="true"` to `DialogPrimitive.Popup` in `DialogContent`

### FAIL-D2 — Skeleton loader has no accessible loading state announcement (WCAG 4.1.3)
When `TermsOfServiceDialog` and `CancellationPolicyDialog` open in their pending state, the skeleton placeholders (`Skeleton` component) are plain `<span>` elements with no role, no `aria-label`, and no `aria-busy` or live region. Screen reader users receive no indication that content is loading.
- Files: `src/appointments/components/ReviewAndConfirm/TermsOfServiceDialog.tsx` lines 33–38; `CancellationPolicyDialog.tsx` lines 33–38
- Fix: wrap the skeleton group in a container with `aria-busy="true"` and `aria-label="Loading content"` when `isPending`, switch to `aria-busy="false"` when resolved. Alternatively add `role="status"` and `aria-live="polite"` on the content region.

### FAIL-D3 — SlotExpiredDialog: Escape key navigates to home (unexpected behavior, WCAG 3.2.2)
`SlotExpiredDialog.handleOpenChange` calls `navigate(routesConfig.home)` whenever the dialog closes (`!open`). Since base-ui fires `onOpenChange(false)` for Escape key presses, pressing Escape navigates the user away from the page rather than just dismissing the dialog. This is a destructive, unexpected side-effect of a standard keyboard interaction.
- File: `src/appointments/components/ReviewAndConfirm/SlotTimer/SlotExpiredDialog.tsx` lines 23–28
- Fix: Only navigate on explicit user action (button click), not in `onOpenChange`. The `disablePointerDismissal` prop can block backdrop click, and the close button in `DialogContent` can be hidden (`showCloseButton={false}`) to make it a forced-action dialog, or the navigation can be separated from the dismiss event.

### FAIL-D4 — `useModal` lazy mount pattern can race with focus management (WCAG 2.1.1)
In `ReviewAndConfirm.tsx` lines 163–172, `TermsOfServiceDialog` and `CancellationPolicyDialog` are conditionally rendered only when `isOpen` is true (`{tosModal.isOpen && <TermsOfServiceDialog ... />}`). The dialog is wrapped in `<Suspense>`. When the lazy import resolves asynchronously, the component mounts after the click event. This can break base-ui's `openMethod` detection (which tracks what interaction type opened the dialog), potentially causing focus to land incorrectly on touch devices. Using a controlled `open` prop on an always-mounted dialog, or ensuring the lazy component is pre-loaded on hover/focus of the trigger, is safer.
- File: `src/appointments/components/ReviewAndConfirm/ReviewAndConfirm.tsx` lines 163–172

### FAIL-D5 — Close button in DialogFooter is a raw Button, not DialogPrimitive.Close (WCAG 4.1.2)
`TermsOfServiceDialog` line 54 and `CancellationPolicyDialog` line 54 use `<Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>` rather than `<DialogClose>` or `<DialogPrimitive.Close>`. This means the button is not semantically associated with the dialog dismiss action and will not receive the base-ui `data-slot="dialog-close"` attribute or any future close-specific behaviour from the library. It also bypasses the `onOpenChange` lifecycle properly, though functionally it works.
- Files: `TermsOfServiceDialog.tsx` line 54; `CancellationPolicyDialog.tsx` line 54
- Fix: replace with `<DialogFooter showCloseButton={true} />` or wrap the Button in `<DialogClose render={<Button ...>Close</Button>} />`

## PASS items confirmed
- `DialogTitle` present in all three dialogs — `aria-labelledby` will be populated
- `DialogDescription` present in all three dialogs — `aria-describedby` will be populated
- Close button has `<span className="sr-only">Close</span>` — screen reader label PASS
- Backdrop click closes dialog — PASS
- Escape closes dialog (except side-effect noted in FAIL-D3)
- Focus trap active when modal=true (default) — PASS
- Return focus to trigger on close — PASS (via FloatingFocusManager `restoreFocus`)
- Scroll lock on body — PASS
- Background content hidden from AT via aria-hidden — PASS (markOthers strategy)

**Why:** These findings inform what needs fixing before the dialog system is considered WCAG 2.1 AA compliant.
**How to apply:** When reviewing or modifying any dialog in this codebase, apply FAIL-D1 fix globally in `Dialog.tsx`, fix FAIL-D2 in both info dialogs, and redesign SlotExpiredDialog navigation (FAIL-D3).
