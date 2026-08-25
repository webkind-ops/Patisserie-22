import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { appConfig } from '@/constants/appConfig';
import { useSEO } from '@/hooks/useSEO';

export const PrivacyPage: React.FC = () => {
  useSEO({ title: 'Privacy Policy', description: 'Privacy Policy for Patisserie\'22.' });
  const { store } = appConfig;

  return (
    <Layout>
      <div className="w-full max-w-4xl mx-auto px-4 py-16 sm:px-6 md:py-24">
        <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">Privacy Policy</h1>
        <p className="text-sm text-charcoal-muted mb-12">Last Updated: {new Date().toLocaleDateString()}</p>
        
        <div className="prose prose-lavender prose-sm sm:prose-base max-w-none text-charcoal-muted space-y-8">
          <section>
            <h2 className="font-serif text-2xl text-charcoal mb-3">1. Information We Collect</h2>
            <p>
              At {store.storeName}, we are committed to protecting your privacy. We collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Place an order through our website, WhatsApp, or in-store.</li>
              <li>Contact us for inquiries or customer support.</li>
              <li>Subscribe to our newsletters or marketing communications.</li>
            </ul>
            <p className="mt-2">
              The personal information we collect may include your name, phone number, delivery address, billing information, and specific dietary requirements.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-charcoal mb-3">2. How We Use Your Information</h2>
            <p>
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>To process, fulfill, and manage your orders and deliveries.</li>
              <li>To communicate with you regarding your order status (primarily via WhatsApp or phone).</li>
              <li>To respond to your queries, requests, or complaints.</li>
              <li>To improve our products, services, and website functionality.</li>
              <li>To send you promotional offers and updates, provided you have opted in to receive them.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-charcoal mb-3">3. Sharing of Information</h2>
            <p>
              We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information with our business partners and advertisers.
            </p>
            <p className="mt-2">
              We may share your information with trusted third-party service providers solely for the purpose of operating our business, such as:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Delivery Partners:</strong> (e.g., local couriers, ride-hailing services) to fulfill your delivery requests.</li>
              <li><strong>Payment Processors:</strong> to securely process your transactions.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-charcoal mb-3">4. Data Security</h2>
            <p>
              We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information and transaction data stored on our systems. 
              However, please note that no method of transmission over the internet or method of electronic storage is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-charcoal mb-3">5. Cookies and Tracking Technologies</h2>
            <p>
              Our website may use "cookies" to enhance user experience. Your web browser places cookies on your hard drive for record-keeping purposes and sometimes to track information about them. 
              You may choose to set your web browser to refuse cookies, or to alert you when cookies are being sent. If you do so, note that some parts of the website may not function properly.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-charcoal mb-3">6. Your Rights</h2>
            <p>
              You have the right to request access to the personal information we hold about you, request corrections, or request deletion of your data. 
              If you wish to opt-out of our marketing communications, you can do so at any time by contacting us directly.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-charcoal mb-3">7. Changes to this Privacy Policy</h2>
            <p>
              {store.storeName} has the discretion to update this privacy policy at any time. We encourage users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-charcoal mb-3">8. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at:<br/>
              <strong>Phone/WhatsApp:</strong> {store.phone}<br/>
              <strong>Address:</strong> {store.address.line1}, {store.address.line2}, {store.address.city} - {store.address.postalCode}
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPage;
