import Link from 'next/link';
import VehicleCard from '@/components/vehicles/VehicleCard';
import { featuredVehicles } from '@/lib/mock-data';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarquesSection />
      <FeaturedSection />
      <HowItWorksSection />
      <SellCtaSection />
    </>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 bg-psr-black">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-psr-gold/[0.04]" />
        <div className="absolute inset-0 bg-gradient-to-t from-psr-black/80 via-transparent to-transparent" />
      </div>

      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 select-none pointer-events-none hidden lg:block"
        aria-hidden
      >
        <span className="font-serif text-[22vw] text-psr-cream/[0.025] tracking-widest leading-none pr-4">
          PSR
        </span>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 pt-36 pb-28 w-full">
        <div className="max-w-4xl">
          <p className="text-[11px] tracking-[0.5em] uppercase text-psr-gold mb-10 font-sans">
            London&apos;s Premier Automotive Marketplace
          </p>

          <h1
            className="font-serif font-light leading-[1.05] text-psr-cream mb-6"
            style={{ fontSize: 'clamp(52px, 7vw, 96px)', letterSpacing: '2px' }}
          >
            The Standard
            <br />
            <em className="not-italic text-psr-gold">for Exceptional</em>
            <br />
            Vehicles
          </h1>

          <div className="w-10 h-px bg-psr-gold mb-8" />

          <p className="font-sans text-psr-grey-light leading-relaxed mb-14 max-w-md" style={{ fontSize: '15px' }}>
            A curated marketplace where every listing has been personally vetted
            by our team. No noise. No compromises. Only the PSR standard.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/vehicles"
              className="inline-flex items-center justify-center px-10 py-4 bg-psr-gold text-psr-black font-sans font-medium hover:bg-psr-gold-light transition-colors duration-300"
              style={{ fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase' }}
            >
              View Collection
            </Link>
            <Link
              href="/sell"
              className="inline-flex items-center justify-center px-10 py-4 border border-white/20 text-psr-cream font-sans hover:border-psr-gold hover:text-psr-gold transition-all duration-300"
              style={{ fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase' }}
            >
              Sell With PSR
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <div className="w-px h-10 bg-gradient-to-b from-psr-gold/40 to-transparent" />
        <p className="text-[10px] tracking-[0.4em] uppercase text-psr-grey-light font-sans">
          Scroll
        </p>
      </div>
    </section>
  );
}

function MarquesSection() {
  const marques = [
    'Aston Martin',
    'Bentley',
    'Ferrari',
    'Lamborghini',
    'McLaren',
    'Porsche',
    'Rolls-Royce',
    'Maserati',
    'Bugatti',
    'Pagani',
  ];

  return (
    <div className="bg-psr-black border-y border-white/8 py-6 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between gap-6 lg:gap-0 overflow-x-auto scrollbar-none">
          {marques.map((marque, i) => (
            <span
              key={marque}
              className="text-[10px] tracking-[0.35em] uppercase font-sans whitespace-nowrap flex-shrink-0 transition-colors duration-200 text-psr-grey-mid hover:text-psr-grey-light cursor-default"
            >
              {marque}
              {i < marques.length - 1 && (
                <span className="inline-block w-px h-3 bg-white/10 mx-6 align-middle" />
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeaturedSection() {
  return (
    <section className="py-24 lg:py-32 bg-psr-black">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex items-end justify-between mb-14">
          <div>
            <p
              className="text-psr-gold font-sans mb-3"
              style={{ fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase' }}
            >
              Handpicked
            </p>
            <h2 className="font-serif text-psr-cream font-light" style={{ fontSize: 'clamp(36px, 4vw, 52px)' }}>
              Featured Collection
            </h2>
          </div>
          <Link
            href="/vehicles"
            className="hidden lg:flex items-center gap-3 text-psr-grey-light hover:text-psr-cream transition-colors font-sans group"
            style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase' }}
          >
            View All
            <span className="block w-6 h-px bg-current group-hover:w-10 transition-all duration-300" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>

        <div className="mt-10 text-center lg:hidden">
          <Link
            href="/vehicles"
            className="inline-flex items-center gap-3 text-psr-grey-light hover:text-psr-cream transition-colors font-sans"
            style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase' }}
          >
            View Full Collection
            <span className="block w-6 h-px bg-current" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const buyerSteps = [
    {
      num: '01',
      title: 'Browse the Collection',
      desc: 'Every listing on PSR LONDON has passed our vetting process. Browse with complete confidence.',
    },
    {
      num: '02',
      title: 'Enquire Directly',
      desc: "Contact sellers through our secure platform. We'll facilitate the conversation and protect both parties.",
    },
    {
      num: '03',
      title: 'Arrange a Viewing',
      desc: 'We recommend all viewings in person. We can facilitate introductions and viewings where needed.',
    },
  ];

  const sellerSteps = [
    {
      num: '01',
      title: 'Apply to List',
      desc: 'Submit your vehicle details, documentation and photographs through our seller portal.',
    },
    {
      num: '02',
      title: 'PSR Review',
      desc: 'Our team personally reviews your application and may request additional information. You track progress throughout.',
    },
    {
      num: '03',
      title: 'Go Live',
      desc: 'Once approved and your listing fee is settled, your vehicle goes live to our network of qualified buyers.',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-psr-offwhite">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mb-20">
          <p
            className="text-psr-gold font-sans mb-3"
            style={{ fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase' }}
          >
            Our Process
          </p>
          <h2
            className="font-serif text-psr-black font-light mb-6"
            style={{ fontSize: 'clamp(36px, 4vw, 52px)' }}
          >
            The PSR Standard
          </h2>
          <p className="font-sans leading-relaxed" style={{ color: '#404040', fontSize: '15px' }}>
            Every vehicle on PSR LONDON is personally reviewed by our team
            before it appears on the platform. We maintain an elevated standard
            so you don&apos;t have to.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <StepGroup label="For Buyers" steps={buyerSteps} light />
          <StepGroup label="For Sellers" steps={sellerSteps} light />
        </div>
      </div>
    </section>
  );
}

function StepGroup({
  label,
  steps,
  light = false,
}: {
  label: string;
  steps: { num: string; title: string; desc: string }[];
  light?: boolean;
}) {
  return (
    <div>
      <p
        className="text-psr-gold font-sans mb-10"
        style={{ fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase' }}
      >
        {label}
      </p>
      <div className="space-y-10">
        {steps.map((step) => (
          <div key={step.num} className="flex gap-7">
            <span
              className="font-serif font-light leading-none mt-1 flex-shrink-0 w-10"
              style={{ fontSize: '36px', color: light ? 'rgba(201,169,110,0.4)' : 'rgba(201,169,110,0.25)' }}
            >
              {step.num}
            </span>
            <div>
              <h3
                className="font-serif font-light mb-2"
                style={{ fontSize: '20px', color: light ? '#000' : '#f5f3ef' }}
              >
                {step.title}
              </h3>
              <p
                className="font-sans leading-relaxed"
                style={{ fontSize: '14px', color: light ? '#404040' : '#8a8a8a' }}
              >
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SellCtaSection() {
  return (
    <section className="py-24 lg:py-32 bg-psr-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-psr-gold/[0.05] via-transparent to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-psr-gold/30 via-psr-gold/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-psr-gold/30 via-psr-gold/10 to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="max-w-2xl">
          <p
            className="text-psr-gold font-sans mb-5"
            style={{ fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase' }}
          >
            Join PSR LONDON
          </p>
          <h2
            className="font-serif text-psr-cream font-light leading-tight mb-6"
            style={{ fontSize: 'clamp(40px, 5vw, 66px)', letterSpacing: '1px' }}
          >
            Ready to list
            <br />
            with us?
          </h2>
          <p
            className="font-sans text-psr-grey-light leading-relaxed mb-10 max-w-md"
            style={{ fontSize: '15px' }}
          >
            We accept applications from private sellers and approved dealers.
            Every listing starts with an application — our team will review your
            vehicle and be in touch within 48 hours.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 items-start">
            <Link
              href="/sell"
              className="inline-flex items-center gap-5 bg-psr-gold text-psr-black font-sans font-medium hover:bg-psr-gold-light transition-colors duration-300"
              style={{
                padding: '18px 40px',
                fontSize: '12px',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
              }}
            >
              Apply to Sell
              <span className="block w-5 h-px bg-current" />
            </Link>
            <div className="sm:pl-6 sm:border-l sm:border-white/10 flex flex-col gap-1.5 justify-center">
              <p className="text-xs text-psr-grey-light font-sans">
                Listing fee from <span className="text-psr-cream">£395</span>
              </p>
              <p className="text-xs text-psr-grey-light font-sans">
                Response within <span className="text-psr-cream">48 hours</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
