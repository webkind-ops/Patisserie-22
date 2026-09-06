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
import { Star } from 'lucide-react';

const REVIEWS = [
  {
    name: "Varun Garg",
    time: "2 months ago",
    text: "Had an amazing experience at Patisserie'22! We ordered a Fruit Cake and a Biscoff Cake, and what impressed us the most was that both were freshly prepared in around 30 minutes. The cakes were incredibly fresh, delicious, and beautifully made.",
    stars: 5,
  },
  {
    name: "mumtaz aafridi",
    time: "4 months ago",
    text: "I recently ordered a cake from Patisserie 22 for my nephew, and it was absolutely perfect! The cake was incredibly fresh, tasted amazing, and the detailing was done so beautifully—it looked just as good as it tasted.",
    stars: 5,
  },
  {
    name: "Ishita Gaur",
    time: "3 months ago",
    text: "I have ordered few cake from patisserie’22 and I must say it was absolutely delightful! It truly feels like you bake with your heart, not just hands. Thank you for making every celebration sweeter.",
    stars: 5,
  },
  {
    name: "Muskan Bharti",
    time: "a year ago",
    text: "Found this pastry shop behind cafe wink. The quality of food is truly Amazing. We tried cupcakes and brownies ,and all were delicious. Belgian brownie is must try dish. Service was good, you'll find premium quality of dessert at budget friendly price.",
    stars: 5,
  },
  {
    name: "Neeraj Sharma",
    time: "2 years ago",
    text: "Absolutely divine experience at Patisserie'22! From the first bite to the last, their cakes and pastries were simply exquisite. The service was outstanding, truly adding to the enjoyment of the visit.",
    stars: 5,
  },
  {
    name: "Aakriti Ssharmaa",
    time: "4 years ago",
    text: "It has been a wonderful experience ordering cake from this place.. The taste of the cake is amazing and always freshly baked.. Have order a lot of cakes and cookies from this one and have been never disappointed..",
    stars: 5,
  },
  {
    name: "Harshita Bansal",
    time: "3 months ago",
    text: "I’ve customized 3 cakes from here, and those were delicious and prettily decorated!! They do make your Pinterest cake come true. 🌷🫶🏻🫶🏻",
    stars: 5,
  },
  {
    name: "Himanshu Gupta",
    time: "8 months ago",
    text: "Delicious cakes and cupcakes. We tried christmas brownie and pastries. Both were amazing.",
    stars: 5,
  },
  {
    name: "shivangi bhatt",
    time: "4 years ago",
    text: "This is my second order and trust me Belgian chocolate is hands down the yummiest. No doubt his craft and efforts deserve so much more 💛 he came all the way to deliver cake... best taste and quality.",
    stars: 5,
  },
  {
    name: "Nidhi Jangid",
    time: "a year ago",
    text: "This cute little place here is worth giving a shot for its extremely melting desserts which are the perfect blend of sweet and soft and great coffee that makes you feel refreshed.",
    stars: 5,
  }
];

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
          <div className="w-full max-w-5xl mx-auto h-[550px] md:h-[750px] relative overflow-hidden rounded-[2rem] bg-lavender-50/50">
            <DepthCarousel
              items={[
                { image: '/images/bakery/image1.jpg', alt: 'Bakery Ambiance 1' },
                { image: '/images/bakery/image2.jpg', alt: 'Bakery Ambiance 2' },
                { image: '/images/bakery/image3.jpg', alt: 'Bakery Ambiance 3' },
                { image: '/images/bakery/image4.jpg', alt: 'Bakery Ambiance 4' },
                { image: '/images/bakery/image5.jpg', alt: 'Bakery Ambiance 5' },
                { image: '/images/bakery/image6.jpg', alt: 'Bakery Ambiance 6' }
              ]}
              cardWidth={340}
              cardHeight={600}
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

      {/* OUR STORY & REVIEWS SECTION */}
      <section className="w-full mb-20 py-16 px-4 relative" id="story">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <StrokeText
            as="h2"
            text="Our Story"
            fontSize={90}
            strokeColor="#a78bfa"
            fillColor="#1a1a1a"
            strokeWidth={1.5}
            className="w-full max-w-[320px] mx-auto -mt-4 mb-8"
            style={{ fontFamily: '"Playfair Display", serif' }}
          />
          <div className="max-w-3xl mx-auto space-y-6 text-charcoal-muted text-base md:text-lg leading-relaxed mb-20">
            <p>
              Welcome to Patisserie'22, where every creation is a celebration of flavor and craftsmanship. 
              Born from a passion for authentic baking, we set out on a journey to redefine the sweet experience.
            </p>
            <p>
              As a 100% eggless bakery, our philosophy is simple: good quality, real ingredients, and
              a whole lot of love. From our humble beginnings to our growing range of artisanal breads, cakes,
              and premium gifting hampers, our commitment to what we do remains the same.
            </p>
            <p className="font-serif italic text-xl text-lavender-700 pt-4">
              Join us in savoring life's sweetest moments, one bite at a time.
            </p>
          </div>

          <div className="w-full">
            <h3 className="text-3xl md:text-4xl font-serif text-charcoal mb-4">What People Say About Us</h3>
            <div className="w-16 h-1 bg-lavender-300 mx-auto mb-12 rounded-full"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              {/* Left Column (First 5 reviews) */}
              <div className="flex flex-col gap-6">
                {REVIEWS.slice(0, 5).map((review, i) => (
                  <div key={`left-${i}`} className="bg-white/60 backdrop-blur-sm p-6 rounded-3xl border border-lavender-100 shadow-[0_4px_20px_-10px_rgba(139,92,246,0.1)] hover:shadow-[0_4px_25px_-5px_rgba(139,92,246,0.15)] transition-all">
                    <div className="flex items-center gap-1 mb-3 text-yellow-400">
                      {[...Array(review.stars)].map((_, s) => (
                        <Star key={s} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-charcoal-muted text-sm md:text-base leading-relaxed mb-4 italic">
                      "{review.text}"
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-lavender-50">
                      <span className="font-sans font-semibold text-charcoal text-sm">{review.name}</span>
                      <span className="text-xs text-lavender-400">{review.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Right Column (Next 5 reviews) */}
              <div className="flex flex-col gap-6 md:mt-12">
                {REVIEWS.slice(5, 10).map((review, i) => (
                  <div key={`right-${i}`} className="bg-white/60 backdrop-blur-sm p-6 rounded-3xl border border-lavender-100 shadow-[0_4px_20px_-10px_rgba(139,92,246,0.1)] hover:shadow-[0_4px_25px_-5px_rgba(139,92,246,0.15)] transition-all">
                    <div className="flex items-center gap-1 mb-3 text-yellow-400">
                      {[...Array(review.stars)].map((_, s) => (
                        <Star key={s} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-charcoal-muted text-sm md:text-base leading-relaxed mb-4 italic">
                      "{review.text}"
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-lavender-50">
                      <span className="font-sans font-semibold text-charcoal text-sm">{review.name}</span>
                      <span className="text-xs text-lavender-400">{review.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default HomePage;
