import { Suspense } from 'react';
import SearchContent from './SearchContent';

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchContent />
    </Suspense>
  );
}

function SearchLoading() {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-[1400px]">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-charcoal mb-2">
            Search
          </h1>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    </main>
  );
}
