import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/common/Button';
import { UtensilsCrossed } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';

export const NotFoundPage: React.FC = () => {
  useSEO({ title: 'Page Not Found' });
  return (
    <Layout hideFooter>
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6 my-10">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-lavender-soft text-lavender-primary mb-4">
          <UtensilsCrossed className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-charcoal mb-2 leading-none">
          Page Not Found
        </h1>
        <p className="font-sans max-w-sm text-xs sm:text-sm text-charcoal-muted tracking-tight mb-6">
          The menu section or page you are looking for does not exist or has been moved.
        </p>
        <div className="flex gap-4">
          <Link to="/">
            <Button variant="outline" size="default">
              Return Home
            </Button>
          </Link>
          <Link to="/menu">
            <Button variant="primary" size="default">
              View Menu
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};
