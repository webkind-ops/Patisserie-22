import React from 'react';
import { useMenu } from '@/hooks/useMenu';
import { Layout } from '@/components/layout/Layout';
import { SearchBar } from '@/components/common/SearchBar';
import { CategoryTabs } from '@/components/menu/CategoryTabs';
import { FeaturedSection } from '@/components/menu/FeaturedSection';
import { ProductGrid } from '@/components/menu/ProductGrid';
import { SectionTitle } from '@/components/common/SectionTitle';
import { MENU_CATEGORIES } from '@/constants/categories';
import { useSEO } from '@/hooks/useSEO';

export const MenuPage: React.FC = () => {
  useSEO({
    title: 'Menu',
    description: 'Explore our complete menu of eggless artisanal cakes, pastries, breads, and viennoiserie.',
  });

  const {
    filteredItems,
    featuredItems,
    categoryCounts,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    dietaryFilter,
    resetFilters,
  } = useMenu();

  const currentCategoryInfo = MENU_CATEGORIES.find(
    (cat) => cat.id === selectedCategory
  );

  const isShowingFeatured =
    !searchQuery && selectedCategory === 'all' && dietaryFilter === 'all';

  return (
    <Layout
      headerSlot={
        <div className="flex flex-col gap-2.5">
          <div className="w-full flex items-center justify-center pt-1 pb-2">
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase shadow-soft-xs">
              100% Eggless Bakery
            </span>
          </div>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search cakes, pastries, cupcakes..."
          />
        </div>
      }
    >
      {/* Category Scrollable Bar */}
      <CategoryTabs
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categoryCounts={categoryCounts}
        className="mb-6 mt-1 sm:mt-1"
      />

      {/* Featured Signatures (Visible on initial load / All tab) */}
      {isShowingFeatured && (
        <FeaturedSection items={featuredItems} />
      )}

      {/* Product Grid Section */}
      <section aria-label="Menu Items List" className="w-full">
        <SectionTitle
          title={
            searchQuery
              ? `Search Results for "${searchQuery}"`
              : currentCategoryInfo?.label || 'Our Creations'
          }
          subtitle={
            searchQuery
              ? `Found ${filteredItems.length} matching item${filteredItems.length === 1 ? '' : 's'}`
              : `Browse freshly handcrafted selections`
          }
          count={filteredItems.length}
        />

        <ProductGrid
          items={filteredItems}
          onResetFilters={resetFilters}
        />
      </section>
    </Layout>
  );
};

export default MenuPage;
