import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium rounded-full transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] select-none',
  {
    variants: {
      variant: {
        primary:
          'bg-lavender-primary text-offwhite hover:bg-lavender-700 active:bg-lavender-deep shadow-soft-sm',
        secondary:
          'bg-lavender-soft text-lavender-deep hover:bg-lavender-200 active:bg-lavender-300',
        outline:
          'border border-surface-border bg-surface text-charcoal hover:bg-lavender-50 hover:border-lavender-300 active:bg-lavender-100',
        ghost:
          'bg-transparent text-charcoal hover:bg-lavender-50 active:bg-lavender-100',
        pill:
          'bg-surface border border-surface-border text-charcoal-muted hover:text-charcoal hover:border-lavender-400 active:bg-lavender-50',
        activePill:
          'bg-lavender-deep text-offwhite border border-lavender-deep shadow-soft-sm font-semibold',
      },
      size: {
        sm: 'h-9 px-3 text-xs min-h-[36px]',
        default: 'h-11 px-5 text-sm min-h-[44px]', // 44px touch target
        lg: 'h-12 px-6 text-base min-h-[48px]',   // 48px touch target
        icon: 'h-11 w-11 min-h-[44px] min-w-[44px] p-0 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, type = 'button', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
