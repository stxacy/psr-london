import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How It Works — PSR LONDON',
  description:
    'Learn how PSR LONDON vets every vehicle and seller before they appear on our platform. The PSR standard explained.',
};

const buyerSteps = [
  {
    num: '01',
    title: 'Browse the Collection',
    body: 'Every vehicle on PSR LONDON has been personally reviewed and approved by our team before it appears. You will never encounter unvetted listings, misleading descriptions, or private sellers who haven\'t been qualified. What you see is what has passed the PSR standard.',
  },
  {
    num: '02',
    title: 'Enquire on a Vehicle',
    body: 'When you find a vehicle you\'re interested in, submit an enquiry through the platform. All communication is mediated through PSR LONDON — seller contact details are never shared directly until both parties have been introduced and the dialogue is established.',
  },
  {
    num: '03',
    title: 'Arrange a Viewing',
    body: 'We recommend all serious buyers view the vehicle in person before proceeding. PSR LONDON can assist with introductions and logistics where needed. We can also connect you with independent inspection services for added assurance.',
  },
  {
    num: '04',
    title: 'Complete the Purchase',
    body: 'PSR LONDON is a matchmaking platform, not a transacting party. The purchase is agreed directly between buyer and seller. We recommend using a solicitor or specialist automotive finance broker for high-value transactions.',
  },
];

const sellerSteps = [
  {
    num: '01',
    title: 'Submit Your Application',
    body: 'Complete the seller application form with your contact details, full vehicle specifications, asking price and a description of the car\'s history and condition. Applications take around 10 minutes to complete.',
  },
  {
    num: '02',
    title: 'Document Submission',
    body: 'Once your initial application is received, we\'ll request supporting documentation: V5C logbook, full service history, MOT certificate (where applicable), and a set of high-quality photographs covering all angles, the interior, and any notable condition details.',
  },
  {
    num: '03',
    title: 'PSR Team Review',
    body: 'A member of our team personally reviews every application. We assess the vehicle\'s provenance, documentation, asking price versus market value, and the overall presentation. You can track the status of your application in real time through your seller portal.',
  },
  {
    num: '04',
    title: 'Approval & Listing Fee',
    body: 'If your vehicle meets the PSR standard, you\'ll receive a formal approval notification. At this point the listing fee becomes payable — £395 for private sellers, or covered under your dealer subscription. Once payment is confirmed, your listing goes live.',
  },
  {
    num: '05',
    title: 'Your Listing Goes Live',
    body: 'Your vehicle is published to the PSR LONDON collection and made visible to our network of qualified buyers. You\'ll be notified directly of each enquiry and can manage responses through your seller portal.',
  },
];

