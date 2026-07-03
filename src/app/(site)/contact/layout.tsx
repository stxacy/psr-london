import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact — PSR LONDON',
  description:
    'Get in touch with the PSR LONDON team. Enquiries about buying, selling, dealer partnerships and press.',
  openGraph: {
    title: 'Contact — PSR LONDON',
    description: 'Get in touch with the PSR LONDON team.',
    siteName: 'PSR LONDON',
    locale: 'en_GB',
    type: 'website',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
