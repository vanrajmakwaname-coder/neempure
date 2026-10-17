'use client'

import { useState } from 'react'
import { Copy, Check, ShieldCheck } from 'lucide-react'

type Order = {
  id: string
  total: number
}

export function UpiPayment({ order }: { order: Order }) {
  const [copied, setCopied] = useState(false)
  const UPI_ID = '9016936893@fam'
  const amount = order.total.toFixed(2)

  const copyUpi = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // Clipboard unavailable
    }
  }

  return (
    <div className="mx-auto h-max w-full max-w-[420px] rounded-2xl bg-foreground p-5 text-background shadow-lg sm:p-6">
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-wider text-accent">Secure UPI Payment</p>
        <h2 className="mt-1 text-2xl font-semibold">Scan &amp; Pay</h2>
        <p className="mt-2 text-sm text-background/75">Complete your payment using an Indian UPI app.</p>
      </div>

      <div className="mx-auto mt-5 w-full max-w-[280px] rounded-2xl bg-white p-3">
        <img
          src="/fampay-qr.jpeg"
          alt="NeemPure UPI payment QR code"
          className="block w-full rounded-lg"
        />
      </div>

      <div className="mt-4 rounded-xl bg-background/10 p-4 text-center">
        <p className="text-sm text-background/70">Amount to pay</p>
        <p className="mt-1 text-3xl font-bold">₹{amount}</p>
        <p className="mt-2 text-xs text-background/70">Order {order.id}</p>
      </div>

      <button
        type="button"
        onClick={copyUpi}
        className="mx-auto mt-3 flex items-center gap-2 rounded-lg bg-background/10 px-3 py-2 text-sm font-bold"
      >
        {UPI_ID}
        {copied ? <Check className="size-4 text-accent" /> : <Copy className="size-4" />}
        <span className="sr-only">{copied ? 'UPI ID copied' : 'Copy UPI ID'}</span>
      </button>

      <a
        href={`upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=NeemPure&am=${encodeURIComponent(amount)}&cu=INR&tn=${encodeURIComponent('NeemPure Order ' + order.id)}`}
        className="mt-4 flex items-center justify-center rounded-xl bg-accent py-3.5 font-bold text-accent-foreground transition-opacity hover:opacity-90"
      >
        Open UPI App
      </a>

      <div className="mt-4 rounded-xl bg-background/10 p-4 text-sm">
        <p className="font-bold">How to pay</p>
        <p className="mt-1 text-background/75">Open Google Pay, PhonePe, Paytm, or another UPI app. Pay the exact amount shown above.</p>
      </div>

      <div className="mt-4 flex gap-3 rounded-xl border border-accent/30 bg-background/5 p-4 text-left">
        <ShieldCheck className="mt-0.5 size-5 shrink-0 text-accent" />
        <div>
          <p className="font-bold">Payment confirmation</p>
          <p className="mt-1 text-sm text-background/75">Keep your UPI confirmation or transaction ID. This page cannot verify payment automatically, so your order remains pending until the payment is checked.</p>
        </div>
      </div>
    </div>
  )
}
