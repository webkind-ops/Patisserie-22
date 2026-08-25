import React from 'react';
import { cn } from '@/utils/cn';

export interface SectionTitleProps {
  title: string;
  subtitle?: string;
  count?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  count,
  as: Component = 'h2',
  className,
}) => {
  return (
    <div className={cn('flex flex-col gap-1 mb-4', className)}>
      <div className="flex items-center gap-2.5">
        <Component className="font-serif text-2xl sm:text-3xl md:text-3.5xl font-normal tracking-tight text-charcoal leading-none">
          {title}
        </Component>
        {typeof count === 'number' && (
          <span className="font-sans inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold rounded-full bg-lavender-soft text-lavender-deep tracking-tight">
            {count}
          </span>
        )}
      </div>
      {subtitle && (
        <p className="font-sans text-xs sm:text-sm text-charcoal-muted tracking-tight line-clamp-1">{subtitle}</p>
      )}
    </div>
  );
};
