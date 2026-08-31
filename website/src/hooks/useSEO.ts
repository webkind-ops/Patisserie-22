import { useEffect } from 'react';
import { appConfig } from '@/constants/appConfig';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  image?: string;
}

export const useSEO = ({ title, description, canonicalUrl, image }: SEOProps = {}) => {
  useEffect(() => {
    const defaultTitle = `${appConfig.store.storeName} | ${appConfig.store.tagline}`;
    const pageTitle = title ? `${title} | ${appConfig.store.storeName}` : defaultTitle;
    document.title = pageTitle;

    const defaultDescription = `Welcome to ${appConfig.store.storeName}. ${appConfig.store.tagline}. Order fresh cakes, pastries, and artisanal breads.`;
    const finalDescription = description || defaultDescription;
    const finalImage = image || `${appConfig.baseUrl}/images/patisserie-22-logo.jpg`;
    
    // Using pathname for canonical building
    const currentPath = window.location.pathname;
    const finalCanonical = canonicalUrl || (currentPath === '/' ? appConfig.baseUrl : `${appConfig.baseUrl}${currentPath}`);

    const updateMetaTag = (selector: string, attribute: string, value: string, createAttr: 'name' | 'property' = 'name') => {
      let tag = document.querySelector(`meta[${createAttr}="${selector}"]`);
      if (tag) {
        tag.setAttribute(attribute, value);
      } else {
        tag = document.createElement('meta');
        tag.setAttribute(createAttr, selector);
        tag.setAttribute(attribute, value);
        document.head.appendChild(tag);
      }
    };

    updateMetaTag('description', 'content', finalDescription);
    updateMetaTag('og:title', 'content', pageTitle, 'property');
    updateMetaTag('og:description', 'content', finalDescription, 'property');
    updateMetaTag('og:url', 'content', finalCanonical, 'property');
    updateMetaTag('og:image', 'content', finalImage, 'property');
    updateMetaTag('og:type', 'content', 'website', 'property');
    updateMetaTag('og:site_name', 'content', appConfig.store.storeName, 'property');
    updateMetaTag('twitter:card', 'content', 'summary_large_image');
    updateMetaTag('twitter:title', 'content', pageTitle);
    updateMetaTag('twitter:description', 'content', finalDescription);
    updateMetaTag('twitter:image', 'content', finalImage);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', finalCanonical);
    } else {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', finalCanonical);
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
        "image": `${appConfig.baseUrl}/images/patisserie-22-logo.jpg`,
        "@id": appConfig.baseUrl,
        "url": appConfig.baseUrl,
        "telephone": appConfig.store.phone,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": `${appConfig.store.address.line1}, ${appConfig.store.address.line2}`,
          "addressLocality": appConfig.store.address.city,
          "postalCode": appConfig.store.address.postalCode,
          "addressCountry": appConfig.store.address.country
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "28.5355", // Placeholder: Client should provide actual coordinates
          "longitude": "77.1558"
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
        },
        "sameAs": [
          appConfig.store.instagram
        ]
      };
      schemaScript.textContent = JSON.stringify(schemaData);
      document.head.appendChild(schemaScript);
    }
  }, [title, description, canonicalUrl, image]);
};
