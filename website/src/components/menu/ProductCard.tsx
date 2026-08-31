import React, { useState } from 'react';
import { MenuItem } from '@/types/menu';
import { Badge } from '@/components/common/Badge';
import { formatCurrency } from '@/utils/formatters';
import { useCart } from '@/context/CartContext';
import {
  CAKE_WEIGHT_OPTIONS,
  isWeightConfigurable,
  calculateItemUnitPrice,
} from '@/utils/cartHelpers';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { Plus, Minus } from 'lucide-react';
import { StatefulButton } from '@/components/ui/stateful-button';

import { cn } from '@/utils/cn';

export interface ProductCardProps {
  item: MenuItem;
  className?: string;
  isFeaturedCard?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  item,
  className,
  isFeaturedCard = false,
}) => {
  const hasVariants = item.variants && item.variants.length > 0;
  const isCake = isWeightConfigurable(item);
  
  // Default variant selection
  const defaultSelection = hasVariants 
    ? item.variants![0].name 
    : (isCake ? CAKE_WEIGHT_OPTIONS[0].label : '');
    
  const [selectedVariant, setSelectedVariant] = useState<string>(defaultSelection);

  const { addToCart, updateQuantity, items } = useCart();

  const currentUnitPrice = hasVariants || isCake
    ? calculateItemUnitPrice(item, selectedVariant)
    : item.price;

  // Cart quantity for this specific item & selected variant
  const cartItemId = (hasVariants || isCake) ? `${item.id}_${selectedVariant}` : item.id;
  const currentCartItem = items.find((ci) => ci.cartItemId === cartItemId);
  const inCartQty = currentCartItem ? currentCartItem.quantity : 0;

  const handleAdd = () => {
    addToCart(item, 1, (hasVariants || isCake) ? selectedVariant : undefined);
  };

  const handleIncrement = () => {
    updateQuantity(cartItemId, inCartQty + 1);
  };

  const handleDecrement = () => {
    updateQuantity(cartItemId, inCartQty - 1);
  };

  const optionsToRender = hasVariants 
    ? item.variants!.map(v => ({ label: v.name, short: v.name }))
    : isCake 
      ? CAKE_WEIGHT_OPTIONS.map(opt => ({ label: opt.label, short: opt.label.split(' ')[0] }))
      : [];

  return (
    <div
      className={cn(
        'group flex flex-col justify-between transition-all duration-300 rounded-2xl overflow-hidden bg-white shadow-soft-sm border border-lavender-50',
        item.availability === 'out_of_stock' && 'opacity-75',
        className
      )}
    >
      <div>
        {/* Media Container */}
        <div className="relative w-full aspect-[4/3] bg-lavender-50/80 overflow-hidden">
          <ImageWithFallback
            src={item.image}
            alt={item.name}
            loading="lazy"
            containerClassName="w-full h-full absolute inset-0"
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />

          {/* Badges Over Image */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1 pointer-events-none">
            <div className="flex items-center gap-1">
              {item.isCustomizable && (
                <Badge
                  variant="custom"
                  size="sm"
                  className="bg-lavender-deep text-white border-lavender-900 font-semibold shadow-soft-sm"
                >
                  Customizable
                </Badge>
              )}
              {item.suitableOccasion && (
                <Badge
                  variant="custom"
                  size="sm"
                  className="bg-white/90 text-lavender-800 border-lavender-200 font-medium"
                >
                  {item.suitableOccasion}
                </Badge>
              )}
              {item.featured && isFeaturedCard && !item.isCustomizable && !item.suitableOccasion && (
                <Badge variant="featured" size="sm" />
              )}
            </div>
          </div>

          {item.availability !== 'in_stock' && (
            <div className="absolute bottom-2.5 left-2.5 pointer-events-none">
              <Badge variant="availability" availability={item.availability} size="sm" />
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className="p-4 flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif text-lg sm:text-xl font-normal text-charcoal leading-snug tracking-tight">
              {item.name}
            </h3>
            <div className="flex flex-col items-end shrink-0">
              {item.isStartingPrice && !isCake && !hasVariants && (
                <span className="font-sans text-[10px] font-medium text-charcoal-muted uppercase tracking-wider">
                  Starts from
                </span>
              )}
              <span className="font-sans text-sm sm:text-base font-semibold text-lavender-deep tracking-tight">
                {formatCurrency(currentUnitPrice)}
              </span>
            </div>
          </div>

          <p className="font-sans text-xs text-charcoal-muted line-clamp-2 leading-relaxed tracking-tight">
            {item.description}
          </p>

          {/* Variant / Weight Selection */}
          {(hasVariants || isCake) && (
            <div className="mt-1 pt-2 border-t border-purple-100/60 flex flex-col gap-1.5">
              <span className="font-sans text-[11px] font-medium text-charcoal-muted">
                Select Option / Size:
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {optionsToRender.map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setSelectedVariant(opt.label)}
                    className={cn(
                      'py-1.5 px-1 rounded-lg text-xs font-semibold text-center transition-all truncate',
                      selectedVariant === opt.label
                        ? 'bg-lavender-deep text-white shadow-soft-xs'
                        : 'bg-purple-50/70 text-charcoal hover:bg-purple-100 border border-purple-100'
                    )}
                  >
                    {opt.short}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Card Action & Footer */}
      <div className="px-4 pb-4 pt-1 flex items-center justify-between gap-2 border-t border-purple-100/50 mt-auto">
        <div className="flex flex-col font-sans text-[11px] text-charcoal-muted tracking-tight">
          <span className="capitalize font-medium">{item.category.replace('-', ' ')}</span>
          {item.leadTime ? (
            <span className="text-lavender-700 font-medium">{item.leadTime}</span>
          ) : item.availability === 'in_stock' ? (
            <span className="text-emerald-700 font-medium">Fresh Daily</span>
          ) : null}
        </div>

        {/* Add to Cart / Quantity Stepper Button */}
        {item.availability === 'out_of_stock' ? (
          <span className="px-3 py-1.5 rounded-full text-xs font-semibold text-charcoal-muted bg-surface-muted border border-surface-border">
            Sold Out
          </span>
        ) : inCartQty === 0 ? (
          <StatefulButton
            onClick={handleAdd}
            aria-label={`Add ${item.name} to cart`}
            className="bg-lavender-deep text-white hover:bg-lavender-900 text-xs px-3.5 py-1.5 min-h-[32px] rounded-full shadow-soft-xs"
          >
            Add
          </StatefulButton>
        ) : (
          <div className="flex items-center gap-1.5 bg-lavender-deep text-white p-1 rounded-full shadow-soft-sm">
            <button
              onClick={handleDecrement}
              className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 active:scale-90 flex items-center justify-center transition-all"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3 text-white" />
            </button>
            <span className="w-5 text-center font-sans text-xs font-bold">{inCartQty}</span>
            <button
              onClick={handleIncrement}
              className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 active:scale-90 flex items-center justify-center transition-all"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3 text-white" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
