import Link from 'next/link';
import ProductGrid from '@/components/ProductGrid';
import CategoryFilter from '@/components/CategoryFilter';
import SearchBar from '@/components/SearchBar';
import SortSelect from '@/components/SortSelect';

interface HomeProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
    sort?: string;
  }>;
}

export default async function HomePage({ searchParams }: HomeProps) {
  const resolvedSearchParams = await searchParams;

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to ShopNext
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Discover amazing products at great prices
          </p>
          <Link
            href="#products"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-block"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <SearchBar defaultValue={resolvedSearchParams.search} />
          </div>
          <div className="flex gap-3">
            <SortSelect defaultValue={resolvedSearchParams.sort} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 flex-shrink-0">
            <CategoryFilter activeCategory={resolvedSearchParams.category} />
          </aside>
          <div className="flex-1">
            <ProductGrid
              category={resolvedSearchParams.category}
              search={resolvedSearchParams.search}
              sort={resolvedSearchParams.sort}
            />
          </div>
        </div>
      </section>
    </div>
  );
}