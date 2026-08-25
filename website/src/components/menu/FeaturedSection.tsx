import React from 'react';
import { MenuItem } from '@/types/menu';
import { ProductCard } from './ProductCard';
import { SectionTitle } from '@/components/common/SectionTitle';
import { cn } from '@/utils/cn';

export interface FeaturedSectionProps {
  items: MenuItem[];
  className?: string;
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  items,
  className,
}) => {
  if (items.length === 0) return null;

  return (
    <section
      aria-label="Chef's featured creations"
      className={cn('mb-8', className)}
    >
      <SectionTitle
        title="Chef's Signatures"
        subtitle="Handpicked highlights crafted fresh daily in limited batches"
        count={items.length}
      />

      {/* Horizontal Swipe on Mobile, 3-Card Grid on Desktop */}
      <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-auto no-scrollbar touch-scroll -mx-4 px-4 sm:mx-0 sm:px-0 py-1">
        {items.map((item) => (
          <div
            key={`featured-${item.id}`}
            className="w-[280px] sm:w-auto shrink-0 sm:shrink"
          >
            <ProductCard item={item} isFeaturedCard />
          </div>
        ))}
      </div>
    </section>
  );
};
