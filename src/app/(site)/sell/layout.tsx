import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'List Your Vehicle — PSR LONDON',
  description:
    'Apply to list your vehicle on PSR LONDON. Our team personally reviews every application. Private sellers and approved dealers welcome.',
  openGraph: {
    title: 'List Your Vehicle — PSR LONDON',
    description:
      'Apply to sell your vehicle on the UK\'s premier vetted luxury automotive marketplace.',
    siteName: 'PSR LONDON',
    locale: 'en_GB',
    type: 'website',
  },
}

export default function SellLayout({ children }: { children: React.ReactNode }) {
  return children
}
