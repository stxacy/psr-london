'use client';

import { useState } from 'react';
import EnquiryModal from './EnquiryModal';

type Props = {
  vehicleId: number | string;
  vehicleTitle: string;
};

export default function EnquireButton({ vehicleId, vehicleTitle }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full px-6 py-4 bg-psr-gold text-psr-black text-[11px] tracking-[0.25em] uppercase font-sans font-medium hover:bg-psr-gold-light transition-colors"
      >
        Enquire Now
      </button>
      {open && (
        <EnquiryModal
          vehicleId={vehicleId}
          vehicleTitle={vehicleTitle}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
