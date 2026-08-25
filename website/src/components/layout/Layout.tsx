import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { cn } from '@/utils/cn';

export interface LayoutProps {
  children: React.ReactNode;
  headerSlot?: React.ReactNode;
  className?: string;
  hideFooter?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  headerSlot,
  className,
  hideFooter = false,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-transparent text-charcoal selection:bg-lavender-soft selection:text-lavender-deep">
      <Header>{headerSlot}</Header>
      <main className={cn('flex-1 w-full max-w-5xl mx-auto px-4 py-4 sm:px-6 sm:py-6', className)}>
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
};
