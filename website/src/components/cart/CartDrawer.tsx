import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/utils/formatters';
import { generateWhatsAppOrderUrl } from '@/utils/cartHelpers';
import { OrderType, OrderCustomerInfo } from '@/types/cart';

export const CartDrawer: React.FC = () => {
  const { isCartOpen, setIsCartOpen, items, totalAmount, updateQuantity, removeFromCart, clearCart } =
    useCart();

  const [orderType, setOrderType] = useState<OrderType>('takeaway');
  const [customerName, setCustomerName] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [notes, setNotes] = useState('');

  const handlePlaceOrder = () => {
    const customerInfo: OrderCustomerInfo = {
      name: customerName,
      orderType,
      tableNumber: orderType === 'dine-in' ? tableNumber : undefined,
      notes: notes.trim() ? notes : undefined,
    };

    const whatsappUrl = generateWhatsAppOrderUrl(items, customerInfo);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative w-full max-w-md bg-[#FFFDFB] h-full shadow-2xl flex flex-col z-10 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-purple-100 flex items-center justify-between bg-white/70 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-lavender-700" />
                <h2 className="font-serif text-xl font-normal text-charcoal">Your Order</h2>
                <span className="font-sans text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-900">
                  {items.reduce((s, i) => s + i.quantity, 0)}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full text-charcoal-muted hover:text-charcoal hover:bg-purple-50 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center mb-4 text-purple-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg text-charcoal font-normal mb-1">Your cart is empty</h3>
                <p className="font-sans text-xs text-charcoal-muted max-w-xs mb-6">
                  Select your favorite artisanal pastries, custom cakes, or hampers to place an order.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-lavender-deep hover:bg-lavender-900 transition-colors shadow-soft-sm"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col gap-4 divide-y divide-purple-50">
                {/* Item List */}
                <div className="flex flex-col gap-3">
                  {items.map((ci) => (
                    <div
                      key={ci.cartItemId}
                      className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white border border-purple-100/70 shadow-soft-xs"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-base font-normal text-charcoal truncate">
                          {ci.item.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          {ci.selectedWeight && (
                            <span className="font-sans text-[11px] font-medium px-2 py-0.5 rounded-md bg-purple-50 text-purple-800 border border-purple-100">
                              {ci.selectedWeight}
                            </span>
                          )}
                          <span className="font-sans text-xs font-semibold text-lavender-deep">
                            {formatCurrency(ci.totalPrice)}
                          </span>
                        </div>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-1.5 bg-purple-50/80 p-1 rounded-lg border border-purple-100">
                        <button
                          onClick={() =>
                            ci.quantity === 1
                              ? removeFromCart(ci.cartItemId)
                              : updateQuantity(ci.cartItemId, ci.quantity - 1)
                          }
                          className="w-6 h-6 rounded-md bg-white text-charcoal flex items-center justify-center shadow-soft-xs hover:bg-purple-100 active:scale-95 transition-all"
                          aria-label="Decrease quantity"
                        >
                          {ci.quantity === 1 ? (
                            <Trash2 className="w-3 h-3 text-red-500" />
                          ) : (
                            <Minus className="w-3 h-3 text-charcoal" />
                          )}
                        </button>
                        <span className="w-6 text-center font-sans text-xs font-bold text-charcoal">
                          {ci.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(ci.cartItemId, ci.quantity + 1)}
                          className="w-6 h-6 rounded-md bg-white text-charcoal flex items-center justify-center shadow-soft-xs hover:bg-purple-100 active:scale-95 transition-all"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3 text-charcoal" />
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-end">
                    <button
                      onClick={clearCart}
                      className="text-[11px] text-red-600 hover:text-red-700 font-medium transition-colors"
                    >
                      Clear All Items
                    </button>
                  </div>
                </div>

                {/* Customer Preferences Form */}
                <div className="pt-4 flex flex-col gap-3 font-sans">
                  <h4 className="font-serif text-base text-charcoal font-normal">Order Details</h4>

                  {/* Order Type Toggle */}
                  <div className="grid grid-cols-3 gap-2">
                    {(['takeaway', 'dine-in', 'delivery'] as OrderType[]).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setOrderType(type)}
                        className={`py-2 px-1 text-center rounded-xl text-xs font-medium capitalize border transition-all ${
                          orderType === type
                            ? 'bg-lavender-deep text-white border-lavender-900 shadow-soft-xs'
                            : 'bg-white text-charcoal-muted border-purple-100 hover:border-purple-300'
                        }`}
                      >
                        {type === 'dine-in' ? 'Dine In' : type}
                      </button>
                    ))}
                  </div>

                  {/* Customer Name */}
                  <div>
                    <label className="block text-[11px] font-medium text-charcoal-muted mb-1">
                      Your Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-purple-100 focus:outline-none focus:border-lavender-500 transition-colors"
                    />
                  </div>

                  {/* Table Number if Dine-in */}
                  {orderType === 'dine-in' && (
                    <div>
                      <label className="block text-[11px] font-medium text-charcoal-muted mb-1">
                        Table Number (Optional)
                      </label>
                      <input
                        type="text"
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        placeholder="e.g. Table 4"
                        className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-purple-100 focus:outline-none focus:border-lavender-500 transition-colors"
                      />
                    </div>
                  )}

                  {/* Special Notes / Cake message */}
                  <div>
                    <label className="block text-[11px] font-medium text-charcoal-muted mb-1">
                      Special Requests / Cake Message (Optional)
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={2}
                      placeholder="e.g., Write 'Happy Birthday Sarah' on the cake"
                      className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-purple-100 focus:outline-none focus:border-lavender-500 transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Footer Checkout Bar */}
            {items.length > 0 && (
              <div className="p-4 sm:p-5 bg-white border-t border-purple-100 flex flex-col gap-3 shadow-soft-lg">
                <div className="flex items-center justify-between font-sans">
                  <span className="text-xs text-charcoal-muted">Grand Total (incl. taxes)</span>
                  <span className="font-serif text-2xl font-normal text-lavender-deep">
                    {formatCurrency(totalAmount)}
                  </span>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="w-full py-3 px-4 rounded-xl font-sans text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 transition-all flex items-center justify-center gap-2 shadow-soft-md tracking-tight"
                >
                  <svg className="w-4 h-4 fill-current text-white shrink-0" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span>Place Order on WhatsApp</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
