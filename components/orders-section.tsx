'use client'

import { Package, MapPin } from 'lucide-react'
import { useStore } from '@/components/store-provider'

export function OrdersSection() {
  const { orders } = useStore()

  return (
    <section id="orders" className="scroll-mt-20 bg-secondary/50">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-serif text-4xl font-semibold text-foreground">
            My Orders
          </h2>
          <p className="mt-2 text-muted-foreground">
            Your orders are saved in this browser.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="mx-auto mt-10 max-w-lg rounded-3xl border border-dashed border-border bg-card px-6 py-14 text-center">
            <Package className="mx-auto size-12 text-muted-foreground/60" />
            <h3 className="mt-4 text-xl font-bold text-foreground">
              No orders yet
            </h3>
            <p className="mt-1 text-muted-foreground">
              Your confirmed orders will appear here.
            </p>
          </div>
        ) : (
          <div className="mx-auto mt-10 grid max-w-3xl gap-4">
            {orders.map((o) => (
              <article
                key={o.id}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-bold text-foreground">
                    Order #{o.id}
                  </span>
                  <span className="rounded-full bg-accent/25 px-3 py-1 text-xs font-extrabold text-accent-foreground">
                    {o.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{o.date}</p>

                <div className="mt-4 rounded-xl bg-secondary/60 p-4">
                  <p className="text-sm font-bold text-foreground">Items</p>
                  <ul className="mt-1 space-y-0.5 text-sm text-muted-foreground">
                    {o.items.map((x) => (
                      <li key={x.id}>
                        {x.name} × {x.qty} — ₹{x.price * x.qty}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 flex gap-2 text-sm leading-relaxed text-muted-foreground">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>
                    {o.name} · {o.phone}
                    <br />
                    {o.address.house}, {o.address.street}
                    <br />
                    Near {o.address.landmark}
                    <br />
                    {o.address.area}, {o.address.city}, {o.address.state} —{' '}
                    {o.address.pincode}
                    <br />
                    {o.address.country} · {o.address.addressType}
                  </span>
                </div>

                <div className="mt-4 border-t border-border pt-3 text-right font-bold text-foreground">
                  Total: ₹{o.total}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
