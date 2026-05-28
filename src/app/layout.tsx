import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Toaster } from 'react-hot-toast'
import { GoogleConsentMode, GoogleConsentUpdate } from '@/components/ads/google-consent'
import { CookieConsent } from '@/components/ads/cookie-consent'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CodePro - Learn to Code from Zero to Hero',
  description: 'Master HTML, CSS, JavaScript, and Python with interactive tutorials, real-world projects, and a built-in code playground.',
  other: {
    'google-adsense-account': 'ca-pub-5862355594319303',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-950 text-gray-100 antialiased`}>
        <GoogleConsentMode />

        {process.env.NEXT_PUBLIC_ADSENSE_ID && (
          <>
            <Script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
              crossOrigin="anonymous"
              strategy="afterInteractive"
            />
            <GoogleConsentUpdate />
          </>
        )}

        <CookieConsent />

        <Navbar />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1f2937',
              color: '#f3f4f6',
              border: '1px solid #374151',
            },
          }}
        />
      </body>
    </html>
  )
}
