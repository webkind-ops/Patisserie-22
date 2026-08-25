import React from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  id?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search pastries, coffee, sourdough...',
  className,
  id = 'menu-search-input',
}) => {
  const handleClear = () => {
    onChange('');
  };

  return (
    <div
      role="search"
      className={cn(
        'relative flex items-center w-full min-h-[44px] rounded-2xl bg-surface border border-surface-border transition-all duration-150 focus-within:border-lavender-500 focus-within:ring-2 focus-within:ring-lavender-200 shadow-soft-sm',
        className
      )}
    >
      <div className="absolute left-3.5 flex items-center pointer-events-none text-charcoal-muted" aria-hidden="true">
        <Search className="w-4 h-4 text-lavender-600" />
      </div>

      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search menu items"
        autoComplete="off"
        spellCheck="false"
        className="w-full h-11 pl-10 pr-10 text-sm bg-transparent rounded-2xl text-charcoal placeholder:text-charcoal-muted/70 focus:outline-none"
      />

      {value && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search query"
          className="absolute right-1.5 flex items-center justify-center w-8 h-8 rounded-full text-charcoal-muted hover:text-charcoal hover:bg-lavender-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
