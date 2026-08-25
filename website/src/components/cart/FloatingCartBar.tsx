import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/utils/formatters';

export const FloatingCartBar: React.FC = () => {
  const { items, totalCount, totalAmount, setIsCartOpen } = useCart();

  if (items.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.aside
        aria-label="Floating cart summary"
        initial={{ y: 80, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 80, opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', damping: 24, stiffness: 300 }}
        className="fixed bottom-5 inset-x-4 max-w-lg mx-auto z-40"
      >
        <button
          onClick={() => setIsCartOpen(true)}
          className="w-full p-3.5 sm:px-5 sm:py-4 rounded-2xl bg-lavender-deep text-white shadow-[0_12px_32px_rgba(26,16,43,0.35)] flex items-center justify-between gap-3 hover:bg-lavender-900 active:scale-[0.99] transition-all border border-purple-400/20"
          aria-label="View Order and Checkout"
        >
          {/* Left Summary */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center relative">
              <ShoppingBag className="w-4 h-4 text-purple-200" />
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center shadow-soft-xs">
                {totalCount}
              </span>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-sans text-[11px] text-purple-200/80 font-medium tracking-tight">
                {totalCount} {totalCount === 1 ? 'item' : 'items'} in order
              </span>
              <span className="font-sans text-sm sm:text-base font-bold text-white tracking-tight">
                {formatCurrency(totalAmount)}
              </span>
            </div>
          </div>

          {/* Right Action */}
          <div className="flex items-center gap-1.5 text-xs font-semibold bg-white/15 px-3 py-1.5 rounded-xl text-purple-100">
            <span>View Order</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </button>
      </motion.aside>
    </AnimatePresence>
  );
};
