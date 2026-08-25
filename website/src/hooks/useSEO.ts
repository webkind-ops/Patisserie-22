import { useEffect } from 'react';
import { appConfig } from '@/constants/appConfig';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
}

export const useSEO = ({ title, description, canonicalUrl }: SEOProps = {}) => {
  useEffect(() => {
    // Title
    const defaultTitle = `${appConfig.store.storeName} | ${appConfig.store.tagline}`;
    const pageTitle = title ? `${title} | ${appConfig.store.storeName}` : defaultTitle;
    document.title = pageTitle;

    // Description
    const defaultDescription = `Welcome to ${appConfig.store.storeName}. ${appConfig.store.tagline}. Order fresh cakes, pastries, and artisanal breads.`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description || defaultDescription);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description || defaultDescription;
      document.head.appendChild(meta);
    }

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    const href = canonicalUrl || window.location.href;
    if (canonical) {
      canonical.setAttribute('href', href);
    } else {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', href);
      document.head.appendChild(canonical);
    }

    // Structured Data (LocalBusiness)
    let schemaScript = document.querySelector('#local-business-schema');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'local-business-schema';
      schemaScript.setAttribute('type', 'application/ld+json');
      const schemaData = {
        "@context": "https://schema.org",
        "@type": "Bakery",
        "name": appConfig.store.storeName,
        "image": "https://patisserie-22.vercel.app/images/patisserie-22-logo.jpg",
        "@id": "https://patisserie-22.vercel.app",
        "url": "https://patisserie-22.vercel.app",
        "telephone": appConfig.store.phone,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": `${appConfig.store.address.line1}, ${appConfig.store.address.line2}`,
          "addressLocality": appConfig.store.address.city,
          "postalCode": appConfig.store.address.postalCode,
          "addressCountry": appConfig.store.address.country
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          "opens": "11:00",
          "closes": "22:00"
        }
      };
      schemaScript.textContent = JSON.stringify(schemaData);
      document.head.appendChild(schemaScript);
    }

    return () => {
      // Optional cleanup if needed (usually leaving canonical/desc is fine in SPA)
    };
  }, [title, description, canonicalUrl]);
};
