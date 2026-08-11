'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { countries } from '@/lib/countries'
import { useStore, type Address, type Order } from '@/components/store-provider'
import { UpiPayment } from '@/components/upi-payment'

const emptyForm = {
  name: '',
  phone: '',
  country: '',
  pincode: '',
  house: '',
  street: '',
  landmark: '',
  area: '',
  city: '',
  state: '',
  addressType: 'Home',
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function CheckoutSection({ onCancel }: { onCancel: () => void }) {
  const { cart, cartTotal, placeOrder, toast } = useStore()
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')
  const [order, setOrder] = useState<Order | null>(null)

  const set = (key: keyof typeof form) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }))

  const confirm = () => {
    const required: (keyof typeof form)[] = [
      'name',
      'phone',
      'country',
      'pincode',
      'house',
      'street',
      'landmark',
      'area',
      'city',
      'state',
    ]
    if (required.some((k) => !form[k].trim())) {
      setError('Please fill in all delivery and address details.')
      return
    }
    if (!/^[0-9]{10}$/.test(form.phone.trim())) {
      setError('Enter a valid 10-digit mobile number.')
      return
    }
    if (!/^[0-9A-Za-z -]{4,10}$/.test(form.pincode.trim())) {
      setError('Enter a valid PIN / postal code.')
      return
    }
    if (cartTotal <= 0) {
      setError('Your cart total is ₹0. Return to cart and add a product.')
      return
    }

    setError('')
    const address: Address = {
      country: form.country,
      pincode: form.pincode.trim(),
      house: form.house.trim(),
      street: form.street.trim(),
      landmark: form.landmark.trim(),
      area: form.area.trim(),
      city: form.city.trim(),
      state: form.state.trim(),
      addressType: form.addressType,
    }
    const created = placeOrder({
      name: form.name.trim(),
      phone: form.phone.trim(),
      address,
    })
    setOrder(created)
    toast('Order created — opening UPI')
  }

  const total = order ? order.total : cartTotal

  return (
    <section id="checkout" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-serif text-4xl font-semibold text-foreground">
            Checkout &amp; Payment
          </h2>
          <p className="mt-2 text-muted-foreground">
            Enter your delivery details, then pay securely with UPI.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="rounded-3xl border border-border bg-card p-6">
            <h3 className="text-lg font-bold text-foreground">
              Delivery Details
            </h3>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Full Name">
                <input
                  className={inputCls}
                  placeholder="Enter your name"
                  value={form.name}
                  disabled={!!order}
                  onChange={(e) => set('name')(e.target.value)}
                />
              </Field>
              <Field label="Mobile Number">
                <input
                  className={inputCls}
                  inputMode="numeric"
                  placeholder="10-digit mobile number"
                  value={form.phone}
                  disabled={!!order}
                  onChange={(e) => set('phone')(e.target.value)}
                />
              </Field>
            </div>

            <h3 className="mt-6 text-lg font-bold text-foreground">
              Delivery Address
            </h3>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Country">
                <select
                  className={inputCls}
                  value={form.country}
                  disabled={!!order}
                  onChange={(e) => set('country')(e.target.value)}
                >
                  <option value="">Select country</option>
                  {countries.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="PIN / Postal Code">
                <input
                  className={inputCls}
                  placeholder="e.g. 380001"
                  value={form.pincode}
                  disabled={!!order}
                  onChange={(e) => set('pincode')(e.target.value)}
                />
              </Field>
            </div>

            <div className="mt-4">
              <Field label="House / Flat / Building No.">
                <input
                  className={inputCls}
                  placeholder="e.g. House No. 24, Flat 302"
                  value={form.house}
                  disabled={!!order}
                  onChange={(e) => set('house')(e.target.value)}
                />
              </Field>
            </div>

            <div className="mt-4">
              <Field label="Street / Road">
                <input
                  className={inputCls}
                  placeholder="e.g. MG Road"
                  value={form.street}
                  disabled={!!order}
                  onChange={(e) => set('street')(e.target.value)}
                />
              </Field>
            </div>

            <div className="mt-4">
              <Field label="Nearby Street / Landmark">
                <input
                  className={inputCls}
                  placeholder="e.g. Near City Mall"
                  value={form.landmark}
                  disabled={!!order}
                  onChange={(e) => set('landmark')(e.target.value)}
                />
              </Field>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Area / Locality">
                <input
                  className={inputCls}
                  placeholder="e.g. Andheri West"
                  value={form.area}
                  disabled={!!order}
                  onChange={(e) => set('area')(e.target.value)}
                />
              </Field>
              <Field label="City">
                <input
                  className={inputCls}
                  placeholder="e.g. Mumbai"
                  value={form.city}
                  disabled={!!order}
                  onChange={(e) => set('city')(e.target.value)}
                />
              </Field>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="State / Province">
                <input
                  className={inputCls}
                  placeholder="e.g. Maharashtra"
                  value={form.state}
                  disabled={!!order}
                  onChange={(e) => set('state')(e.target.value)}
                />
              </Field>
              <Field label="Address Type">
                <select
                  className={inputCls}
                  value={form.addressType}
                  disabled={!!order}
                  onChange={(e) => set('addressType')(e.target.value)}
                >
                  <option value="Home">Home</option>
                  <option value="Office">Office</option>
                  <option value="Other">Other</option>
                </select>
              </Field>
            </div>

            {error && (
              <p className="mt-4 font-bold text-destructive">{error}</p>
            )}

            {!order ? (
              <>
                <button
                  onClick={confirm}
                  className="mt-5 w-full rounded-xl bg-primary py-3.5 font-bold text-primary-foreground transition-transform hover:scale-[1.01]"
                >
                  Confirm Order &amp; Open UPI · ₹{cartTotal}
                </button>
                <button
                  onClick={onCancel}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background py-3 font-bold text-foreground"
                >
                  <X className="size-4" />
                  Cancel Payment
                </button>
              </>
            ) : (
              <button
                onClick={() => scrollTo('orders')}
                className="mt-5 w-full rounded-xl border border-border bg-background py-3 font-bold text-foreground"
              >
                View My Orders
              </button>
            )}
          </div>

          {order ? (
            <UpiPayment order={order} />
          ) : (
            <div className="h-max rounded-3xl border border-border bg-card p-6 text-center">
              <h3 className="text-lg font-bold text-foreground">Payment</h3>
              <p className="mt-3 text-muted-foreground">
                Your UPI QR code and payment options will appear here once you
                confirm your order.
              </p>
              <div className="mt-5 rounded-2xl border border-dashed border-border bg-secondary/50 py-12 text-sm font-semibold text-muted-foreground">
                Amount due: ₹{cart.length ? cartTotal : 0}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

const inputCls =
  'w-full rounded-xl border border-input bg-background px-3.5 py-3 text-foreground outline-none transition-colors focus:border-primary disabled:opacity-60'

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-bold text-foreground">
        {label}
      </span>
      {children}
    </label>
  )
}
