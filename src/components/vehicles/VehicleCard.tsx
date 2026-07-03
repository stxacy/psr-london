import Link from 'next/link';
import { Vehicle } from '@/lib/types';

type Props = {
  vehicle: Vehicle;
};

export default function VehicleCard({ vehicle }: Props) {
  return (
    <Link
      href={`/vehicles/${vehicle.slug}`}
      className="group bg-psr-black block border border-white/5 hover:border-psr-gold/25 transition-colors duration-400"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#0d0d0d]">
        <div className="absolute inset-0 bg-psr-black/0 group-hover:bg-psr-black/15 transition-colors duration-500" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-serif text-7xl text-psr-cream/8 tracking-[0.3em] select-none">
            PSR
          </span>
        </div>
        <div className="absolute top-4 left-4">
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

      <div className="p-6">
        <p className="text-[10px] tracking-[0.25em] uppercase text-psr-grey-light font-sans mb-1.5">
          {vehicle.year} · {vehicle.bodyType}
        </p>
        <h3 className="font-serif text-2xl text-psr-cream font-light leading-snug">
          {vehicle.make} {vehicle.model}
        </h3>
        {vehicle.variant && (
          <p className="text-xs text-psr-grey-light font-sans mt-0.5 mb-4">
            {vehicle.variant}
          </p>
        )}

        <div className="flex items-center gap-3 text-[11px] text-psr-grey-light font-sans mb-5 mt-4">
          <span>{vehicle.mileage.toLocaleString()} mi</span>
          {vehicle.transmission && (
            <>
              <span className="w-1 h-1 rounded-full bg-psr-grey-mid flex-shrink-0" />
              <span>{vehicle.transmission}</span>
            </>
          )}
          {vehicle.location && (
            <>
              <span className="w-1 h-1 rounded-full bg-psr-grey-mid flex-shrink-0" />
              <span>{vehicle.location}</span>
            </>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-white/5 pt-4">
          <p className="font-serif text-2xl text-psr-gold font-light">
            £{vehicle.price.toLocaleString()}
          </p>
          <span
            className="text-psr-grey-light group-hover:text-psr-gold transition-colors font-sans flex items-center gap-2"
            style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase' }}
          >
            View
            <span className="block w-4 h-px bg-current group-hover:w-6 transition-all duration-300" />
          </span>
        </div>
      </div>
    </Link>
  );
}
