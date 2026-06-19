import Link from 'next/link';
import { notFound } from 'next/navigation';
import { vehicles } from '@/lib/mock-data';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return vehicles.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const vehicle = vehicles.find((v) => v.slug === slug);
  if (!vehicle) return {};
  return {
    title: `${vehicle.year} ${vehicle.make} ${vehicle.model} — PSR LONDON`,
    description: vehicle.description.slice(0, 155),
  };
}

export default async function VehicleDetailPage({ params }: Props) {
  const { slug } = await params;
  const vehicle = vehicles.find((v) => v.slug === slug);
  if (!vehicle) notFound();

  return (
    <>
      <div className="pt-24 lg:pt-28">
        <div
          className="w-full aspect-[16/7] lg:aspect-[21/8] relative"
          style={{ background: vehicle.gradient }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-psr-black via-psr-black/20 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
            <span className="font-serif text-[15vw] text-psr-cream/[0.04] tracking-[0.3em]">
              PSR
            </span>
          </div>
          <div className="absolute top-6 left-6">
            <span
              className={`text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 font-sans ${
                vehicle.sellerType === 'dealer'
                  ? 'bg-psr-gold text-psr-black'
                  : 'bg-white/10 text-psr-cream backdrop-blur-sm border border-white/10'
              }`}
            >
              {vehicle.sellerType === 'dealer' ? 'Approved Dealer' : 'Private Seller'}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14 lg:py-20">
        <div className="mb-8">
          <Link
            href="/vehicles"
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-psr-grey-light hover:text-psr-cream transition-colors font-sans"
          >
            <span className="block w-4 h-px bg-current" />
            Collection
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="lg:col-span-2 order-last lg:order-first">
            <p className="text-[11px] tracking-[0.3em] uppercase text-psr-grey-light font-sans mb-2">
              {vehicle.year} · {vehicle.bodyType} · {vehicle.location}
            </p>
            <h1 className="font-serif text-5xl lg:text-6xl text-psr-cream font-light leading-tight mb-2">
              {vehicle.make} {vehicle.model}
            </h1>
            <p className="font-sans text-psr-grey-light text-sm mb-8">{vehicle.variant}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-6 mb-12 pb-12 border-b border-white/5">
              {[
                { label: 'Mileage', value: `${vehicle.mileage.toLocaleString()} mi` },
                { label: 'Transmission', value: vehicle.transmission },
                { label: 'Fuel', value: vehicle.fuelType },
                { label: 'Power', value: vehicle.power },
                { label: 'Engine', value: vehicle.engineSize },
                { label: 'Colour', value: vehicle.color },
                { label: 'Drive', value: vehicle.specs['Drive'] ?? '—' },
                { label: 'Top Speed', value: vehicle.specs['Top Speed'] ?? '—' },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-psr-grey-mid font-sans mb-1">
                    {item.label}
                  </p>
                  <p className="text-sm text-psr-cream font-sans">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mb-12 pb-12 border-b border-white/5">
              <h2 className="font-serif text-2xl text-psr-cream font-light mb-5">
                About This Vehicle
              </h2>
              <p className="font-sans text-sm text-psr-grey-light leading-relaxed">
                {vehicle.description}
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-psr-cream font-light mb-5">
                Full Specification
              </h2>
              <div className="divide-y divide-white/5">
                {Object.entries(vehicle.specs).map(([key, val]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between py-3.5"
                  >
                    <span className="text-xs text-psr-grey-light font-sans">{key}</span>
                    <span className="text-xs text-psr-cream font-sans text-right">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 order-first lg:order-last">
            <div className="lg:sticky lg:top-28 space-y-6">
              <div className="border border-white/8 p-7">
                <p className="text-[10px] tracking-[0.3em] uppercase text-psr-grey-mid font-sans mb-2">
                  Asking Price
                </p>
                <p className="font-serif text-4xl text-psr-gold font-light mb-1">
                  £{vehicle.price.toLocaleString()}
                </p>
                <p className="text-[11px] text-psr-grey-light font-sans">
                  {vehicle.sellerType === 'dealer'
                    ? vehicle.sellerName
                    : 'Private Seller'}{' '}
                  · {vehicle.location}
                </p>

                <div className="mt-6 space-y-3">
                  <button className="w-full px-6 py-4 bg-psr-gold text-psr-black text-[11px] tracking-[0.25em] uppercase font-sans font-medium hover:bg-psr-gold-light transition-colors">
                    Enquire Now
                  </button>
                  <button className="w-full px-6 py-4 border border-white/15 text-psr-cream text-[11px] tracking-[0.25em] uppercase font-sans hover:border-white/30 transition-colors">
                    Save Vehicle
                  </button>
                </div>
              </div>

              <div className="border border-white/8 p-7">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-psr-gold/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-psr-gold text-xs font-sans">✓</span>
                  </div>
                  <div>
                    <p className="text-xs text-psr-cream font-sans">PSR Verified Listing</p>
                    <p className="text-[10px] text-psr-grey-light font-sans mt-0.5">
                      Reviewed by our team
                    </p>
                  </div>
                </div>
                <p className="text-xs text-psr-grey-light font-sans leading-relaxed">
                  This vehicle has been reviewed and approved by the PSR LONDON
                  team before being listed on our platform.
                </p>
              </div>

              <div className="border border-white/8 p-7">
                <p className="text-[10px] tracking-[0.25em] uppercase text-psr-grey-mid font-sans mb-4">
                  Reference
                </p>
                <p className="text-xs text-psr-grey-light font-sans mb-1">
                  Listing ID:{' '}
                  <span className="text-psr-cream">PSR-{vehicle.id.padStart(4, '0')}</span>
                </p>
                <p className="text-xs text-psr-grey-light font-sans">
                  Listed:{' '}
                  <span className="text-psr-cream">June 2025</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-serif text-3xl text-psr-cream font-light">
              More from the Collection
            </h2>
            <Link
              href="/vehicles"
              className="hidden lg:flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-psr-grey-light hover:text-psr-cream transition-colors font-sans"
            >
              View All
              <span className="block w-4 h-px bg-current" />
            </Link>
          </div>
          <p className="font-sans text-sm text-psr-grey-light">
            <Link href="/vehicles" className="text-psr-gold hover:underline underline-offset-4">
              Browse the full collection →
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
