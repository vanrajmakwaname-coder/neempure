'use client'

import Image from 'next/image'
import { Leaf, ShieldCheck, Truck } from 'lucide-react'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-secondary via-background to-background" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1.5 text-sm font-bold text-primary">
            <Leaf className="size-4" />
            100% Fresh · Carefully Selected
          </span>
          <h1 className="mt-5 text-balance font-serif text-5xl font-semibold leading-[0.98] tracking-tight text-foreground md:text-7xl">
            Pure neem leaves, delivered fresh.
          </h1>
          <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            Choose your pack, add it to your cart, adjust anything you need, and
            pay directly with UPI. Simple, fresh and natural.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              onClick={() => scrollTo('shop')}
              className="rounded-xl bg-primary px-6 py-3.5 font-bold text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              Shop Now
            </button>
            <button
              onClick={() => scrollTo('cart')}
              className="rounded-xl border border-border bg-card px-6 py-3.5 font-bold text-foreground transition-colors hover:border-primary/40"
            >
              View Cart
            </button>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-foreground/70">
            <span className="flex items-center gap-2">
              <Truck className="size-4 text-primary" /> Free delivery
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-primary" /> Quality checked
            </span>
            <span className="flex items-center gap-2">
              <Leaf className="size-4 text-primary" /> Naturally grown
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-border shadow-2xl shadow-primary/10">
            <Image
              src="/neem-hero.png"
              alt="Fresh green neem leaves with morning dew"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
          <div className="absolute -bottom-5 left-6 rounded-2xl border border-border bg-card px-5 py-4 shadow-xl">
            <p className="font-serif text-3xl font-semibold text-primary">
              12k+
            </p>
            <p className="text-sm font-medium text-muted-foreground">
              Fresh packs delivered
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
