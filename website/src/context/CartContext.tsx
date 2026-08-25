import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem } from '@/types/menu';
import { CartItem, CartContextType } from '@/types/cart';
import {
  calculateItemUnitPrice,
  generateCartItemId,
  isWeightConfigurable,
  CAKE_WEIGHT_OPTIONS,
} from '@/utils/cartHelpers';

const CART_STORAGE_KEY = 'patisserie22_cart_v1';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  const addToCart = (item: MenuItem, quantity = 1, selectedWeight?: string) => {
    // Default weight for cakes if none is passed
    const effectiveWeight =
      selectedWeight || (isWeightConfigurable(item) ? CAKE_WEIGHT_OPTIONS[0].label : undefined);

    const cartItemId = generateCartItemId(item.id, effectiveWeight);
    const unitPrice = calculateItemUnitPrice(item, effectiveWeight);

    setItems((prev) => {
      const existingIndex = prev.findIndex((ci) => ci.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          totalPrice: newQty * unitPrice,
        };
        return updated;
      }

      return [
        ...prev,
        {
          cartItemId,
          item,
          quantity,
          selectedWeight: effectiveWeight,
          unitPrice,
          totalPrice: quantity * unitPrice,
        },
      ];
    });
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    setItems((prev) =>
      prev.map((ci) => {
        if (ci.cartItemId === cartItemId) {
          return {
            ...ci,
            quantity,
            totalPrice: quantity * ci.unitPrice,
          };
        }
        return ci;
      })
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setItems((prev) => prev.filter((ci) => ci.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemQuantityInCart = (itemId: string, selectedWeight?: string): number => {
    const cartItemId = generateCartItemId(itemId, selectedWeight);
    const found = items.find((ci) => ci.cartItemId === cartItemId);
    return found ? found.quantity : 0;
  };

  const totalCount = items.reduce((sum, ci) => sum + ci.quantity, 0);
  const totalAmount = items.reduce((sum, ci) => sum + ci.totalPrice, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        totalCount,
        totalAmount,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getItemQuantityInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
