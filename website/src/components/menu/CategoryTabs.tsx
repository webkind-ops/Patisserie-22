import React from 'react';
import { MENU_CATEGORIES } from '@/constants/categories';
import { MenuCategoryId } from '@/types/menu';
import { cn } from '@/utils/cn';

export interface CategoryTabsProps {
  selectedCategory: MenuCategoryId;
  onSelectCategory: (categoryId: MenuCategoryId) => void;
  categoryCounts?: Record<string, number>;
  className?: string;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts = {},
  className,
}) => {
  return (
    <nav
      aria-label="Menu categories navigation"
      className={cn(
        'w-full sticky top-0 z-20 py-3 bg-[#FFFDFB]/80 backdrop-blur-md transition-all duration-150 shadow-sm border-b border-lavender-50',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {MENU_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          const count = categoryCounts[cat.id] || 0;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={cn(
                'whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300',
                isActive
                  ? 'bg-lavender-deep text-white shadow-soft-sm shadow-lavender-500/30'
                  : 'bg-lavender-50/50 text-charcoal-muted hover:bg-lavender-100/50'
              )}
            >
              {cat.label}
              {count > 0 && (
                <span
                  className={cn(
                    'ml-2 text-xs font-bold px-1.5 py-0.5 rounded-full',
                    isActive ? 'bg-white/20 text-white' : 'bg-lavender-200/50 text-lavender-800'
                  )}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default CategoryTabs;
