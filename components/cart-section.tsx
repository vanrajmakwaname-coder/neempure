'use client'

import Image from 'next/image'
import { Minus, Plus, Trash2, ShoppingBag, CreditCard } from 'lucide-react'
import { useStore } from '@/components/store-provider'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function CartSection({ onCheckout }: { onCheckout: () => void }) {
  const { cart, cartTotal, increment, decrement, removeItem } = useStore()

  return (
    <section id="cart" className="scroll-mt-20 bg-secondary/50">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-serif text-4xl font-semibold text-foreground">
            Your Cart
          </h2>
          <p className="mt-2 text-muted-foreground">
            Adjust quantities, remove items, or continue to payment.
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="mx-auto mt-10 max-w-lg rounded-3xl border border-dashed border-border bg-card px-6 py-14 text-center">
            <ShoppingBag className="mx-auto size-12 text-muted-foreground/60" />
            <h3 className="mt-4 text-xl font-bold text-foreground">
              Your cart is empty
            </h3>
            <p className="mt-1 text-muted-foreground">
              Add a product above and it will appear here.
            </p>
            <button
              onClick={() => scrollTo('shop')}
              className="mt-5 rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <div className="flex flex-col gap-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-card p-4"
                >
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-secondary">
                    <Image
                      src={item.image || '/placeholder.svg'}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="min-w-40 flex-1">
                    <p className="font-bold text-foreground">{item.name}</p>
                    <p className="text-sm font-semibold text-primary">
                      ₹{item.price} each
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      aria-label={`Decrease ${item.name}`}
                      onClick={() => decrement(item.id)}
                      className="flex size-9 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-colors hover:border-primary/40"
                    >
                      <Minus className="size-4" />
                    </button>
                    <span className="w-6 text-center font-bold text-foreground">
                      {item.qty}
                    </span>
                    <button
                      aria-label={`Increase ${item.name}`}
                      onClick={() => increment(item.id)}
                      className="flex size-9 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-colors hover:border-primary/40"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>

                  <span className="w-16 text-right font-bold text-foreground">
                    ₹{item.price * item.qty}
                  </span>

                  <button
                    aria-label={`Remove ${item.name}`}
                    onClick={() => removeItem(item.id)}
                    className="flex items-center gap-1.5 rounded-lg bg-destructive/10 px-3 py-2 text-sm font-bold text-destructive transition-colors hover:bg-destructive/15"
                  >
                    <Trash2 className="size-4" />
                    <span className="hidden sm:inline">Remove</span>
                  </button>
                </div>
              ))}
            </div>

            <div className="h-max rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-24">
              <h3 className="text-lg font-bold text-foreground">
                Order Summary
              </h3>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-bold text-foreground">₹{cartTotal}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Delivery</span>
                <span className="font-bold text-primary">FREE</span>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <span className="text-lg font-bold text-foreground">Total</span>
                <span className="font-serif text-2xl font-semibold text-foreground">
                  ₹{cartTotal}
                </span>
              </div>
              <button
                onClick={onCheckout}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-bold text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                <CreditCard className="size-4" />
                Pay Now
              </button>
              <button
                onClick={() => scrollTo('shop')}
                className="mt-3 w-full rounded-xl border border-border bg-background py-3 font-bold text-foreground transition-colors hover:border-primary/40"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
