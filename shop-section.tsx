'use client'

import Image from 'next/image'
import { ShoppingCart } from 'lucide-react'
import { products } from '@/lib/products'
import { useStore } from '@/components/store-provider'

export function ShopSection() {
  const { addItem } = useStore()

  return (
    <section id="shop" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="font-serif text-4xl font-semibold text-foreground">
          Choose your pack
        </h2>
        <p className="mt-2 text-muted-foreground">
          Tap “Add to Cart” — your cart updates instantly.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article
            key={product.id}
            className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow hover:shadow-xl hover:shadow-primary/10"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
              <Image
                src={product.image || '/placeholder.svg'}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-bold text-foreground">
                {product.weight}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-xl font-bold text-foreground">
                {product.name}
              </h3>
              <p className="mt-1 flex-1 text-sm leading-relaxed text-muted-foreground">
                {product.blurb}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-serif text-2xl font-semibold text-primary">
                  ₹{product.price}
                </span>
              </div>
              <button
                onClick={() => addItem(product)}
                className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-foreground py-3 font-bold text-background transition-transform hover:scale-[1.02]"
              >
                <ShoppingCart className="size-4" />
                Add to Cart
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
