import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { useSEO } from '@/hooks/useSEO';

export const FestiveOccasionsPage: React.FC = () => {
  useSEO({
    title: 'Festive Occasions',
    description: 'Celebrate special moments with our handcrafted festive collections, cakes, and treats.',
  });

  const occasions = [
    {
      id: 'diwali',
      title: 'Diwali Special',
      description: 'Illuminate your celebrations with our exclusive Diwali dessert boxes and dry cake assortments.',
      season: 'October / November',
      image: '/images/festive/diwali-hamper.jpg',
    },
    {
      id: 'christmas',
      title: 'Christmas Joys',
      description: 'Plum cakes, gingerbread cookies, and festive hampers to spread the holiday cheer.',
      season: 'December',
      image: '/images/festive/christmas-hamper.jpg',
    },
    {
      id: 'valentines',
      title: "Valentine's Day",
      description: 'Romantic berry entremets, heart-shaped macarons, and chocolate dipped strawberries.',
      season: 'February',
      image: '/images/festive/valentines-hamper.jpg',
    }
  ];

  return (
    <Layout>
      <section className="w-full py-12 flex flex-col items-center text-center px-4">
        <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">
          Festive Occasions
        </h1>
        <p className="font-sans text-base text-charcoal-muted max-w-2xl mx-auto mb-12">
          Make every celebration memorable. We curate special seasonal menus and hampers 
          designed perfectly for the festive spirit.
        </p>

        <div className="flex flex-col gap-12 w-full max-w-4xl mx-auto">
          {occasions.map((occasion) => (
            <div key={occasion.id} className="flex flex-col md:flex-row gap-6 items-center text-left bg-white rounded-3xl p-6 shadow-soft-sm border border-lavender-50">
              <div className="w-full md:w-1/2 aspect-video bg-lavender-100 rounded-2xl overflow-hidden flex items-center justify-center text-lavender-300">
                {occasion.image ? (
                  <img
                    src={occasion.image}
                    alt={occasion.title}
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <span className="text-sm font-medium">{occasion.title} Banner</span>
                )}
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <span className="text-xs font-semibold tracking-wider uppercase text-lavender-700 mb-2">{occasion.season}</span>
                <h3 className="font-serif text-2xl text-charcoal mb-3">{occasion.title}</h3>
                <p className="text-sm text-charcoal-muted mb-6 leading-relaxed">
                  {occasion.description}
                </p>
                <a 
                  href={`https://wa.me/917011352004?text=I'd like to know more about the ${occasion.title} offerings`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-charcoal text-white text-sm font-semibold hover:bg-black transition-colors w-fit"
                >
                  Pre-order / Enquire
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default FestiveOccasionsPage;
