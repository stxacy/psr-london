'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  vehicleId: number | string;
  vehicleTitle: string;
  onClose: () => void;
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const empty: FormState = { name: '', email: '', phone: '', message: '' };

export default function EnquiryModal({ vehicleId, vehicleTitle, onClose }: Props) {
  const [form, setForm] = useState<FormState>(empty);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  function set(key: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicle: vehicleId,
          vehicleTitle,
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          message: form.message,
        }),
      });
      if (!res.ok) throw new Error('Failed');
      setDone(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center bg-psr-black/80 backdrop-blur-sm p-0 sm:p-6"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="relative w-full sm:max-w-lg bg-[#111] border border-white/10 p-8 sm:p-10">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-psr-grey-mid hover:text-psr-cream transition-colors font-sans text-xs tracking-widest uppercase"
        >
          Close
        </button>

        {done ? (
          <div className="py-6 text-center">
            <div className="w-12 h-12 border border-psr-gold/40 flex items-center justify-center mx-auto mb-6">
              <span className="text-psr-gold">✓</span>
            </div>
            <p className="text-[11px] tracking-[0.4em] uppercase text-psr-gold font-sans mb-3">
              Enquiry Sent
            </p>
            <h3 className="font-serif text-2xl text-psr-cream font-light mb-3">
              We&apos;ll be in touch.
            </h3>
            <p className="text-sm text-psr-grey-light font-sans leading-relaxed">
              Our team will respond to your enquiry within 24 hours.
            </p>
          </div>
        ) : (
          <>
            <p className="text-[11px] tracking-[0.4em] uppercase text-psr-gold font-sans mb-1">
              Enquire
            </p>
            <h3 className="font-serif text-2xl text-psr-cream font-light mb-1">
              {vehicleTitle}
            </h3>
            <p className="text-xs text-psr-grey-light font-sans mb-8">
              Submit your details and a member of our team will be in touch within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <Field
                label="Full Name"
                type="text"
                value={form.name}
                onChange={(v) => set('name', v)}
                required
              />
              <Field
                label="Email Address"
                type="email"
                value={form.email}
                onChange={(v) => set('email', v)}
                required
              />
              <Field
                label="Phone Number (optional)"
                type="tel"
                value={form.phone}
                onChange={(v) => set('phone', v)}
              />
              <div>
                <label className="block text-[10px] tracking-[0.25em] uppercase text-psr-grey-mid font-sans mb-2">
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => set('message', e.target.value)}
                  required
                  rows={4}
                  placeholder="Any questions or specific requirements..."
                  className="w-full bg-transparent border border-white/10 text-psr-cream font-sans text-sm p-3.5 focus:outline-none focus:border-psr-gold/50 transition-colors resize-none placeholder:text-psr-grey-mid/60"
                />
              </div>

              {error && (
                <p className="text-[11px] tracking-[0.15em] uppercase text-red-400 font-sans">
                  Something went wrong — please try again.
                </p>
              )}

              <button
                type="submit"
                disabled={loading || !form.name || !form.email || !form.message}
                className="w-full py-4 bg-psr-gold text-psr-black text-[11px] tracking-[0.25em] uppercase font-sans font-medium hover:bg-psr-gold-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending…' : 'Send Enquiry'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  required,
  placeholder,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-[10px] tracking-[0.25em] uppercase text-psr-grey-mid font-sans mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="w-full bg-transparent border-b border-white/15 text-psr-cream font-sans text-sm py-2.5 focus:outline-none focus:border-psr-gold transition-colors placeholder:text-psr-grey-mid/60"
      />
    </div>
  );
}
