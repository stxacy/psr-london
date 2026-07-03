'use client';

import { useState } from 'react';

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  make: string;
  model: string;
  variant: string;
  year: string;
  mileage: string;
  color: string;
  askingPrice: string;
  transmission: string;
  bodyType: string;
  sellerType: string;
  description: string;
  agreeTerms: boolean;
};

const empty: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  make: '',
  model: '',
  variant: '',
  year: '',
  mileage: '',
  color: '',
  askingPrice: '',
  transmission: '',
  bodyType: '',
  sellerType: 'private',
  description: '',
  agreeTerms: false,
};

export default function SellPage() {
  const [form, setForm] = useState<FormState>(empty);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  function set(key: keyof FormState, value: string | boolean) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await fetch('/api/seller-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sellerName: `${form.firstName} ${form.lastName}`.trim(),
          sellerEmail: form.email,
          sellerPhone: form.phone,
          sellerType: form.sellerType,
          vehicleTitle: [form.year, form.make, form.model, form.variant]
            .filter(Boolean)
            .join(' '),
          vehicleMake: form.make,
          vehicleModel: form.model,
          vehicleYear: parseInt(form.year, 10),
          vehicleMileage: parseInt(form.mileage, 10),
          askingPrice: parseInt(form.askingPrice, 10),
          vehicleColour: form.color,
          vehicleDescription: form.description,
        }),
      });
      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return <ConfirmationScreen name={form.firstName} />;
  }

  return (
    <>
      <div className="pt-28 pb-16 bg-psr-black border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-[11px] tracking-[0.4em] uppercase text-psr-gold mb-3 font-sans">
            Sell With PSR LONDON
          </p>
          <h1 className="font-serif text-5xl lg:text-6xl text-psr-cream font-light mb-4">
            List Your Vehicle
          </h1>
          <p className="font-sans text-psr-grey-light text-base max-w-xl leading-relaxed">
            Complete the application below. Our team reviews every submission
            personally and will respond within 48 hours.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-10">
              {[1, 2].map((n) => (
                <button
                  key={n}
                  onClick={() => setStep(n as 1 | 2)}
                  className={`flex items-center gap-3 group`}
                >
                  <span
                    className={`w-8 h-8 flex items-center justify-center text-xs font-sans border transition-colors ${
                      step === n
                        ? 'bg-psr-gold border-psr-gold text-psr-black'
                        : 'border-white/15 text-psr-grey-light'
                    }`}
                  >
                    {n}
                  </span>
                  <span
                    className={`text-[11px] tracking-[0.2em] uppercase font-sans transition-colors ${
                      step === n ? 'text-psr-cream' : 'text-psr-grey-light'
                    }`}
                  >
                    {n === 1 ? 'Your Details' : 'Vehicle Details'}
                  </span>
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
                {step === 1 && (
                <Step1
                  form={form}
                  set={set}
                  onNext={() => setStep(2)}
                />
              )}
              {step === 2 && (
                <Step2
                  form={form}
                  set={set}
                  onBack={() => setStep(1)}
                  loading={loading}
                  error={error}
                />
              )}
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-28 space-y-6">
              <div className="border border-white/8 p-7">
                <p className="text-[10px] tracking-[0.3em] uppercase text-psr-grey-mid font-sans mb-5">
                  What Happens Next
                </p>
                <div className="space-y-6">
                  {[
                    {
                      num: '01',
                      title: 'Application Received',
                      desc: 'We confirm receipt of your submission immediately.',
                    },
                    {
                      num: '02',
                      title: 'Under Review',
                      desc: 'Our team personally reviews your vehicle details.',
                    },
                    {
                      num: '03',
                      title: 'We\'re in Touch',
                      desc: 'Response within 48 hours — approval or next steps.',
                    },
                    {
                      num: '04',
                      title: 'Go Live',
                      desc: 'Your listing goes live once fee is settled.',
                    },
                  ].map((item) => (
                    <div key={item.num} className="flex gap-4">
                      <span className="font-serif text-2xl text-psr-gold/30 font-light leading-none flex-shrink-0 w-7">
                        {item.num}
                      </span>
                      <div>
                        <p className="text-xs text-psr-cream font-sans mb-1">{item.title}</p>
                        <p className="text-xs text-psr-grey-light font-sans leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-white/8 p-7">
                <p className="text-[10px] tracking-[0.3em] uppercase text-psr-grey-mid font-sans mb-4">
                  Listing Fees
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-psr-grey-light font-sans">Private Seller</span>
                    <span className="text-xs text-psr-cream font-sans">£395</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-psr-grey-light font-sans">Approved Dealer</span>
                    <span className="text-xs text-psr-cream font-sans">£895/mo</span>
                  </div>
                </div>
                <p className="text-[10px] text-psr-grey-mid font-sans mt-4 leading-relaxed">
                  Payment is only requested after approval. No upfront cost to
                  apply.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Step1({
  form,
  set,
  onNext,
}: {
  form: FormState;
  set: (k: keyof FormState, v: string | boolean) => void;
  onNext: () => void;
}) {
  function handleNext(e: React.FormEvent) {
    e.preventDefault();
    onNext();
  }

  return (
    <div>
      <p className="font-serif text-2xl text-psr-cream font-light mb-8">
        Your Details
      </p>

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            label="First Name"
            type="text"
            value={form.firstName}
            onChange={(v) => set('firstName', v)}
            required
          />
          <FormField
            label="Last Name"
            type="text"
            value={form.lastName}
            onChange={(v) => set('lastName', v)}
            required
          />
        </div>
        <FormField
          label="Email Address"
          type="email"
          value={form.email}
          onChange={(v) => set('email', v)}
          required
        />
        <FormField
          label="Phone Number"
          type="tel"
          value={form.phone}
          onChange={(v) => set('phone', v)}
          required
        />

        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-psr-grey-mid font-sans mb-3">
            I am a
          </p>
          <div className="flex gap-4">
            {[
              { value: 'private', label: 'Private Seller' },
              { value: 'dealer', label: 'Approved Dealer' },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => set('sellerType', opt.value)}
                className={`flex-1 py-3 text-[11px] tracking-[0.2em] uppercase font-sans border transition-colors ${
                  form.sellerType === opt.value
                    ? 'border-psr-gold text-psr-gold'
                    : 'border-white/10 text-psr-grey-light hover:border-white/25'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4">
          <button
            type="button"
            onClick={handleNext}
            disabled={!form.firstName || !form.lastName || !form.email || !form.phone}
            className="w-full sm:w-auto px-10 py-4 bg-psr-gold text-psr-black text-[11px] tracking-[0.25em] uppercase font-sans font-medium hover:bg-psr-gold-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continue to Vehicle Details
          </button>
        </div>
      </div>
    </div>
  );
}

function Step2({
  form,
  set,
  onBack,
  loading,
  error,
}: {
  form: FormState;
  set: (k: keyof FormState, v: string | boolean) => void;
  onBack: () => void;
  loading: boolean;
  error: boolean;
}) {
  return (
    <div>
      <p className="font-serif text-2xl text-psr-cream font-light mb-8">
        Vehicle Details
      </p>

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            label="Make"
            type="text"
            placeholder="e.g. Porsche"
            value={form.make}
            onChange={(v) => set('make', v)}
            required
          />
          <FormField
            label="Model"
            type="text"
            placeholder="e.g. 911 GT3"
            value={form.model}
            onChange={(v) => set('model', v)}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            label="Variant / Trim"
            type="text"
            placeholder="e.g. PDK Weissach"
            value={form.variant}
            onChange={(v) => set('variant', v)}
          />
          <FormField
            label="Exterior Colour"
            type="text"
            placeholder="e.g. GT Silver Metallic"
            value={form.color}
            onChange={(v) => set('color', v)}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <FormField
            label="Year"
            type="number"
            placeholder="e.g. 2022"
            value={form.year}
            onChange={(v) => set('year', v)}
            required
          />
          <FormField
            label="Mileage"
            type="number"
            placeholder="e.g. 3200"
            value={form.mileage}
            onChange={(v) => set('mileage', v)}
            required
          />
          <FormField
            label="Asking Price (£)"
            type="number"
            placeholder="e.g. 189995"
            value={form.askingPrice}
            onChange={(v) => set('askingPrice', v)}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-[10px] tracking-[0.25em] uppercase text-psr-grey-mid font-sans mb-2">
              Transmission
            </label>
            <select
              value={form.transmission}
              onChange={(e) => set('transmission', e.target.value)}
              className="w-full bg-transparent border-b border-white/15 text-psr-cream font-sans text-sm py-2.5 focus:outline-none focus:border-psr-gold transition-colors appearance-none"
            >
              <option value="" className="bg-psr-black">Select</option>
              {['Manual', 'Automatic', 'DCT', 'PDK', 'SSG', 'CVT'].map((t) => (
                <option key={t} value={t} className="bg-psr-black">{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.25em] uppercase text-psr-grey-mid font-sans mb-2">
              Body Type
            </label>
            <select
              value={form.bodyType}
              onChange={(e) => set('bodyType', e.target.value)}
              className="w-full bg-transparent border-b border-white/15 text-psr-cream font-sans text-sm py-2.5 focus:outline-none focus:border-psr-gold transition-colors appearance-none"
            >
              <option value="" className="bg-psr-black">Select</option>
              {['Coupe', 'Convertible', 'Saloon', 'SUV', 'Grand Tourer', 'Supercar', 'Estate', 'Hatchback'].map((t) => (
                <option key={t} value={t} className="bg-psr-black">{t}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-[10px] tracking-[0.25em] uppercase text-psr-grey-mid font-sans mb-2">
            Vehicle Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            rows={5}
            placeholder="Describe your vehicle — history, condition, notable options, service records..."
            className="w-full bg-transparent border border-white/10 text-psr-cream font-sans text-sm p-4 focus:outline-none focus:border-psr-gold/50 transition-colors resize-none placeholder:text-psr-grey-mid"
          />
        </div>

        <div className="border border-white/8 p-6">
          <p className="text-[10px] tracking-[0.25em] uppercase text-psr-grey-mid font-sans mb-3">
            Supporting Documents
          </p>
          <p className="text-xs text-psr-grey-light font-sans mb-4 leading-relaxed">
            After approval, we&apos;ll request photographs, V5C, and service history.
            You can submit these via your seller portal.
          </p>
          <div className="flex items-center justify-center border border-dashed border-white/10 p-8 text-center">
            <div>
              <p className="text-xs text-psr-grey-light font-sans mb-2">
                Document upload available after initial review
              </p>
              <p className="text-[10px] text-psr-grey-mid font-sans">
                V5C · Service History · Photographs
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={() => set('agreeTerms', !form.agreeTerms)}
            className={`mt-0.5 w-4 h-4 flex-shrink-0 border flex items-center justify-center transition-colors ${
              form.agreeTerms ? 'bg-psr-gold border-psr-gold' : 'border-white/25'
            }`}
          >
            {form.agreeTerms && (
              <span className="text-psr-black text-[10px] font-bold">✓</span>
            )}
          </button>
          <p className="text-xs text-psr-grey-light font-sans leading-relaxed">
            I confirm the vehicle details provided are accurate and I agree to
            the{' '}
            <a href="#" className="text-psr-gold hover:underline underline-offset-4">
              PSR LONDON Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-psr-gold hover:underline underline-offset-4">
              Seller Guidelines
            </a>
            .
          </p>
        </div>

        {error && (
          <p className="text-[11px] tracking-[0.15em] uppercase text-red-400 font-sans">
            Something went wrong — please try again.
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <button
            type="button"
            onClick={onBack}
            disabled={loading}
            className="px-8 py-4 border border-white/15 text-psr-cream text-[11px] tracking-[0.25em] uppercase font-sans hover:border-white/30 transition-colors disabled:opacity-40"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={
              loading ||
              !form.make ||
              !form.model ||
              !form.year ||
              !form.mileage ||
              !form.askingPrice ||
              !form.agreeTerms
            }
            className="flex-1 sm:flex-none sm:px-12 py-4 bg-psr-gold text-psr-black text-[11px] tracking-[0.25em] uppercase font-sans font-medium hover:bg-psr-gold-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting…' : 'Submit Application'}
          </button>
        </div>
      </div>
    </div>
  );
}

function FormField({
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
        {required && <span className="text-psr-gold ml-1">*</span>}
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

function ConfirmationScreen({ name }: { name: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center">
        <div className="w-14 h-14 border border-psr-gold/40 flex items-center justify-center mx-auto mb-8">
          <span className="text-psr-gold text-xl">✓</span>
        </div>

        <p className="text-[11px] tracking-[0.4em] uppercase text-psr-gold font-sans mb-4">
          Application Received
        </p>
        <h2 className="font-serif text-4xl text-psr-cream font-light mb-4">
          Thank you{name ? `, ${name}` : ''}.
        </h2>
        <p className="font-sans text-psr-grey-light text-sm leading-relaxed mb-10 max-w-md mx-auto">
          We&apos;ve received your application and our team will personally review
          your vehicle details. You can expect to hear from us within 48 hours.
        </p>

        <div className="border border-white/8 p-8 text-left mb-8">
          <p className="text-[10px] tracking-[0.3em] uppercase text-psr-grey-mid font-sans mb-5">
            Your Application Timeline
          </p>
          <div className="space-y-4">
            {[
              { label: 'Application Received', status: 'complete' },
              { label: 'Under Review', status: 'active' },
              { label: 'Additional Info Requested (if needed)', status: 'pending' },
              { label: 'Decision', status: 'pending' },
              { label: 'Listing Goes Live', status: 'pending' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <div
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    item.status === 'complete'
                      ? 'bg-psr-gold'
                      : item.status === 'active'
                      ? 'bg-psr-gold/50 ring-2 ring-psr-gold/20'
                      : 'bg-white/10'
                  }`}
                />
                <span
                  className={`text-xs font-sans ${
                    item.status === 'complete'
                      ? 'text-psr-cream'
                      : item.status === 'active'
                      ? 'text-psr-cream'
                      : 'text-psr-grey-light'
                  }`}
                >
                  {item.label}
                </span>
                {item.status === 'active' && (
                  <span className="text-[10px] text-psr-gold font-sans ml-auto">
                    In Progress
                  </span>
                )}
                {item.status === 'complete' && (
                  <span className="text-[10px] text-psr-gold font-sans ml-auto">
                    Done
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-psr-grey-light font-sans">
          A confirmation has been sent to your email address.
        </p>
      </div>
    </div>
  );
}
