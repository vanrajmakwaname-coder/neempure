'use client'

import { Leaf, ShoppingCart, Package } from 'lucide-react'
import { useStore } from '@/components/store-provider'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function SiteHeader() {
  const { cartCount } = useStore()

  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <button
          onClick={() => scrollTo('top')}
          className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-foreground"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Leaf className="size-5" />
          </span>
          Neem<span className="text-primary">Pure</span>
        </button>

        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => scrollTo('shop')}
            className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:text-primary sm:block"
          >
            Shop
          </button>
          <button
            onClick={() => scrollTo('orders')}
            className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:text-primary sm:flex"
          >
            <Package className="size-4" />
            My Orders
          </button>
          <button
            onClick={() => scrollTo('cart')}
            className="flex items-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-bold text-background transition-transform hover:scale-[1.02]"
          >
            <ShoppingCart className="size-4" />
            Cart
            <span className="flex min-w-6 items-center justify-center rounded-full bg-accent px-1.5 text-xs font-extrabold text-accent-foreground">
              {cartCount}
            </span>
          </button>
        </nav>
      </div>
    </header>
  )
}
