'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import {
  UPI_ID,
  type Order,
} from '@/components/store-provider'


export function UpiPayment({ order }: { order: Order }) {
  const [copied, setCopied] = useState(false)

  const amount = order.total.toFixed(2)
  const copyUpi = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="h-max rounded-3xl bg-foreground p-6 text-center text-background shadow-xl">
      <p className="text-sm font-extrabold uppercase tracking-wide text-accent">
        UPI Payment
      </p>
      <h3 className="mt-1 font-serif text-2xl font-semibold">Scan &amp; Pay</h3>

      <div className="mx-auto mt-5 w-full max-w-[280px] rounded-2xl bg-card p-3">
        {/* Official FamPay QR supplied for NeemPure payments. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/fampay-qr.jpeg"
          alt="NeemPure FamPay payment QR"
          className="block w-full rounded-lg"
        />
      </div>

      <p className="mt-3 text-sm text-background/70">
        Scan this QR and pay the exact total of{' '}
        <span className="font-bold text-background">₹{amount}</span>
      </p>

      <button
        onClick={copyUpi}
        className="mx-auto mt-2 flex items-center gap-2 rounded-lg bg-background/10 px-3 py-2 text-sm font-bold"
      >
        {UPI_ID}
        {copied ? (
          <Check className="size-4 text-accent" />
        ) : (
          <Copy className="size-4" />
        )}
      </button>


      <div className="mt-4 rounded-xl bg-background/10 p-3 text-sm">
        <b>Order {order.id} created</b>
        <br />
        <span className="text-background/70">
          Scan the QR with Google Pay, PhonePe, Paytm, or another supported UPI app.
        </span>
      </div>

      <div className="mt-4 rounded-xl bg-secondary p-4 text-left text-secondary-foreground">
        <p className="font-bold">How to pay</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Open Google Pay, PhonePe, Paytm, or another supported UPI app on your phone
          and scan the FamPay QR above.
        </p>
      </div>
    </div>
  )
}
