import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Fraunces } from 'next/font/google'
import { StoreProvider } from '@/components/store-provider'
import { AuthGate } from '@/components/auth-gate'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'NeemPure | Fresh Neem Leaves Delivered',
  description:
    'Pure, hand-selected fresh neem leaves delivered to your door. Choose your pack, add to cart, and pay instantly with UPI.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#2d7a4b',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${fraunces.variable} bg-background`}>
      <body className="font-sans antialiased">
        <StoreProvider>
          <AuthGate>{children}</AuthGate>
        </StoreProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
