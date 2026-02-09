import { Button as BaseButton } from '@base-ui/react/button';
import { forwardRef, type MouseEvent, type ReactNode } from 'react';

interface ButtonProps {
  /** Button content (text, icons, etc.) */
  children: ReactNode;
  /** Visual style variant */
  variant?: 'primary' | 'outlined';
  /** Expand button to full container width */
  fullWidth?: boolean;
  /** Show loading spinner and prevent click handling (but keep button focusable) */
  isLoading?: boolean;
  /** Click handler */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  /** Button type attribute */
  type?: 'button' | 'submit' | 'reset';
  /** Accessible label (if button content is not descriptive enough) */
  ariaLabel?: string;
  /** Disabled state */
  isDisabled?: boolean;
}

const BASE_CLASSES =
  'flex items-center justify-center gap-2 cursor-pointer transition-all rounded-lg';

const VARIANT_CLASSES = {
  primary:
    'h-14 px-6 bg-emerald-800 text-white text-base font-extrabold tracking-wide shadow-lg hover:bg-[#044a33] focus:outline-none focus:ring-4 focus:ring-emerald-800/40 disabled:opacity-50 disabled:cursor-not-allowed',
  outlined:
    'h-12 min-w-[140px] px-6 border-2 border-slate-200 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white text-base font-bold hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg',
} as const;

/**
 * Inline loading spinner matching the button's text color.
 * Extracted from PageLoader but sized appropriately for inline use.
 */
const LoadingSpinner = () => (
  <svg
    aria-hidden="true"
    className="size-4 animate-spin text-current opacity-70"
    viewBox="0 0 100 101"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
      fill="currentColor"
      fillOpacity="0.2"
    />
    <path
      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
      fill="currentColor"
    />
  </svg>
);

/**
 * Accessible button component built on Base UI Button.
 *
 * Supports 2 visual variants (primary, outlined) with predefined heights and styling.
 * Can be set to full width and includes a loading state with inline spinner.
 *
 * Follows WCAG 2.1 AA guidelines:
 * - Keyboard accessible with visible focus indicators
 * - Maintains 4.5:1 contrast ratio for text
 * - Uses aria-busy to announce loading state to screen readers
 * - Disabled state maintains sufficient contrast and includes cursor indication
 *
 * @example Primary button
 * ```tsx
 * <Button onClick={handleSubmit}>Next</Button>
 * ```
 *
 * @example Loading state
 * ```tsx
 * <Button isLoading onClick={handleSave}>Saving...</Button>
 * ```
 *
 * @example Outlined variant
 * ```tsx
 * <Button variant="outlined">View Profile</Button>
 * ```
 *
 * @example Disabled button with tooltip
 * ```tsx
 * <Button isDisabled ariaLabel="Please select a doctor to continue">Next</Button>
 * ```
 *
 * @example Full width submit button
 * ```tsx
 * <Button type="submit" fullWidth>Sign In</Button>
 * ```
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      fullWidth = false,
      isLoading = false,
      onClick,
      type = 'button',
      ariaLabel,
      isDisabled,
      ...props
    },
    ref,
  ) => {
    const widthClasses = fullWidth ? 'w-full' : '';

    const buttonClasses =
      `${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${widthClasses}`.trim();

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      if (isLoading) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      onClick?.(event);
    };

    return (
      <BaseButton
        ref={ref}
        focusableWhenDisabled
        onClick={handleClick}
        type={type}
        className={buttonClasses}
        disabled={isDisabled}
        aria-label={ariaLabel}
        aria-busy={isLoading || undefined}
        {...props}
      >
        {isLoading && <LoadingSpinner />}
        {children}
      </BaseButton>
    );
  },
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps };
