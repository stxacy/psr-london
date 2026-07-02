'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
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

function SplashOverlay({
  firstVisit,
  onDismiss,
}: {
  firstVisit: boolean;
  onDismiss: () => void;
}) {
  const [hiding, setHiding] = useState(false);

  const dismiss = useCallback(() => {
    sessionStorage.setItem('psr_entered', '1');
    setHiding(true);
    setTimeout(onDismiss, 550);
  }, [onDismiss]);

  useEffect(() => {
    if (!firstVisit) {
      const t = setTimeout(dismiss, 1200);
      return () => clearTimeout(t);
    }
  }, [firstVisit, dismiss]);

  return (
    <div
      className="fixed inset-0 z-[200] bg-psr-black flex flex-col items-center justify-center cursor-pointer select-none"
      style={{ animation: hiding ? 'splash-out 0.55s ease forwards' : undefined }}
      onClick={firstVisit ? dismiss : undefined}
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
        style={{ animation: 'splash-content-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both' }}
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

        {firstVisit && (
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

type SplashState = { key: number; firstVisit: boolean } | null;

export default function SplashScreen() {
  const pathname = usePathname();
  const prevPathname = useRef<string | null>(null);
  // Start visible so SSR/initial paint shows the splash immediately
  const [splashState, setSplashState] = useState<SplashState>({ key: 0, firstVisit: true });

  const handleDismiss = useCallback(() => setSplashState(null), []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setSplashState(null);
      return;
    }

    const prev = prevPathname.current;
    prevPathname.current = pathname;

    if (prev === null) {
      // Initial hard page load — determine first vs return visit
      const hasEntered = !!sessionStorage.getItem('psr_entered');
      setSplashState({ key: 0, firstVisit: !hasEntered });
    } else if (prev !== pathname) {
      // Client-side navigation — remount overlay with new key
      setSplashState(s => ({ key: (s?.key ?? 0) + 1, firstVisit: false }));
    }
  }, [pathname]);

  if (!splashState) return null;

  return (
    <SplashOverlay
      key={splashState.key}
      firstVisit={splashState.firstVisit}
      onDismiss={handleDismiss}
    />
  );
}
