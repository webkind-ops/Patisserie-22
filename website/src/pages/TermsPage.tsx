import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { appConfig } from '@/constants/appConfig';
import { useSEO } from '@/hooks/useSEO';

export const TermsPage: React.FC = () => {
  useSEO({ title: 'Terms & Conditions', description: "Terms and Conditions for Patisserie'22." });
  const { store } = appConfig;

  return (
    <Layout>
      <div className="w-full max-w-4xl mx-auto px-4 py-16 sm:px-6 md:py-24">
        <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">Terms & Conditions</h1>
        <p className="text-sm text-charcoal-muted mb-12">Last Updated: {new Date().toLocaleDateString()}</p>
        
        <div className="prose prose-lavender prose-sm sm:prose-base max-w-none text-charcoal-muted space-y-8">
          <section>
            <h2 className="font-serif text-2xl text-charcoal mb-3">1. General Conditions</h2>
            <p>
              Welcome to {store.storeName}. By accessing or using our website, ordering our products, or interacting with us, you agree to be bound by these Terms & Conditions. 
              If you do not agree to all the terms and conditions, you may not access the website or use our services.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-charcoal mb-3">2. Products, Modifications, and Pricing</h2>
            <p>
              All our products are subject to availability. We reserve the right to discontinue any product at any time. 
              Prices for our products are subject to change without notice. The images of our products on the website are for illustrative purposes only. 
              Since our products are handcrafted, the actual product may vary slightly in appearance and weight from the images.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-charcoal mb-3">3. Orders, Cancellations, and Refunds</h2>
            <p>
              <strong>Order Confirmation:</strong> Orders placed via WhatsApp or the website are considered confirmed only upon full advance payment unless agreed otherwise.
            </p>
            <p>
              <strong>Cancellations:</strong> As bakery products are perishable, we do not accept cancellations once the preparation process has started. 
              For custom cakes and large orders, cancellations must be made at least 48 hours in advance for a partial/full refund to be considered.
            </p>
            <p>
              <strong>Refunds:</strong> If a product is delivered in a damaged condition, the customer must notify us immediately with photographic evidence. 
              Refunds or replacements will be processed at the sole discretion of the management. Taste preferences do not qualify for a refund.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-charcoal mb-3">4. Dietary Information & Allergens</h2>
            <p>
              We are a proudly 100% eggless bakery. However, please be aware that our facility handles common allergens including, but not limited to, 
              <strong> dairy, nuts, gluten, soy, and seeds</strong>. 
              While we take extreme care to prevent cross-contamination, we cannot guarantee that any product is entirely free of trace allergens. 
              Customers with severe allergies must inform us prior to placing an order and consume products at their own risk.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-charcoal mb-3">5. Delivery and Pickup</h2>
            <p>
              Delivery timelines provided are estimates. We partner with third-party delivery services (e.g., local couriers, ride-hailing services) to dispatch orders. 
              While we ensure the items leave our bakery in perfect condition, we are not liable for delays, damages, or mishandling caused during transit by third-party delivery agents. 
              For delicate items like custom cakes, we strongly recommend self-pickup.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-charcoal mb-3">6. Intellectual Property</h2>
            <p>
              All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of {store.storeName} and is protected by copyright laws. 
              You may not reproduce, distribute, or use any content without our express written permission.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-charcoal mb-3">7. Contact Information</h2>
            <p>
              For any questions regarding these Terms & Conditions, please contact us at:<br/>
              <strong>Phone/WhatsApp:</strong> {store.phone}<br/>
              <strong>Address:</strong> {store.address.line1}, {store.address.line2}, {store.address.city} - {store.address.postalCode}
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default TermsPage;
