'use client';

import { useState } from 'react';

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const subjects = [
  'General Enquiry',
  'Buying a Vehicle',
  'Selling a Vehicle',
  'Dealer Partnership',
  'Press & Media',
  'Other',
];

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  function set(key: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-psr-black">
        <div className="max-w-lg w-full text-center">
          <div className="w-12 h-12 border border-psr-gold/40 flex items-center justify-center mx-auto mb-8"
            style={{ transform: 'rotate(45deg)' }}>
            <span className="text-psr-gold" style={{ transform: 'rotate(-45deg)', display: 'block' }}>✓</span>
          </div>
          <p
            className="text-psr-gold font-sans mb-4"
            style={{ fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase' }}
          >
            Message Received
          </p>
          <h2
            className="font-serif text-psr-cream font-light mb-4"
            style={{ fontSize: '40px' }}
          >
            Thank you, {form.name.split(' ')[0]}.
          </h2>
          <p className="font-sans text-psr-grey-light text-sm leading-relaxed">
            We&apos;ve received your message and will be in touch within one
            business day.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <div className="pt-36 pb-20 bg-psr-black relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-psr-gold/[0.03]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-psr-gold/20 to-transparent" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
          <p
            className="text-psr-gold font-sans mb-4"
            style={{ fontSize: '11px', letterSpacing: '0.5em', textTransform: 'uppercase' }}
          >
            PSR LONDON
          </p>
          <h1
            className="font-serif text-psr-cream font-light leading-tight"
            style={{ fontSize: 'clamp(48px, 6vw, 84px)', letterSpacing: '1px' }}
          >
            Get in Touch
          </h1>
        </div>
      </div>

      <div className="bg-psr-black py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">

            {/* Left: info */}
            <div className="lg:col-span-4">
              <div className="space-y-12">
                <div>
                  <p
                    className="text-psr-gold font-sans mb-5"
                    style={{ fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase' }}
                  >
                    London Office
                  </p>
                  <p className="font-sans text-psr-cream text-sm leading-relaxed">
                    PSR LONDON
                    <br />
                    15 Mayfair Place
                    <br />
                    London, W1J 8AJ
                    <br />
                    United Kingdom
                  </p>
                </div>

                <div>
                  <p
                    className="text-psr-gold font-sans mb-5"
                    style={{ fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase' }}
                  >
                    Contact
                  </p>
                  <div className="space-y-2">
                    <p className="font-sans text-sm">
                      <span className="text-psr-grey-light">General: </span>
                      <span className="text-psr-cream">hello@psrlondon.com</span>
                    </p>
                    <p className="font-sans text-sm">
                      <span className="text-psr-grey-light">Sellers: </span>
                      <span className="text-psr-cream">sell@psrlondon.com</span>
                    </p>
                    <p className="font-sans text-sm">
                      <span className="text-psr-grey-light">Phone: </span>
                      <span className="text-psr-cream">+44 (0)20 7000 0000</span>
                    </p>
                  </div>
                </div>

                <div>
                  <p
                    className="text-psr-gold font-sans mb-5"
                    style={{ fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase' }}
                  >
                    Hours
                  </p>
                  <div className="space-y-1.5">
                    {[
                      { day: 'Monday – Friday', hours: '9:00am – 6:00pm' },
                      { day: 'Saturday', hours: '10:00am – 4:00pm' },
                      { day: 'Sunday', hours: 'Closed' },
                    ].map((row) => (
                      <div key={row.day} className="flex justify-between gap-6">
                        <span className="text-psr-grey-light font-sans text-xs whitespace-nowrap flex-shrink-0">{row.day}</span>
                        <span className="text-psr-cream font-sans text-xs whitespace-nowrap text-right">{row.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/5 pt-10">
                  <p
                    className="text-psr-gold font-sans mb-5"
                    style={{ fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase' }}
                  >
                    Quick Links
                  </p>
                  <div className="space-y-3">
                    {[
                      { label: 'Browse the Collection', href: '/vehicles' },
                      { label: 'Sell With PSR', href: '/sell' },
                      { label: 'How It Works', href: '/how-it-works' },
                    ].map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className="flex items-center gap-3 text-psr-grey-light hover:text-psr-cream transition-colors group"
                        style={{ fontSize: '13px' }}
                      >
                        <span className="block w-4 h-px bg-current group-hover:w-6 transition-all" />
                        <span className="font-sans">{item.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="lg:col-span-8">
              <p
                className="font-serif text-psr-cream font-light mb-10"
                style={{ fontSize: '28px' }}
              >
                Send us a message
              </p>

              <form onSubmit={handleSubmit} className="space-y-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                </div>

                <Field
                  label="Phone Number"
                  type="tel"
                  value={form.phone}
                  onChange={(v) => set('phone', v)}
                />

                <div>
                  <label
                    className="block font-sans mb-2"
                    style={{
                      fontSize: '10px',
                      letterSpacing: '0.25em',
                      textTransform: 'uppercase',
                      color: '#4a4a4a',
                    }}
                  >
                    Subject <span className="text-psr-gold">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {subjects.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => set('subject', s)}
                        className="font-sans transition-colors"
                        style={{
                          padding: '8px 16px',
                          fontSize: '11px',
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          border: `1px solid ${form.subject === s ? '#c9a96e' : 'rgba(255,255,255,0.1)'}`,
                          color: form.subject === s ? '#c9a96e' : '#8a8a8a',
                          background: 'transparent',
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    className="block font-sans mb-2"
                    style={{
                      fontSize: '10px',
                      letterSpacing: '0.25em',
                      textTransform: 'uppercase',
                      color: '#4a4a4a',
                    }}
                  >
                    Message <span className="text-psr-gold">*</span>
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => set('message', e.target.value)}
                    rows={6}
                    required
                    placeholder="Tell us how we can help..."
                    className="w-full bg-transparent font-sans text-psr-cream resize-none focus:outline-none transition-colors"
                    style={{
                      border: '1px solid rgba(255,255,255,0.1)',
                      padding: '16px',
                      fontSize: '14px',
                      lineHeight: '1.6',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'rgba(201,169,110,0.4)')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={!form.name || !form.email || !form.subject || !form.message}
                    className="inline-flex items-center gap-5 bg-psr-gold text-psr-black font-sans font-medium hover:bg-psr-gold-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                      padding: '18px 44px',
                      fontSize: '12px',
                      letterSpacing: '1.5px',
                      textTransform: 'uppercase',
                    }}
                  >
                    Send Message
                    <span className="block w-5 h-px bg-current" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  required,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label
        className="block font-sans mb-2"
        style={{
          fontSize: '10px',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: '#4a4a4a',
        }}
      >
        {label}
        {required && <span className="text-psr-gold ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full bg-transparent text-psr-cream font-sans focus:outline-none transition-colors"
        style={{
          borderBottom: '1px solid rgba(255,255,255,0.15)',
          paddingBottom: '10px',
          fontSize: '14px',
        }}
        onFocus={(e) => (e.target.style.borderBottomColor = 'rgba(201,169,110,0.6)')}
        onBlur={(e) => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.15)')}
      />
    </div>
  );
}
