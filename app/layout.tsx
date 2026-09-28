import type { Metadata, Viewport } from 'next'
import { Newsreader, Courier_Prime, La_Belle_Aurore } from 'next/font/google'
import './globals.css'

const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  display: 'swap',
  variable: '--font-newsreader',
})

const courier = Courier_Prime({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-courier',
})

const hand = La_Belle_Aurore({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-hand',
})

export const metadata: Metadata = {
  // Set NEXT_PUBLIC_SITE_URL to the deployed origin so social previews resolve.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: 'Anthony Fernandes, an open book',
  description:
    'The portfolio of Anthony Fernandes, product designer with a knack for management, told as a short book.',
  openGraph: {
    title: 'Anthony Fernandes, an open book',
    description:
      'The portfolio of Anthony Fernandes, product designer with a knack for management, told as a short book.',
    images: [`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/og-image.jpg`],
  },
}

export const viewport: Viewport = {
  themeColor: '#2E2D2A',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${courier.variable} ${hand.variable}`}>
      <body>{children}</body>
    </html>
  )
}
