'use client';

import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
    };
  }, [visible]);

  return (
    <div
      className="fixed pointer-events-none z-[9999] hidden lg:block"
      style={{
        left: pos.x,
        top: pos.y,
        transform: 'translate(-50%, -50%)',
        mixBlendMode: 'difference',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
    >
      <div
        style={{
          width: clicking ? 10 : 14,
          height: clicking ? 10 : 14,
          border: '1px solid white',
          transform: 'rotate(45deg)',
          transition: 'width 0.15s ease, height 0.15s ease',
        }}
      />
    </div>
  );
}
