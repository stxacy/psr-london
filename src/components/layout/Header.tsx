'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

function DiamondMark({ className = '' }: { className?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M11 1 L21 11 L11 21 L1 11 Z"
        stroke="currentColor"
        strokeWidth="0.75"
      />
      <path
        d="M11 5.5 L16.5 11 L11 16.5 L5.5 11 Z"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.5"
      />
      <path
        d="M11 9 L13 11 L11 13 L9 11 Z"
        fill="currentColor"
        opacity="0.4"
      />
    </svg>
  );
}

const navItems = [
  { label: 'Collection', href: '/vehicles', sub: 'Browse all vehicles' },
  { label: 'How It Works', href: '/how-it-works', sub: 'The PSR standard' },
  { label: 'Sell With PSR', href: '/sell', sub: 'List your vehicle' },
  { label: 'Contact', href: '/contact', sub: 'Get in touch' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-psr-black/96 backdrop-blur-sm border-b border-white/5 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-3 items-center">
          {/* Left: Hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="flex items-center gap-3 text-psr-cream hover:text-psr-gold transition-colors group w-fit"
            aria-label="Open navigation"
          >
            <div className="flex flex-col gap-[5px]">
              <span className="block w-5 h-px bg-current transition-all" />
              <span className="block w-5 h-px bg-current transition-all" />
              <span className="block w-3 h-px bg-current transition-all" />
            </div>
            <span className="text-[11px] tracking-[0.25em] uppercase font-sans hidden sm:block">
              Menu
            </span>
          </button>

          {/* Centre: Logo */}
          <Link
            href="/"
            className="flex flex-col items-center gap-1.5 group justify-self-center"
          >
            <DiamondMark className="text-psr-gold group-hover:text-psr-gold-light transition-colors" />
            <span className="font-serif text-lg lg:text-xl tracking-[0.35em] text-psr-cream uppercase group-hover:text-psr-gold transition-colors duration-300 leading-none">
              PSR LONDON
            </span>
            <span className="text-[8px] tracking-[0.45em] uppercase text-psr-grey-light font-sans leading-none">
              Curated Collection
            </span>
          </Link>

          {/* Right: CTA */}
          <div className="justify-self-end">
            <Link
              href="/vehicles"
              className="text-[11px] tracking-[0.2em] uppercase text-psr-grey-light hover:text-psr-cream transition-colors font-sans hidden sm:block"
            >
              <span className="hidden lg:inline">View Collection</span>
              <span className="lg:hidden">Collection</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Full-screen overlay nav */}
      <div
        className={`fixed inset-0 z-[100] bg-psr-black flex flex-col transition-all duration-500 ${
          menuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Overlay header */}
        <div className="flex items-center justify-between px-6 lg:px-12 py-5 border-b border-white/5 flex-shrink-0">
          <button
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 text-psr-grey-light hover:text-psr-cream transition-colors group"
            aria-label="Close navigation"
          >
            <div className="relative w-5 h-5">
              <span className="absolute top-1/2 left-0 w-5 h-px bg-current rotate-45 -translate-y-1/2" />
              <span className="absolute top-1/2 left-0 w-5 h-px bg-current -rotate-45 -translate-y-1/2" />
            </div>
            <span className="text-[11px] tracking-[0.25em] uppercase font-sans hidden sm:block">
              Close
            </span>
          </button>

          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="flex flex-col items-center gap-1.5"
          >
            <DiamondMark className="text-psr-gold" />
            <span className="font-serif text-lg tracking-[0.35em] text-psr-cream uppercase leading-none">
              PSR LONDON
            </span>
          </Link>

          <Link
            href="/vehicles"
            onClick={() => setMenuOpen(false)}
            className="text-[11px] tracking-[0.2em] uppercase text-psr-grey-light hover:text-psr-cream transition-colors font-sans hidden sm:block"
          >
            View Collection
          </Link>
        </div>

        {/* Nav links */}
        <nav className="flex-1 flex flex-col justify-center px-6 lg:px-16 xl:px-24">
          <div className="max-w-[1440px] mx-auto w-full">
            {navItems.map((item, i) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="group flex items-end gap-8 py-6 border-b border-white/5 hover:border-psr-gold/20 transition-all duration-300"
                style={{ transitionDelay: menuOpen ? `${i * 60}ms` : '0ms' }}
              >
                <span className="font-serif text-5xl lg:text-6xl xl:text-7xl text-psr-cream font-light group-hover:text-psr-gold transition-colors duration-300 leading-none">
                  {item.label}
                </span>
                <span className="text-[10px] tracking-[0.3em] uppercase text-psr-grey-mid font-sans mb-2 hidden sm:block group-hover:text-psr-grey-light transition-colors">
                  {item.sub}
                </span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Overlay footer */}
        <div className="px-6 lg:px-12 py-6 border-t border-white/5 flex-shrink-0 flex items-center justify-between">
          <p className="text-[10px] tracking-[0.25em] uppercase text-psr-grey-mid font-sans">
            © 2025 PSR LONDON
          </p>
          <p className="text-[10px] tracking-[0.25em] uppercase text-psr-grey-mid font-sans">
            London, United Kingdom
          </p>
        </div>
      </div>
    </>
  );
}
