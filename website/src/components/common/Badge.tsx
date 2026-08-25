import React from 'react';
import { cn } from '@/utils/cn';
import { DietaryType, AvailabilityStatus } from '@/types/menu';
import { getDietaryMeta, getAvailabilityMeta } from '@/utils/formatters';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'dietary' | 'availability' | 'featured' | 'custom';
  dietary?: DietaryType;
  availability?: AvailabilityStatus;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'custom',
  dietary,
  availability,
  size = 'md',
  children,
  ...props
}) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';

  if (variant === 'dietary' && dietary) {
    const meta = getDietaryMeta(dietary);
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1.5 font-medium rounded-full border',
          meta.badgeClass,
          sizeClasses,
          className
        )}
        aria-label={`Dietary type: ${meta.label}`}
        {...props}
      >
        <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', meta.dotColor)} />
        <span>{children || meta.shortLabel}</span>
      </span>
    );
  }

  if (variant === 'availability' && availability) {
    const meta = getAvailabilityMeta(availability);
    return (
      <span
        className={cn(
          'inline-flex items-center font-medium rounded-full border',
          meta.badgeClass,
          sizeClasses,
          className
        )}
        aria-label={`Status: ${meta.label}`}
        {...props}
      >
        {children || meta.label}
      </span>
    );
  }

  if (variant === 'featured') {
    return (
      <span
        className={cn(
          'inline-flex items-center font-semibold rounded-full bg-lavender-500 text-offwhite border border-lavender-600 shadow-soft-sm tracking-wide',
          sizeClasses,
          className
        )}
        {...props}
      >
        {children || '★ Chef’s Special'}
      </span>
    );
  }

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full bg-lavender-soft text-lavender-deep border border-lavender-200',
        sizeClasses,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
