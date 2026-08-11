'use client'

import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { Smartphone, Copy, Check, QrCode } from 'lucide-react'
import {
  UPI_ID,
  buildUpiLink,
  type Order,
} from '@/components/store-provider'

function encode(v: string) {
  return encodeURIComponent(v)
}

export function UpiPayment({ order }: { order: Order }) {
  const [qrDataUrl, setQrDataUrl] = useState<string>('')
  const [copied, setCopied] = useState(false)
  const [showFallback, setShowFallback] = useState(false)

  const amount = order.total.toFixed(2)
  const note = 'NeemPure Order ' + order.id
  const upiLink = buildUpiLink(order.total, order.id)

  // Generate the dynamic QR encoding the exact UPI payment request.
  useEffect(() => {
    QRCode.toDataURL(upiLink, {
      width: 320,
      margin: 2,
      color: { dark: '#103b29', light: '#ffffff' },
    })
      .then(setQrDataUrl)
      .catch(() => setQrDataUrl(''))
  }, [upiLink])

  // Attempt to open a UPI app; reveal per-app fallbacks if nothing switches away.
  useEffect(() => {
    const timer = setTimeout(() => setShowFallback(true), 1400)
    const a = document.createElement('a')
    a.href = upiLink
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    return () => {
      clearTimeout(timer)
      a.remove()
    }
  }, [upiLink])

  const gpay =
    'intent://upi/pay?pa=' +
    encode(UPI_ID) +
    '&pn=NeemPure&am=' +
    encode(amount) +
    '&cu=INR&tn=' +
    encode(note) +
    '#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;end'
  const phonepe =
    'phonepe://pay?pa=' +
    encode(UPI_ID) +
    '&pn=NeemPure&am=' +
    encode(amount) +
    '&cu=INR&tn=' +
    encode(note)
  const paytm =
    'paytmmp://pay?pa=' +
    encode(UPI_ID) +
    '&pn=NeemPure&am=' +
    encode(amount) +
    '&cu=INR&tn=' +
    encode(note)

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
        {qrDataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={qrDataUrl || '/placeholder.svg'}
            alt={`UPI payment QR for ₹${amount}`}
            className="block w-full rounded-lg"
          />
        ) : (
          <div className="flex aspect-square items-center justify-center text-muted-foreground">
            <QrCode className="size-10" />
          </div>
        )}
      </div>

      <p className="mt-3 text-sm text-background/70">
        Pay the exact total of{' '}
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

      <a
        href={upiLink}
        className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-accent py-3.5 font-bold text-accent-foreground"
      >
        <Smartphone className="size-4" />
        Pay Now with UPI App
      </a>

      <div className="mt-4 rounded-xl bg-background/10 p-3 text-sm">
        <b>Order {order.id} created</b>
        <br />
        <span className="text-background/70">
          {showFallback
            ? 'If your UPI app did not open, tap an app below or scan the QR.'
            : 'Trying to open your UPI app…'}
        </span>
      </div>

      {showFallback && (
        <div className="mt-4 rounded-xl bg-secondary p-4 text-left text-secondary-foreground">
          <p className="mb-2 text-xs text-muted-foreground">
            On a computer? UPI apps can&apos;t open there — scan the QR with your
            phone instead.
          </p>
          <p className="font-bold">Choose your payment app</p>
          <div className="mt-3 grid gap-2">
            <a
              href={gpay}
              className="rounded-lg border border-border bg-card py-2.5 text-center font-bold text-foreground"
            >
              Open Google Pay
            </a>
            <a
              href={phonepe}
              className="rounded-lg border border-border bg-card py-2.5 text-center font-bold text-foreground"
            >
              Open PhonePe
            </a>
            <a
              href={paytm}
              className="rounded-lg border border-border bg-card py-2.5 text-center font-bold text-foreground"
            >
              Open Paytm
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
