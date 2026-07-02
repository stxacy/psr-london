'use client';

import { useCallback, useEffect, useState } from 'react';

function DiamondMark() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden
      style={{ animation: 'diamond-breathe 2.625s ease-in-out infinite' }}
    >
      <path d="M11 1 L21 11 L11 21 L1 11 Z" stroke="#c9a96e" strokeWidth="0.75" />
      <path d="M11 5.5 L16.5 11 L11 16.5 L5.5 11 Z" stroke="#c9a96e" strokeWidth="0.5" opacity="0.5" />
      <path d="M11 9 L13 11 L11 13 L9 11 Z" fill="#c9a96e" opacity="0.4" />
    </svg>
  );
}

export default function SplashScreen() {
  const [hiding, setHiding] = useState(false);
  const [gone, setGone] = useState(false);
  // null = unknown until client effect runs (avoids SSR flash of hint on return visits)
  const [firstVisit, setFirstVisit] = useState<boolean | null>(null);

  const dismiss = useCallback(() => {
    sessionStorage.setItem('psr_entered', '1');
    setHiding(true);
    setTimeout(() => setGone(true), 413);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setGone(true);
      return;
    }

    const hasEntered = !!sessionStorage.getItem('psr_entered');
    setFirstVisit(!hasEntered);

    if (hasEntered) {
      const t = setTimeout(dismiss, 900);
      return () => clearTimeout(t);
    }
  }, [dismiss]);

  if (gone) return null;

  return (
    <div
      className="fixed inset-0 z-[200] bg-psr-black flex flex-col items-center justify-center select-none"
      style={{
        animation: hiding ? 'splash-out 0.41s ease forwards' : undefined,
        cursor: firstVisit ? 'pointer' : 'default',
      }}
      onClick={firstVisit === true ? dismiss : undefined}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,169,110,0.05) 0%, transparent 70%)',
        }}
      />

      <div
        className="relative z-10 flex flex-col items-center gap-5"
        style={{ animation: 'splash-content-in 0.375s cubic-bezier(0.22, 1, 0.36, 1) both' }}
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

        {firstVisit === true && (
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