const standards = [
  {
    title: 'Minimum Price Threshold',
    desc: 'We list vehicles priced at £50,000 and above only. This maintains the calibre of the collection and the seriousness of both buyers and sellers on the platform.',
  },
  {
    title: 'Full Documentation Required',
    desc: 'Every vehicle must be accompanied by verifiable documentation — V5C, service history, and provenance records where applicable. We do not list vehicles with incomplete or unverifiable history.',
  },
  {
    title: 'Accurate Representation',
    desc: 'Sellers are required to describe their vehicles accurately, including any known defects, accident history, or outstanding finance. Misrepresentation results in immediate removal.',
  },
  {
    title: 'Vetted Sellers Only',
    desc: 'Both private sellers and approved dealers must apply and be accepted. We carry out identity verification and review the seller\'s credibility before any listing is approved.',
  },
  {
    title: 'PSR Pricing Review',
    desc: 'Our team assesses the asking price against current market data. Vehicles priced significantly above market value are flagged before listing — we protect buyers from inflated pricing.',
  },
  {
    title: 'Quality Photography',
    desc: 'All listings must meet a minimum photography standard. We require clean, well-lit images that accurately represent the vehicle. Poor quality or misleading photography is not accepted.',
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <div className="pt-36 pb-20 bg-psr-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-psr-gold/[0.04]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-psr-gold/20 to-transparent" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
          <p
            className="text-psr-gold font-sans mb-4"
            style={{ fontSize: '11px', letterSpacing: '0.5em', textTransform: 'uppercase' }}
          >
            The PSR Standard
          </p>
          <h1
            className="font-serif text-psr-cream font-light leading-tight mb-6"
            style={{ fontSize: 'clamp(48px, 6vw, 84px)', letterSpacing: '1px' }}
          >
            How It Works
          </h1>
          <div className="w-10 h-px bg-psr-gold mb-8" />
          <p
            className="font-sans text-psr-grey-light leading-relaxed max-w-xl"
            style={{ fontSize: '15px' }}
          >
            PSR LONDON is a vetted luxury automotive marketplace. Every vehicle
            and every seller is reviewed by our team before appearing on the
            platform. Here is exactly what that means for buyers and sellers.
          </p>
        </div>
      </div>

      {/* Buyer journey */}
      <section className="py-24 lg:py-32 bg-psr-black border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p
                className="text-psr-gold font-sans mb-4"
                style={{ fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase' }}
              >
                For Buyers
              </p>
              <h2
                className="font-serif text-psr-cream font-light mb-6"
                style={{ fontSize: 'clamp(32px, 3.5vw, 48px)' }}
              >
                Browse with confidence
              </h2>
              <p
                className="font-sans text-psr-grey-light leading-relaxed"
                style={{ fontSize: '14px' }}
              >
                Every vehicle you see on PSR LONDON has passed our review. We
                do the work so you can focus on finding the right car.
              </p>
            </div>

            <div className="lg:col-span-8">
              <div className="space-y-0">
                {buyerSteps.map((step, i) => (
                  <div
                    key={step.num}
                    className="flex gap-8 py-8 border-b border-white/5"
                  >
                    <span
                      className="font-serif font-light leading-none flex-shrink-0 w-12 pt-1"
                      style={{ fontSize: '32px', color: 'rgba(201,169,110,0.25)' }}
                    >
                      {step.num}
                    </span>
                    <div>
                      <h3
                        className="font-serif text-psr-cream font-light mb-3"
                        style={{ fontSize: '22px' }}
                      >
                        {step.title}
                      </h3>
                      <p
                        className="font-sans text-psr-grey-light leading-relaxed"
                        style={{ fontSize: '14px' }}
                      >
                        {step.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seller journey */}
      <section className="py-24 lg:py-32 bg-psr-offwhite">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p
                className="text-psr-gold font-sans mb-4"
                style={{ fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase' }}
              >
                For Sellers
              </p>
              <h2
                className="font-serif font-light mb-6"
                style={{ fontSize: 'clamp(32px, 3.5vw, 48px)', color: '#000' }}
              >
                From application to live listing
              </h2>
              <p
                className="font-sans leading-relaxed"
                style={{ fontSize: '14px', color: '#404040' }}
              >
                Our vetting process is thorough but straightforward. We review
                every application personally and keep you informed at every stage.
              </p>
              <div className="mt-10">
                <Link
                  href="/sell"
                  className="inline-flex items-center gap-4 bg-psr-black text-white font-sans font-medium hover:bg-psr-charcoal transition-colors"
                  style={{
                    padding: '16px 32px',
                    fontSize: '12px',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                  }}
                >
                  Apply to List
                  <span className="block w-4 h-px bg-white" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="space-y-0">
                {sellerSteps.map((step) => (
                  <div
                    key={step.num}
                    className="flex gap-8 py-8 border-b"
                    style={{ borderColor: 'rgba(0,0,0,0.08)' }}
                  >
                    <span
                      className="font-serif font-light leading-none flex-shrink-0 w-12 pt-1"
                      style={{ fontSize: '32px', color: 'rgba(201,169,110,0.5)' }}
                    >
                      {step.num}
                    </span>
                    <div>
                      <h3
                        className="font-serif font-light mb-3"
                        style={{ fontSize: '22px', color: '#000' }}
                      >
                        {step.title}
                      </h3>
                      <p
                        className="font-sans leading-relaxed"
                        style={{ fontSize: '14px', color: '#404040' }}
                      >
                        {step.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The PSR Standard criteria */}
      <section className="py-24 lg:py-32 bg-psr-black">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mb-16">
            <p
              className="text-psr-gold font-sans mb-4"
              style={{ fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase' }}
            >
              Our Criteria
            </p>
            <h2
              className="font-serif text-psr-cream font-light mb-6"
              style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}
            >
              What we look for
            </h2>
            <p
              className="font-sans text-psr-grey-light leading-relaxed"
              style={{ fontSize: '15px' }}
            >
              The PSR standard is not a checklist — it is a judgement. These are
              the core criteria our team applies to every application.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
            {standards.map((item, i) => (
              <div
                key={item.title}
                className={`p-8 border-b border-white/5 ${
                  i % 2 === 0 ? 'md:border-r md:border-white/5' : ''
                } ${
                  i % 3 !== 2 ? 'lg:border-r lg:border-white/5' : 'lg:border-r-0'
                }`}
              >
                <div className="w-6 h-px bg-psr-gold mb-5" />
                <h3
                  className="font-serif text-psr-cream font-light mb-3"
                  style={{ fontSize: '20px' }}
                >
                  {item.title}
                </h3>
                <p
                  className="font-sans text-psr-grey-light leading-relaxed"
                  style={{ fontSize: '14px' }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fees */}
      <section className="py-24 bg-psr-charcoal border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p
                className="text-psr-gold font-sans mb-4"
                style={{ fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase' }}
              >
                Listing Fees
              </p>
              <h2
                className="font-serif text-psr-cream font-light mb-6"
                style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}
              >
                Simple, transparent pricing
              </h2>
              <p
                className="font-sans text-psr-grey-light leading-relaxed mb-10"
                style={{ fontSize: '14px' }}
              >
                There is no cost to apply. Fees are only charged upon approval,
                once your listing has been accepted.
              </p>

              <div className="space-y-0 border-t border-white/5">
                {[
                  {
                    type: 'Private Seller',
                    fee: '£395',
                    sub: 'Per listing, paid on approval',
                  },
                  {
                    type: 'Approved Dealer',
                    fee: '£895 /mo',
                    sub: 'Unlimited listings, monthly subscription',
                  },
                  {
                    type: 'Featured Placement',
                    fee: 'From £150',
                    sub: 'Homepage feature, newsletter, social spotlight',
                  },
                ].map((item) => (
                  <div
                    key={item.type}
                    className="flex items-start justify-between py-5 border-b border-white/5"
                  >
                    <div>
                      <p className="text-psr-cream font-sans text-sm mb-1">{item.type}</p>
                      <p className="text-psr-grey-light font-sans text-xs">{item.sub}</p>
                    </div>
                    <p className="font-serif text-psr-gold text-2xl font-light flex-shrink-0 ml-8">
                      {item.fee}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="border border-white/8 p-10">
                <p
                  className="font-serif text-psr-cream font-light mb-6 leading-snug"
                  style={{ fontSize: '26px' }}
                >
                  Ready to list your vehicle with PSR LONDON?
                </p>
                <p
                  className="font-sans text-psr-grey-light leading-relaxed mb-8"
                  style={{ fontSize: '14px' }}
                >
                  The application takes around 10 minutes. Our team will review
                  your submission and respond within 48 hours.
                </p>
                <Link
                  href="/sell"
                  className="inline-flex items-center gap-4 bg-psr-gold text-psr-black font-sans font-medium hover:bg-psr-gold-light transition-colors"
                  style={{
                    padding: '16px 36px',
                    fontSize: '12px',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                  }}
                >
                  Start Your Application
                  <span className="block w-4 h-px bg-current" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
