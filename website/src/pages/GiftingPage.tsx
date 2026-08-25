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
          {[
            { id: 1, title: 'Lavender Bliss Box', desc: 'Assorted cookies, almond cake, and a scented candle.', price: '₹1,500', img: '/images/hampers/hamper1.jpg' },
            { id: 2, title: 'Signature Collection', desc: 'Lavender shortbread, meringue kisses, and classic spread.', price: '₹1,800', img: '/images/hampers/hamper2.jpg' },
            { id: 3, title: 'Bakery Pantry Basket', desc: 'Fresh bread, artisan jam, biscuits, and chocolates.', price: '₹2,000', img: '/images/hampers/hamper3.jpg' },
            { id: 4, title: 'Daily Crumb Hamper', desc: 'Granola, croissants, shortbread, and jam.', price: '₹1,600', img: '/images/hampers/hamper4.jpg' },
            { id: 5, title: 'Chocolate Lovers Box', desc: 'Butter cookies, hazelnut spread, brownies, and chocolate loaf cake.', price: '₹1,700', img: '/images/hampers/hamper5.jpg' },
            { id: 6, title: 'Patisserie 22 Classic', desc: 'Shortbread, meringue kisses, almond cake, and classic spread.', price: '₹2,200', img: '/images/hampers/hamper6.jpg' },
            { id: 7, title: 'Artisan Cookie Basket', desc: 'Choco chip cookies, fudgy brownies, butter cookies, and biscotti.', price: '₹1,400', img: '/images/hampers/hamper7.jpg' },
            { id: 8, title: 'Lavender Gift Set', desc: 'Butter cookies, almond cake, brownies, chocolate spread, and lavender candle.', price: '₹2,500', img: '/images/hampers/hamper8.jpg' },
            { id: 9, title: 'Bakery Wicker Hamper', desc: 'Sourdough loaf, artisan jam, Belgian chocolates, biscotti, and lemon drizzle cake.', price: '₹2,800', img: '/images/hampers/hamper9.jpg' },
            { id: 10, title: "Baker's Favourites", desc: 'House blend granola, croissants, shortbread, raspberry jam, and clover honey.', price: '₹1,900', img: '/images/hampers/hamper10.jpg' },
          ].map((h) => (
            <div key={h.id} className="bg-white rounded-2xl overflow-hidden shadow-soft-sm border border-lavender-50 flex flex-col">
              <div className="w-full aspect-square overflow-hidden">
                <img src={h.img} alt={h.title} className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105" />
              </div>
              <div className="p-4 flex flex-col items-center text-center flex-1">
                <h3 className="font-serif text-xl text-charcoal mb-1">{h.title}</h3>
                <p className="text-xs text-charcoal-muted mb-2 leading-relaxed">{h.desc}</p>
                <p className="text-sm font-semibold text-charcoal mb-4">Starts at {h.price}</p>
                <a
                  href={`https://wa.me/917011352004?text=I'm interested in the ${h.title} hamper`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto w-full py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors"
                >
                  Enquire via WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default GiftingPage;
