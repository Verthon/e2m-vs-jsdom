import { Button as BaseButton } from '@base-ui/react/button';
import { forwardRef, type MouseEvent, type ReactNode } from 'react';

interface ButtonProps {
  /** Button content (text, icons, etc.) */
  children: ReactNode;
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
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
  isDisabled?: boolean;
}

const baseClasses =
  'inline-flex items-center justify-center gap-2 font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800 rounded-full cursor-pointer';

const variantClasses = {
  primary: 'bg-emerald-800 text-white hover:bg-emerald-900',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
  outline:
    'border-2 border-gray-400 bg-transparent text-gray-900 hover:bg-gray-100',
  ghost: 'bg-transparent text-gray-900 hover:bg-gray-100',
} as const;

const sizeClasses = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-base',
  lg: 'h-12 px-6 text-lg',
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
 * Supports 4 visual variants (primary, secondary, outline, ghost) and 3 sizes (sm, md, lg).
 * Can be set to full width and includes a loading state with inline spinner.
 *
 * This button follows an a11y philosophy of never being disabled — instead use the
 * `loading` prop to indicate async operations while keeping the button focusable.
 *
 * @example Primary button
 * ```tsx
 * <Button onClick={handleSubmit}>Submit</Button>
 * ```
 *
 * @example Loading state
 * ```tsx
 * <Button loading onClick={handleSave}>Save</Button>
 * ```
 *
 * @example Secondary variant, small size
 * ```tsx
 * <Button variant="secondary" size="sm">Cancel</Button>
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
      size = 'md',
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
      `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClasses}`.trim();

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
