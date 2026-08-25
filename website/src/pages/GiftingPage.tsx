import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { useSEO } from '@/hooks/useSEO';

export const GiftingPage: React.FC = () => {
  useSEO({
    title: 'Gifting & Hampers',
    description: 'Bespoke corporate gifting and luxury bakery hampers by Patisserie\'22.',
  });

  return (
    <Layout>
      <section className="w-full py-12 flex flex-col items-center text-center px-4">
        <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">
          Premium Gifting
        </h1>
        <p className="font-sans text-base text-charcoal-muted max-w-2xl mx-auto mb-10">
          Curated hampers and exclusive gift collections for every special occasion. 
          Celebrate with our finest artisanal creations elegantly packaged for your loved ones.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {/* Placeholder Hampers */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-4 shadow-soft-sm border border-lavender-50 flex flex-col items-center text-center">
              <div className="w-full aspect-square bg-lavender-100 rounded-xl mb-4 flex items-center justify-center text-lavender-300">
                <span className="text-sm font-medium">Hamper Image {i}</span>
              </div>
              <h3 className="font-serif text-xl text-charcoal mb-1">Signature Collection {i}</h3>
              <p className="text-xs text-charcoal-muted mb-2">A luxurious assortment of our best creations.</p>
              <p className="text-sm font-semibold text-charcoal mb-4">Starts at ₹1,500</p>
              <a 
                href={`https://wa.me/917011352004?text=I'm interested in the Signature Collection ${i}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors"
              >
                Enquire via WhatsApp
              </a>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default GiftingPage;
