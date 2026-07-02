'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';

function DiamondMark() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden
      style={{ animation: 'diamond-breathe 3.5s ease-in-out infinite' }}
    >
      <path d="M11 1 L21 11 L11 21 L1 11 Z" stroke="#c9a96e" strokeWidth="0.75" />
      <path d="M11 5.5 L16.5 11 L11 16.5 L5.5 11 Z" stroke="#c9a96e" strokeWidth="0.5" opacity="0.5" />
      <path d="M11 9 L13 11 L11 13 L9 11 Z" fill="#c9a96e" opacity="0.4" />
    </svg>
  );
}

export default function SplashScreen() {
  const [phase, setPhase] = useState<'show' | 'hiding' | 'gone'>('show');
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const pathname = usePathname();
  const prevPathname = useRef<string | null>(null);

  const dismiss = useCallback(() => {
    sessionStorage.setItem('psr_entered', '1');
    setPhase('hiding');
    setTimeout(() => setPhase('gone'), 550);
  }, []);

  useEffect(() => {
    // Skip if pathname hasn't actually changed
    if (prevPathname.current === pathname) return;

    const prev = prevPathname.current;
    prevPathname.current = pathname;

    if (prev === null) {
      // Initial hard page load
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setPhase('gone');
        return;
      }
      const hasEntered = sessionStorage.getItem('psr_entered');
      if (hasEntered) {
        setIsFirstVisit(false);
        const timer = setTimeout(dismiss, 700);
        return () => clearTimeout(timer);
      }
      // First ever visit — wait for click
    } else {
      // Client-side navigation between pages
      setIsFirstVisit(false);
      setPhase('show');
      const timer = setTimeout(dismiss, 700);
      return () => clearTimeout(timer);
    }
  }, [pathname, dismiss]);

  if (phase === 'gone') return null;

  return (
    <div
      className="fixed inset-0 z-[200] bg-psr-black flex flex-col items-center justify-center cursor-pointer select-none"
      style={{
        animation: phase === 'hiding' ? 'splash-out 0.55s ease forwards' : undefined,
      }}
      onClick={isFirstVisit ? dismiss : undefined}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,169,110,0.05) 0%, transparent 70%)',
        }}
      />

      <div
        className="relative z-10 flex flex-col items-center gap-5"
        style={{ animation: 'splash-content-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) both' }}
      >
        <DiamondMark />

        <div className="w-px h-8 bg-psr-gold/20" />

        <div className="flex flex-col items-center gap-2.5">
          <span
            className="font-serif text-psr-cream uppercase leading-none"
            style={{ fontSize: 'clamp(36px, 6vw, 72px)', letterSpacing: '0.35em' }}
          >
            PSR LONDON
          </span>
          <span
            className="font-sans text-psr-grey-light uppercase tracking-[0.5em] leading-none"
            style={{ fontSize: '9px' }}
          >
            Curated Collection
          </span>
        </div>

        {isFirstVisit && (
          <p
            className="font-sans text-psr-grey-mid uppercase mt-6"
            style={{ fontSize: '10px', letterSpacing: '0.4em' }}
          >
            Click anywhere to enter
          </p>
        )}
      </div>
    </div>
  );
}
