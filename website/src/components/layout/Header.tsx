import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { appConfig } from '@/constants/appConfig';
import { cn } from '@/utils/cn';
import { Menu, X } from 'lucide-react';

export interface HeaderProps {
  children?: React.ReactNode;
  className?: string;
}

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Menu', path: '/menu' },
  { name: 'Gifting', path: '/gifting' },
  { name: 'Festive', path: '/festive-occasions' },
];

export const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const { store } = appConfig;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header
      className={cn(
        'w-full bg-transparent',
        className
      )}
    >
      <div className="max-w-5xl mx-auto px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/images/patisserie-22-logo.jpg" 
              alt={`${store.storeName} Logo`} 
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover shadow-soft-sm"
            />
            <div className="flex flex-col">
              <h1 className="font-serif text-xl sm:text-2xl font-normal tracking-tight text-charcoal leading-none">
                {store.storeName}
              </h1>
              <p className="font-sans text-[10px] sm:text-xs text-charcoal-muted tracking-tight mt-0.5">
                {store.tagline}
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <span className="text-xs text-lavender-700 font-medium bg-lavender-50 px-2.5 py-1 rounded-full border border-lavender-200 inline-block shadow-soft-xs">
              100% Eggless
            </span>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-lavender-700",
                  location.pathname === link.path ? "text-lavender-700" : "text-charcoal-muted"
                )}
              >
                {link.name}
              </Link>
            ))}
            <a
              href={`https://wa.me/${store.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent("Hello Patisserie'22, I would like to place an order.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-soft-sm"
            >
              Order Now
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="p-2 md:hidden text-charcoal hover:bg-lavender-50 rounded-full transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 flex flex-col gap-4 mt-3">
            <div className="flex justify-center mb-2">
              <span className="text-xs text-lavender-700 font-medium bg-lavender-50 px-3 py-1.5 rounded-full border border-lavender-200 shadow-soft-xs">
                100% Eggless Bakery
              </span>
            </div>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "px-2 py-2 text-base font-medium rounded-lg transition-colors",
                  location.pathname === link.path
                    ? "bg-lavender-50 text-lavender-700"
                    : "text-charcoal-muted hover:bg-gray-50"
                )}
              >
                {link.name}
              </Link>
            ))}
            <a
              href={`https://wa.me/${store.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent("Hello Patisserie'22, I would like to place an order.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 px-4 py-3 rounded-xl text-sm font-semibold text-center text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-soft-sm"
            >
              Order on WhatsApp
            </a>
          </nav>
        )}

        {/* Optional Slot for Search or Category Summary */}
        {children && <div className="mt-3.5">{children}</div>}
      </div>
    </header>
  );
};

export default Header;
