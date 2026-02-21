"use client"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "src/ui/utils"

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap",
    "rounded-[4px] font-medium",
    "transition-all duration-150 ease-in-out",
    "select-none cursor-pointer",
    "relative outline-none",
    "focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-2",
    "aria-disabled:opacity-[0.45] aria-disabled:cursor-not-allowed",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 shrink-0",
    "group/button",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary-hover border border-transparent",
        primary:
          "bg-primary text-white hover:bg-primary-hover active:scale-[0.97] border-2 border-transparent",
        outline:
          "border border-border bg-background hover:bg-muted hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 aria-expanded:bg-muted aria-expanded:text-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-transparent aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "bg-transparent text-primary border-2 border-primary hover:bg-primary-ghost-bg active:scale-[0.97]",
        destructive:
          "bg-destructive/10 hover:bg-destructive/20 text-destructive border border-transparent focus-visible:ring-destructive dark:bg-destructive/20 dark:hover:bg-destructive/30",
        link: "text-primary underline-offset-4 hover:underline border border-transparent",
      },
      size: {
        /** Medium — the default. Never passed explicitly as a prop. */
        default: "h-12 gap-2 px-6 text-base min-w-[140px] [&_svg]:size-[18px]",
        /** Small — 40px height, 20px padding X, 14px font, 120px min-width. */
        sm: "h-10 gap-1.5 px-5 text-sm min-w-[120px] [&_svg]:size-4",
        /** Large — 56px height, 32px padding X, 18px font, 160px min-width. */
        lg: "h-14 gap-2.5 px-8 text-lg min-w-[160px] [&_svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ButtonProps = Omit<ButtonPrimitive.Props, "disabled"> &
  VariantProps<typeof buttonVariants> & {
    /** When true, marks the button as aria-disabled and blocks interaction without removing it from the tab order. */
    isDisabled?: boolean
  }

function Button({
  variant = "default",
  size = "default",
  isDisabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      aria-disabled={isDisabled ? true : undefined}
      focusableWhenDisabled={isDisabled}
      className={cn(buttonVariants({ variant, size }))}
      {...props}
    >
      {children}
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }
export type { ButtonProps }
