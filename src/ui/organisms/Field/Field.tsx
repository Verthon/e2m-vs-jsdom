import { Field as BaseField } from '@base-ui/react/field';

/**
 * Wrapper around the field Root container. Groups a label, control, error,
 * and description into a single accessible unit.
 *
 * Pass a `name` prop to wire up native form data and Base UI validation.
 *
 * @example
 * ```tsx
 * <Field.Root name="email">
 *   <Field.Label>Email</Field.Label>
 *   <Field.Control type="email" required />
 *   <Field.Error />
 * </Field.Root>
 * ```
 *
 * @example Disabled field
 * ```tsx
 * <Field.Root name="email" disabled>
 *   <Field.Label>Email</Field.Label>
 *   <Field.Control />
 * </Field.Root>
 * ```
 *
 * @example With server-side validation
 * ```tsx
 * <Field.Root name="email" invalid>
 *   <Field.Label>Email</Field.Label>
 *   <Field.Control />
 *   <Field.Error forceShow>Email already taken</Field.Error>
 * </Field.Root>
 * ```
 */
const FieldRoot = (props: BaseField.Root.Props) => (
  <BaseField.Root
    {...props}
    className="flex w-full max-w-64 flex-col items-start gap-1"
  />
);

/**
 * Accessible label bound to its sibling `Field.Control`.
 * Renders as a `<label>` — automatically dims when the field is disabled.
 *
 * @example
 * ```tsx
 * <Field.Label>Password</Field.Label>
 * ```
 */
const FieldLabel = (props: BaseField.Label.Props) => (
  <BaseField.Label
    {...props}
    className="text-sm font-medium text-gray-900 data-disabled:opacity-50"
  />
);

/**
 * The input element of the field. Renders a styled `<input>` by default.
 * Supports all native input attributes (`type`, `required`, `autoComplete`, etc.).
 *
 * Shows a red border when invalid and dims when disabled.
 *
 * @example Text input with autocomplete
 * ```tsx
 * <Field.Control type="email" autoComplete="email" required />
 * ```
 *
 * @example Password input
 * ```tsx
 * <Field.Control type="password" autoComplete="current-password" required />
 * ```
 *
 * @example Render a custom component via `render`
 * ```tsx
 * <Field.Control render={<textarea rows={4} />} />
 * ```
 */
const FieldControl = (props: BaseField.Control.Props) => (
  <BaseField.Control
    {...props}
    className="h-10 w-full rounded-md border border-gray-200 pl-3.5 text-base text-gray-900 focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-emerald-800 data-[invalid]:border-red-500 data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed"
  />
);

/**
 * Inline validation message. Hidden until the field is invalid and touched,
 * unless `forceShow` is set (useful for server-side errors).
 *
 * Without children it renders the browser's native `validationMessage`.
 *
 * @example Native constraint message (auto)
 * ```tsx
 * <Field.Error />
 * ```
 *
 * @example Custom / match-specific message
 * ```tsx
 * <Field.Error match="typeMismatch">Please enter a valid email</Field.Error>
 * ```
 *
 * @example Force-show a server error
 * ```tsx
 * <Field.Error forceShow>That email is already registered</Field.Error>
 * ```
 */
const FieldError = (props: BaseField.Error.Props) => (
  <BaseField.Error {...props} className="text-sm text-red-600" />
);

/**
 * Helper text displayed below the control (e.g. format hints, character limits).
 * Automatically linked to the control via `aria-describedby`.
 *
 * @example
 * ```tsx
 * <Field.Description>Must be at least 8 characters</Field.Description>
 * ```
 */
const FieldDescription = (props: BaseField.Description.Props) => (
  <BaseField.Description {...props} className="text-sm text-gray-600" />
);

/**
 * Styled, accessible form field built on Base UI Field primitives.
 *
 * Compose sub-components in any order inside `Field.Root`:
 *
 * | Sub-component       | Purpose                                |
 * |---------------------|----------------------------------------|
 * | `Field.Root`        | Container — pass `name`, `disabled`, `invalid` |
 * | `Field.Label`       | Accessible `<label>`                   |
 * | `Field.Control`     | `<input>` (or custom via `render`)     |
 * | `Field.Error`       | Validation message (auto or custom)    |
 * | `Field.Description` | Helper / hint text                     |
 *
 * @example Basic email field with validation
 * ```tsx
 * <Field.Root name="email">
 *   <Field.Label>Email</Field.Label>
 *   <Field.Control type="email" autoComplete="email" required />
 *   <Field.Error match="valueMissing">Email is required</Field.Error>
 *   <Field.Error match="typeMismatch">Enter a valid email</Field.Error>
 * </Field.Root>
 * ```
 *
 * @example Password field with description
 * ```tsx
 * <Field.Root name="password">
 *   <Field.Label>Password</Field.Label>
 *   <Field.Control type="password" autoComplete="new-password" required />
 *   <Field.Description>Must be at least 8 characters</Field.Description>
 *   <Field.Error />
 * </Field.Root>
 * ```
 *
 * @example Inside a Base UI Form with submit validation
 * ```tsx
 * import { Form } from '@base-ui/react/form';
 *
 * <Form.Root onSubmit={handleSubmit}>
 *   <Field.Root name="username">
 *     <Field.Label>Username</Field.Label>
 *     <Field.Control required />
 *     <Field.Error />
 *   </Field.Root>
 *   <button type="submit">Register</button>
 * </Form.Root>
 * ```
 */
export const Field = {
  Root: FieldRoot,
  Label: FieldLabel,
  Control: FieldControl,
  Error: FieldError,
  Description: FieldDescription,
};
