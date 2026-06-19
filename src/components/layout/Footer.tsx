import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-psr-black border-t border-white/5 py-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">
          <div className="md:col-span-2">
            <p className="font-serif text-xl tracking-[0.35em] text-psr-cream mb-4 uppercase">
              PSR LONDON
            </p>
            <p className="font-sans text-sm text-psr-grey-light leading-relaxed max-w-xs">
              London&apos;s curated luxury automotive marketplace. Every vehicle
              vetted. Every seller verified. No exceptions.
            </p>
            <div className="mt-6 w-8 h-px bg-psr-gold" />
          </div>

          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-psr-grey-mid font-sans mb-5">
              Navigate
            </p>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Collection', href: '/vehicles' },
                { label: 'How It Works', href: '/how-it-works' },
                { label: 'Sell With PSR', href: '/sell' },
                { label: 'Contact', href: '/contact' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm text-psr-grey-light hover:text-psr-cream transition-colors font-sans"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-psr-grey-mid font-sans mb-5">
              Legal
            </p>
            <div className="flex flex-col gap-3">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(
                (item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-sm text-psr-grey-light hover:text-psr-cream transition-colors font-sans"
                  >
                    {item}
                  </a>
                )
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-psr-grey-mid font-sans">
            © 2025 PSR LONDON. All rights reserved.
          </p>
          <p className="text-xs text-psr-grey-mid font-sans">
            London, United Kingdom
          </p>
        </div>
      </div>
    </footer>
  );
}
