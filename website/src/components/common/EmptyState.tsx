import React from 'react';
import { SearchX } from 'lucide-react';
import { Button } from './Button';
import { cn } from '@/utils/cn';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No creations found',
  description = 'Try searching with a different term or exploring another category.',
  actionLabel = 'Reset Filters',
  onAction,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center rounded-2xl bg-surface border border-surface-border my-6 shadow-soft-sm',
        className
      )}
    >
      <div className="flex items-center justify-center w-14 h-14 mb-3 rounded-full bg-lavender-soft text-lavender-primary">
        <SearchX className="w-6 h-6" />
      </div>
      <h3 className="font-serif text-2xl sm:text-3xl font-normal text-charcoal mb-1">{title}</h3>
      <p className="font-sans max-w-xs text-xs sm:text-sm text-charcoal-muted tracking-tight mb-4">{description}</p>
      {onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
