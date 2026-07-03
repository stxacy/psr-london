import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import '../globals.css'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'PSR LONDON — The Standard for Exceptional Vehicles',
    template: '%s | PSR LONDON',
  },
  description:
    "London's curated luxury automotive marketplace. Every vehicle on PSR LONDON is personally vetted by our team before it appears on the platform.",
  metadataBase: new URL('https://psr-london.vercel.app'),
  openGraph: {
    siteName: 'PSR LONDON',
    locale: 'en_GB',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-psr-black text-psr-cream">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
