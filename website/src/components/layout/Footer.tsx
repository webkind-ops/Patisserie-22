import React from 'react';
import { Link } from 'react-router-dom';
import { appConfig } from '@/constants/appConfig';
import { Clock, Phone, Navigation } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
  const { store } = appConfig;
  const whatsappUrl = `https://wa.me/${store.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent("Hello Patisserie'22, I would like to place an order.")}`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${store.storeName}, ${store.address.line1}, ${store.address.line2}, ${store.address.city}, ${store.address.postalCode}`)}`;

  return (
    <footer
      className={cn(
        'w-full mt-12 bg-transparent text-charcoal',
        className
      )}
    >
      <div className="max-w-5xl mx-auto px-4 py-10 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          
          {/* Brand & Store Timings */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src="/images/patisserie-22-logo.jpg" 
                alt={`${store.storeName} Logo`} 
                className="w-12 h-12 rounded-full object-cover shadow-soft-sm"
              />
              <div className="flex flex-col">
                <h2 className="font-serif text-2xl font-normal tracking-tight text-charcoal leading-none">
                  {store.storeName}
                </h2>
              </div>
            </Link>
            
            <div className="flex flex-col gap-1 mt-2">
              <div className="flex items-center gap-2 text-lavender-deep mb-1">
                <Clock className="w-4 h-4 text-lavender-700" />
                <span className="font-serif text-lg font-normal text-charcoal">Timings</span>
              </div>
              <p className="font-sans text-xs font-semibold text-charcoal tracking-tight">
                {store.openingHours}
              </p>
              <p className="font-sans text-xs text-charcoal-muted tracking-tight">
                {store.daysOpen}
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h3 className="font-serif text-xl font-normal text-charcoal mb-1">Explore</h3>
            <div className="flex flex-col gap-2 font-sans text-sm text-charcoal-muted">
              <Link to="/" className="hover:text-lavender-700 transition-colors w-fit">Home</Link>
              <Link to="/menu" className="hover:text-lavender-700 transition-colors w-fit">Menu</Link>
              <Link to="/gifting" className="hover:text-lavender-700 transition-colors w-fit">Gifting</Link>
              <Link to="/festive-occasions" className="hover:text-lavender-700 transition-colors w-fit">Festive Occasions</Link>
              <Link to="/#story" className="hover:text-lavender-700 transition-colors w-fit">Our Story</Link>
              <Link to="#contact" className="hover:text-lavender-700 transition-colors w-fit">Contact</Link>
            </div>
          </div>

          {/* Contact & Social */}
          <div className="flex flex-col gap-3">
            <h3 className="font-serif text-xl font-normal text-charcoal mb-1">Connect</h3>
            <div className="flex flex-col gap-2 font-sans text-sm text-charcoal-muted">
              <a href={`tel:${store.phone.replace(/\s+/g, '')}`} className="flex items-center gap-2 hover:text-lavender-700 transition-colors w-fit">
                <Phone className="w-4 h-4 text-lavender-600 shrink-0" />
                <span>{store.phone}</span>
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-emerald-700 transition-colors w-fit">
                <svg className="w-4 h-4 fill-current text-emerald-600 shrink-0" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>WhatsApp</span>
              </a>
              <div className="flex gap-4 mt-2">
                <a href={store.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800 transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="flex flex-col gap-3">
            <h3 className="font-serif text-xl font-normal text-charcoal mb-1">Our Location</h3>
            <div className="flex flex-col gap-2">
              <address className="not-italic font-sans text-sm text-charcoal-muted tracking-tight leading-relaxed">
                {store.address.line1}<br />
                {store.address.line2}<br />
                {store.address.city} – {store.address.postalCode}
              </address>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-lavender-800 hover:text-lavender-900 transition-colors mt-1"
              >
                <Navigation className="w-4 h-4 text-lavender-600" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: FSSAI & Legal */}
        <div className="mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          
          <div className="flex items-center gap-2">
            <span className="font-sans font-extrabold text-xs tracking-wider text-[#1a5b8c] uppercase">fssai</span>
            <span className="text-purple-300">/</span>
            <span className="font-sans text-xs text-charcoal-muted tracking-tight">{store.fssaiLicNo}</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-charcoal-muted tracking-tight relative z-10">
            <Link to="/terms" className="hover:text-lavender-700 transition-colors py-2 px-1">Terms & Conditions</Link>
            <span className="text-lavender-300 hidden sm:inline">|</span>
            <Link to="/privacy" className="hover:text-lavender-700 transition-colors py-2 px-1">Privacy Policy</Link>
          </div>

          <div className="text-xs text-charcoal-muted tracking-tight">
            © {new Date().getFullYear()} {store.storeName}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
