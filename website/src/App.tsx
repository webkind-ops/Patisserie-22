import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from '@/routes/AppRoutes';
import { SplashLoader } from '@/components/common/SplashLoader';
import { CartProvider } from '@/context/CartContext';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { FloatingCartBar } from '@/components/cart/FloatingCartBar';
import { ScrollToTop } from '@/components/ScrollToTop';

import { ErrorBoundary } from '@/components/ErrorBoundary';

export const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <ErrorBoundary>
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          {showSplash && <SplashLoader onComplete={() => setShowSplash(false)} durationMs={5100} />}
          <AppRoutes />
          <FloatingCartBar />
          <CartDrawer />
        </BrowserRouter>
      </CartProvider>
    </ErrorBoundary>
  );
};

export default App;
