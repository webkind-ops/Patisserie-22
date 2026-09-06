import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { useMenu } from '@/hooks/useMenu';
import { Link, useNavigate } from 'react-router-dom';
import { NoiseBackground } from '@/components/ui/noise-background';
import { StrokeText } from '@/components/ui/StrokeText';
import Carousel from '@/components/ui/Carousel';
import DepthCarousel from '@/components/ui/DepthCarousel';
import { ImageGallery } from '@/components/ui/carousel-circular-image-gallery';
import { useCart } from '@/context/CartContext';
import { useSEO } from '@/hooks/useSEO';
import { ScrollExpand } from '@/components/ui/ScrollExpand';

export const HomePage: React.FC = () => {
  useSEO({
    title: 'Home',
    description: 'Welcome to Patisserie\'22, a 100% eggless artisanal bakery offering premium cakes, viennoiserie, and gifting hampers.',
  });

  const { featuredItems, allItems } = useMenu();
  const { addToCart, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  const bestSellers = featuredItems.length > 0 ? featuredItems.slice(0, 10) : allItems.slice(0, 10);

  const handleOrderNow = (item: any, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    addToCart(item, 1);
    setIsCartOpen(true);
    navigate('/menu');
  };

  const TEST_SCROLL_EXPAND = false; // Set to false to revert back to DepthCarousel

  return (
    <Layout>
      {/* AMBIANCE PHOTOS PLACEHOLDER */}
      <section className="w-full mb-16 px-4 pt-10">
        <div className="mb-6 flex flex-col items-center text-center">
          <StrokeText
            as="h1"
            text="Our Bakery"
            fontSize={90}
            strokeColor="#a78bfa"
            fillColor="#1a1a1a"
            strokeWidth={1.5}
            className="w-full max-w-[320px] mx-auto -mt-4 mb-2"
            style={{ fontFamily: '"Playfair Display", serif' }}
          />
          <p className="text-charcoal-muted mt-2 text-sm">Experience the ambience</p>
        </div>
        
        {TEST_SCROLL_EXPAND ? (
          <div className="w-full relative">
            <ScrollExpand
              src="/images/bakery/image1.jpg"
              title="Step Inside"
              scrollHint="Scroll down"
              useWindowScroll={true}
              mediaZoom={1.4}
              startWidth={40}
              startHeight={50}
            >
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">A World of Baking</h2>
              <p className="text-white/90 text-sm md:text-base max-w-md mx-auto">
                Every detail in our bakery is designed to bring you joy, from the aroma of fresh bakes to our elegant interiors.
              </p>
            </ScrollExpand>
          </div>
        ) : (
          <div className="w-full max-w-4xl mx-auto h-[400px] md:h-[500px] relative overflow-hidden rounded-[2rem] bg-lavender-50/50">
            <DepthCarousel
              items={[
                { image: '/images/bakery/image1.jpg', alt: 'Bakery Ambiance 1' },
                { image: '/images/bakery/image2.jpg', alt: 'Bakery Ambiance 2' },
                { image: '/images/bakery/image3.jpg', alt: 'Bakery Ambiance 3' },
                { image: '/images/bakery/image4.jpg', alt: 'Bakery Ambiance 4' },
                { image: '/images/bakery/image5.jpg', alt: 'Bakery Ambiance 5' },
                { image: '/images/bakery/image6.jpg', alt: 'Bakery Ambiance 6' }
              ]}
              depth={220}
              spread={90}
              tilt={22}
              tiltDirection="right"
              perspective={1400}
              visibleCards={4}
              falloff={0.2}
              blur={6}
              autoplay
              loop
              tint="rgba(167, 139, 250, 0.15)"
            />
          </div>
        )}
      </section>

      {/* BEST SELLERS SECTION */}
      <section className="w-full mb-16 px-4" id="best-sellers">
        <div className="mb-6 flex flex-col items-center text-center">
          <StrokeText
            as="h2"
            text="Best Sellers"
            fontSize={90}
            strokeColor="#a78bfa"
            fillColor="#1a1a1a"
            strokeWidth={1.5}
            className="w-full max-w-[320px] mx-auto -mt-4 mb-2"
            style={{ fontFamily: '"Playfair Display", serif' }}
          />
          <p className="text-charcoal-muted mt-2 text-sm">Our most loved signature creations</p>
        </div>
        
        <div className="w-full mx-auto mb-8 px-2 md:px-0 flex justify-center">
          <ImageGallery 
            images={bestSellers.slice(0, 5).map(item => ({
              id: item.id,
              url: item.image?.startsWith('/') ? item.image : 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&w=800&q=80',
              title: item.name,
              description: item.description,
              originalItem: item
            }))}
            onOrderClick={(imageItem) => handleOrderNow(imageItem.originalItem)}
          />
        </div>
        
        <div className="mt-8 flex justify-center">
          <NoiseBackground containerClassName="w-fit p-1 rounded-full mx-auto">
            <Link to="/menu" className="block h-full w-full cursor-pointer rounded-full bg-white px-8 py-3.5 text-sm font-bold text-charcoal shadow-soft-sm hover:bg-lavender-50 transition-colors">
              View Complete Menu
            </Link>
          </NoiseBackground>
        </div>
      </section>

      {/* GIFTING / HAMPERS SECTION */}
      <div className="w-full mb-16 px-4">
        <section className="w-full py-12 px-4 bg-lavender-50 rounded-3xl border border-lavender-100 flex flex-col items-center text-center overflow-hidden" id="gifting">
          <StrokeText
            as="h2"
            text="Premium Gifting"
            fontSize={80}
            strokeColor="#a78bfa"
            fillColor="#1a1a1a"
            strokeWidth={1.5}
            className="w-full max-w-[420px] mx-auto -mt-4 mb-3"
            style={{ fontFamily: '"Playfair Display", serif' }}
          />
          <p className="text-charcoal-muted max-w-2xl mx-auto mb-8 text-sm md:text-base">
            Gift boxes and hampers for every occasion — birthdays, celebrations, and just-because moments.
            Packed with love and our freshest bakes.
          </p>
          <div className="w-full mb-8">
            <Carousel
              items={[
                { id: 'h1', title: 'Lavender Bliss Box', description: 'Assorted cookies, almond cake, and a scented candle.', image: '/images/hampers/hamper1.jpg', actionText: 'Enquire Now', onAction: () => window.open('https://wa.me/917011352004', '_blank') },
                { id: 'h2', title: 'Signature Collection', description: 'Lavender shortbread, meringue drops, and classic spread.', image: '/images/hampers/hamper2.jpg', actionText: 'Enquire Now', onAction: () => window.open('https://wa.me/917011352004', '_blank') },
                { id: 'h3', title: 'Bakery Pantry Basket', description: 'Fresh bread, artisan jam, biscuits, and chocolates.', image: '/images/hampers/hamper3.jpg', actionText: 'Enquire Now', onAction: () => window.open('https://wa.me/917011352004', '_blank') },
                { id: 'h4', title: 'Daily Crumb Hamper', description: 'House blend granola, croissants, shortbread, and jam.', image: '/images/hampers/hamper4.jpg', actionText: 'Enquire Now', onAction: () => window.open('https://wa.me/917011352004', '_blank') },
                { id: 'h5', title: 'Chocolate Lovers Box', description: 'Butter cookies, hazelnut spread, brownies, and chocolate loaf cake.', image: '/images/hampers/hamper5.jpg', actionText: 'Enquire Now', onAction: () => window.open('https://wa.me/917011352004', '_blank') },
                { id: 'h6', title: 'Patisserie 22 Classic', description: 'Lavender shortbread, meringue kisses, almond cake, and classic spread.', image: '/images/hampers/hamper6.jpg', actionText: 'Enquire Now', onAction: () => window.open('https://wa.me/917011352004', '_blank') },
                { id: 'h7', title: 'Artisan Cookie Basket', description: 'Choco chip cookies, fudgy brownies, butter cookies, and biscotti.', image: '/images/hampers/hamper7.jpg', actionText: 'Enquire Now', onAction: () => window.open('https://wa.me/917011352004', '_blank') },
                { id: 'h8', title: 'Lavender Gift Set', description: 'Butter cookies, almond cake, brownies, chocolate spread, and lavender candle.', image: '/images/hampers/hamper8.jpg', actionText: 'Enquire Now', onAction: () => window.open('https://wa.me/917011352004', '_blank') },
                { id: 'h9', title: 'Bakery Wicker Hamper', description: 'Sourdough loaf, artisan jam, Belgian chocolates, biscotti, and lemon drizzle cake.', image: '/images/hampers/hamper9.jpg', actionText: 'Enquire Now', onAction: () => window.open('https://wa.me/917011352004', '_blank') },
                { id: 'h10', title: "Baker's Favourites", description: 'House blend granola, croissants, shortbread, raspberry jam, and clover honey.', image: '/images/hampers/hamper10.jpg', actionText: 'Enquire Now', onAction: () => window.open('https://wa.me/917011352004', '_blank') },
              ]}
              autoplay={true}
              autoplayDelay={3500}
              pauseOnHover={true}
              loop={true}
              round={false}
            />
          </div>
          <Link to="/gifting" className="mt-2 text-lavender-700 font-medium hover:text-lavender-900 transition-colors underline underline-offset-4">
            View All Gifting Options
          </Link>
        </section>
      </div>

      {/* OUR STORY SECTION */}
      <section className="w-full mb-16 py-12 px-4 flex flex-col items-center text-center" id="story">
        <StrokeText
          as="h2"
          text="Our Story"
          fontSize={90}
          strokeColor="#a78bfa"
          fillColor="#1a1a1a"
          strokeWidth={1.5}
          className="w-full max-w-[320px] mx-auto -mt-4 mb-6"
          style={{ fontFamily: '"Playfair Display", serif' }}
        />
        <div className="max-w-3xl mx-auto space-y-4 text-charcoal-muted text-sm md:text-base leading-relaxed">
          <p>
            Welcome to Patisserie'22, where every creation is a celebration of flavor and craftsmanship. 
            Born from a passion for authentic baking, we set out on a journey to redefine the sweet experience.
          </p>
          <p>
            As a 100% eggless bakery, our philosophy is simple: good quality, real ingredients, and
            a whole lot of love. From our humble beginnings to our growing range of artisanal breads, cakes,
            and premium gifting hampers, our commitment to what we do remains the same.
          </p>
          <p>
            Join us in savoring life's sweetest moments, one bite at a time.
          </p>
        </div>
      </section>

    </Layout>
  );
};

export default HomePage;
