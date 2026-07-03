'use client';

import { useState, useMemo } from 'react';
import VehicleCard from '@/components/vehicles/VehicleCard';
import { Vehicle } from '@/lib/types';

type Filters = {
  make: string;
  bodyType: string;
  sellerType: string;
  maxMileage: number;
};

const defaultFilters: Filters = {
  make: '',
  bodyType: '',
  sellerType: '',
  maxMileage: 999999,
};

type SortKey = 'price-asc' | 'price-desc' | 'year-desc' | 'mileage-asc';

type Props = {
  vehicles: Vehicle[];
};

export default function VehiclesClient({ vehicles }: Props) {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [sort, setSort] = useState<SortKey>('price-asc');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const makes = useMemo(
    () => [...new Set(vehicles.map((v) => v.make))].sort(),
    [vehicles]
  );
  const bodyTypes = useMemo(
    () => [...new Set(vehicles.map((v) => v.bodyType))].sort(),
    [vehicles]
  );

  const filtered = useMemo(() => {
    let list = vehicles.filter((v) => {
      if (filters.make && v.make !== filters.make) return false;
      if (filters.bodyType && v.bodyType !== filters.bodyType) return false;
      if (filters.sellerType && v.sellerType !== filters.sellerType) return false;
      if (v.mileage > filters.maxMileage) return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'year-desc') return b.year - a.year;
      if (sort === 'mileage-asc') return a.mileage - b.mileage;
      return 0;
    });

    return list;
  }, [vehicles, filters, sort]);

  function updateFilter<K extends keyof Filters>(key: K, value: Filters[K]) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function resetFilters() {
    setFilters(defaultFilters);
  }

  const activeFilterCount = [
    filters.make,
    filters.bodyType,
    filters.sellerType,
  ].filter(Boolean).length;

  return (
    <>
      <div className="pt-28 pb-12 bg-psr-black border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-[11px] tracking-[0.4em] uppercase text-psr-gold mb-3 font-sans">
            PSR LONDON
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h1 className="font-serif text-5xl lg:text-6xl text-psr-cream font-light">
              The Collection
            </h1>
            <p className="font-sans text-sm text-psr-grey-light">
              {filtered.length} vehicle{filtered.length !== 1 ? 's' : ''} available
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
          <aside className="lg:w-60 flex-shrink-0">
            <div className="flex items-center justify-between mb-6 lg:mb-8">
              <p className="text-[11px] tracking-[0.3em] uppercase text-psr-grey-light font-sans">
                Filter
                {activeFilterCount > 0 && (
                  <span className="ml-2 text-psr-gold">({activeFilterCount})</span>
                )}
              </p>
              <div className="flex items-center gap-4">
                {activeFilterCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="text-[10px] tracking-[0.2em] uppercase text-psr-grey-light hover:text-psr-cream transition-colors font-sans"
                  >
                    Reset
                  </button>
                )}
                <button
                  onClick={() => setFiltersOpen(!filtersOpen)}
                  className="lg:hidden text-[10px] tracking-[0.2em] uppercase text-psr-grey-light font-sans"
                >
                  {filtersOpen ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div className={`space-y-8 ${filtersOpen ? 'block' : 'hidden lg:block'}`}>
              {makes.length > 0 && (
                <FilterSelect
                  label="Make"
                  value={filters.make}
                  options={makes}
                  onChange={(v) => updateFilter('make', v)}
                />
              )}
              {bodyTypes.length > 0 && (
                <FilterSelect
                  label="Body Type"
                  value={filters.bodyType}
                  options={bodyTypes}
                  onChange={(v) => updateFilter('bodyType', v)}
                />
              )}
              <FilterSelect
                label="Seller Type"
                value={filters.sellerType}
                options={['private', 'dealer']}
                labels={{ private: 'Private Seller', dealer: 'Approved Dealer' }}
                onChange={(v) => updateFilter('sellerType', v)}
              />

              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase text-psr-grey-mid font-sans mb-3">
                  Max Mileage
                </p>
                <div className="space-y-2">
                  {[10000, 25000, 50000, 999999].map((val) => (
                    <button
                      key={val}
                      onClick={() => updateFilter('maxMileage', val)}
                      className={`block w-full text-left text-sm font-sans py-1.5 transition-colors ${
                        filters.maxMileage === val
                          ? 'text-psr-gold'
                          : 'text-psr-grey-light hover:text-psr-cream'
                      }`}
                    >
                      {val === 999999 ? 'Any' : `Up to ${val.toLocaleString()} mi`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-end mb-8">
              <div className="flex items-center gap-3">
                <span className="text-[10px] tracking-[0.25em] uppercase text-psr-grey-mid font-sans">
                  Sort
                </span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="bg-transparent border-b border-white/10 text-sm text-psr-cream font-sans pb-1 pr-6 focus:outline-none focus:border-psr-gold appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath stroke='%238A8A8A' stroke-linecap='round' d='m1 1 4 4 4-4'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0 center',
                  }}
                >
                  <option value="price-asc" className="bg-psr-black">Price: Low to High</option>
                  <option value="price-desc" className="bg-psr-black">Price: High to Low</option>
                  <option value="year-desc" className="bg-psr-black">Newest First</option>
                  <option value="mileage-asc" className="bg-psr-black">Lowest Mileage</option>
                </select>
              </div>
            </div>

            {vehicles.length === 0 ? (
              <div className="py-24 text-center">
                <p className="font-serif text-3xl text-psr-grey-light font-light mb-3">
                  No vehicles listed yet
                </p>
                <p className="font-sans text-sm text-psr-grey-mid">
                  Check back soon — new listings are added regularly.
                </p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="py-24 text-center">
                <p className="font-serif text-3xl text-psr-grey-light font-light mb-3">
                  No vehicles found
                </p>
                <p className="font-sans text-sm text-psr-grey-mid mb-6">
                  Try adjusting your filters
                </p>
                <button
                  onClick={resetFilters}
                  className="text-[11px] tracking-[0.2em] uppercase text-psr-gold font-sans underline underline-offset-4"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((vehicle) => (
                  <VehicleCard key={String(vehicle.id)} vehicle={vehicle} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function FilterSelect({
  label,
  value,
  options,
  labels,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  labels?: Record<string, string>;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <p className="text-[10px] tracking-[0.25em] uppercase text-psr-grey-mid font-sans mb-3">
        {label}
      </p>
      <div className="space-y-2">
        <button
          onClick={() => onChange('')}
          className={`block w-full text-left text-sm font-sans py-1 transition-colors ${
            value === '' ? 'text-psr-gold' : 'text-psr-grey-light hover:text-psr-cream'
          }`}
        >
          All
        </button>
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`block w-full text-left text-sm font-sans py-1 transition-colors ${
              value === opt ? 'text-psr-gold' : 'text-psr-grey-light hover:text-psr-cream'
            }`}
          >
            {labels?.[opt] ?? opt}
          </button>
        ))}
      </div>
    </div>
  );
}
