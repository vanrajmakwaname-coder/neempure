'use client'

import { useState } from 'react'
import { Leaf } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { HeroSection } from '@/components/hero-section'
import { ShopSection } from '@/components/shop-section'
import { CartSection } from '@/components/cart-section'
import { CheckoutSection } from '@/components/checkout-section'
import { OrdersSection } from '@/components/orders-section'
import { Toaster } from '@/components/toaster'
import { useStore } from '@/components/store-provider'

export default function Page() {
  const { cart, toast } = useStore()
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  const openCheckout = () => {
    if (!cart.length) {
      toast('Your cart is empty')
      return
    }
    setCheckoutOpen(true)
    requestAnimationFrame(() => {
      document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' })
    })
  }

  const closeCheckout = () => {
    setCheckoutOpen(false)
    document.getElementById('cart')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <HeroSection />
      <ShopSection />
      <CartSection onCheckout={openCheckout} />
      {checkoutOpen && <CheckoutSection onCancel={closeCheckout} />}
      <OrdersSection />

      <footer className="bg-primary py-10 text-center text-primary-foreground">
        <p className="flex items-center justify-center gap-2 font-serif text-2xl font-semibold">
          <Leaf className="size-6" />
          NeemPure
        </p>
        <p className="mt-1 text-primary-foreground/80">
          Pure neem leaves. Simple. Fresh. Natural.
        </p>
      </footer>

      <Toaster />
    </main>
  )
}
