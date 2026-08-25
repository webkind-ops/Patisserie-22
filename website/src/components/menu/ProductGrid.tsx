import React from 'react';
import { MenuItem } from '@/types/menu';
import { ProductCard } from './ProductCard';
import { EmptyState } from '@/components/common/EmptyState';
import { cn } from '@/utils/cn';

export interface ProductGridProps {
  items: MenuItem[];
  onResetFilters?: () => void;
  className?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  items,
  onResetFilters,
  className,
}) => {
  if (items.length === 0) {
    return (
      <EmptyState
        title="No items found in this section"
        description="We couldn't find any creations matching your search or filters."
        onAction={onResetFilters}
      />
    );
  }

  return (
    <div
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5',
        className
      )}
    >
      {items.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  );
};
