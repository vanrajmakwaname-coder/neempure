'use client'

import { useState } from 'react'
import { Copy, Check, Clock, XCircle } from 'lucide-react'
import {
  UPI_ID,
  type Order,
} from '@/components/store-provider'

type PaymentStatus = 'idle' | 'pending' | 'failed'

export function UpiPayment({ order }: { order: Order }) {
  const [copied, setCopied] = useState(false)
  const [paymentStatus, setPaymentStatus] =
    useState<PaymentStatus>('idle')

  const amount = order.total.toFixed(2)

  const copyUpi = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID)
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 1600)
    } catch {
      // Clipboard unavailable
    }
  }

  const reportPayment = () => {
    setPaymentStatus('pending')
  }

  const resetPayment = () => {
    setPaymentStatus('idle')
  }

  return (
    <div className="mx-auto mt-5 w-full max-w-[320px] rounded-2xl bg-background p-3">
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-wide text-accent">
          UPI PAYMENT
        </p>

        <h3 className="mt-1 text-2xl font-semibold">
          Scan &amp; Pay
        </h3>

        <div className="mx-auto mt-5 w-full max-w-[280px] rounded-2xl bg-card p-3">
          <img
            src="/fampay-qr.jpeg"
            alt="Neempure FamPay payment QR"
            className="block w-full rounded-xl"
          />
        </div>

        <p className="mt-3 text-sm text-background/70">
          Scan this QR and pay the exact total of{' '}
          <span className="font-bold text-background">
            ₹{amount}
          </span>
        </p>

        <button
          type="button"
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

        {paymentStatus === 'idle' && (
          <>
            <button
              type="button"
              onClick={reportPayment}
              className="mx-auto mt-4 block w-full rounded-xl bg-accent px-4 py-3 font-bold text-white"
            >
              I Have Paid
            </button>

            <p className="mt-2 text-xs text-background/60">
              After completing your UPI payment, tap the button above.
            </p>
          </>
        )}

        {paymentStatus === 'pending' && (
          <div className="mt-4 rounded-xl bg-background/10 p-4 text-left">
            <div className="flex items-center gap-2 font-bold">
              <Clock className="size-5" />
              Payment Verification Pending
            </div>

            <p className="mt-2 text-sm text-background/70">
              Your payment has been reported. The payment must be
              verified by the payment provider before this order can
              be marked as paid.
            </p>

            <button
              type="button"
              onClick={resetPayment}
              className="mt-3 rounded-lg bg-background/10 px-3 py-2 text-sm font-semibold"
            >
              Back
            </button>
          </div>
        )}

        {paymentStatus === 'failed' && (
          <div className="mt-4 rounded-xl bg-background/10 p-4 text-left">
            <div className="flex items-center gap-2 font-bold">
              <XCircle className="size-5" />
              Payment Failed
            </div>

            <p className="mt-2 text-sm text-background/70">
              The payment could not be verified. Please try again.
            </p>

            <button
              type="button"
              onClick={resetPayment}
              className="mt-3 rounded-lg bg-background/10 px-3 py-2 text-sm font-semibold"
            >
              Try Again
            </button>
          </div>
        )}

        <div className="mt-4 rounded-xl bg-background/10 p-3 text-left text-sm">
          <b>Order {order.id} created</b>

          <p className="mt-1 text-background/70">
            Scan the QR with Google Pay, PhonePe, Paytm, or another
            supported UPI app.
          </p>
        </div>

        <div className="mt-4 rounded-xl bg-secondary p-4 text-left">
          <p className="font-bold">How to pay</p>

          <p className="mt-1 text-sm text-muted-foreground">
            Open Google Pay, PhonePe, Paytm, or another supported UPI
            app on your phone and scan the FamPay QR above.
          </p>
        </div>
      </div>
    </div>
  )
}
