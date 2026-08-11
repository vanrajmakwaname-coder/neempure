'use client'

import { useState } from 'react'
import { Copy, Check, ShieldCheck, XCircle } from 'lucide-react'

type Order = {
  id: string
  total: number
}

export function UpiPayment({ order }: { order: Order }) {
  const [copied, setCopied] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<
    'pending' | 'success' | 'failed'
  >('pending')

  const UPI_ID = '9016936893@fam'
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

  const simulateSuccess = () => {
    setPaymentStatus('success')
  }

  const simulateFailure = () => {
    setPaymentStatus('failed')
  }

  const resetPayment = () => {
    setPaymentStatus('pending')
  }

  return (
    <div className="mx-auto w-full max-w-[420px] rounded-2xl bg-background p-4 shadow-lg">
      <div className="text-center">
        <p className="text-sm font-bold text-accent">UPI PAYMENT</p>

        <h2 className="mt-1 text-2xl font-semibold">
          {paymentStatus === 'success'
            ? 'Payment Successful'
            : paymentStatus === 'failed'
              ? 'Payment Failed'
              : 'Scan & Pay'}
        </h2>
      </div>

      {paymentStatus === 'pending' && (
        <>
          {/* Existing FamPay QR */}
          <div className="mx-auto mt-5 w-full max-w-[280px] rounded-2xl bg-white p-3">
            <img
              src="/fampay-qr.jpeg"
              alt="NeemPure FamPay payment QR"
              className="block w-full rounded-lg"
            />
          </div>

          <p className="mt-3 text-center text-sm text-background/70">
            Scan this QR and pay the exact total of{' '}
            <span className="font-bold">₹{amount}</span>
          </p>

          <button
            type="button"
            onClick={copyUpi}
            className="mx-auto mt-2 flex items-center gap-2 rounded-lg bg-background/10 px-3 py-2 text-sm font-bold"
          >
            {UPI_ID}

            {copied ? (
              <Check className="size-4" />
            ) : (
              <Copy className="size-4" />
            )}
          </button>

          <div className="mt-4 rounded-xl bg-background/10 p-3 text-sm">
            <b>Order {order.id} created</b>

            <br />

            <span className="text-background/70">
              Scan the QR with Google Pay, PhonePe, Paytm, or another
              supported UPI app.
            </span>
          </div>

          {/* TEST PAYMENT CONTROLS */}
          <div className="mt-4 rounded-xl border border-yellow-400/30 bg-yellow-400/10 p-4">
            <p className="text-sm font-bold">
              TEST PAYMENT MODE
            </p>

            <p className="mt-1 text-xs text-background/70">
              These buttons simulate payment results. No real money is
              transferred.
            </p>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={simulateSuccess}
                className="rounded-lg bg-green-600 px-3 py-2 text-sm font-bold text-white"
              >
                Test Success
              </button>

              <button
                type="button"
                onClick={simulateFailure}
                className="rounded-lg bg-red-600 px-3 py-2 text-sm font-bold text-white"
              >
                Test Failure
              </button>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-secondary p-4 text-left text-sm">
            <p className="font-bold">How to pay</p>

            <p className="mt-1 text-muted-foreground">
              Open Google Pay, PhonePe, Paytm, or another supported UPI app
              on your phone and scan the QR above.
            </p>
          </div>
        </>
      )}

      {paymentStatus === 'success' && (
        <div className="mt-6 rounded-2xl bg-green-500/10 p-6 text-center">
          <ShieldCheck className="mx-auto size-16 text-green-600" />

          <h3 className="mt-4 text-xl font-bold">
            Payment Successful
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Test payment of ₹{amount} was successful.
          </p>

          <p className="mt-2 text-xs text-muted-foreground">
            Order {order.id}
          </p>

          <button
            type="button"
            onClick={resetPayment}
            className="mt-5 rounded-lg bg-background px-4 py-2 text-sm font-bold"
          >
            Test Again
          </button>
        </div>
      )}

      {paymentStatus === 'failed' && (
        <div className="mt-6 rounded-2xl bg-red-500/10 p-6 text-center">
          <XCircle className="mx-auto size-16 text-red-600" />

          <h3 className="mt-4 text-xl font-bold">
            Payment Failed
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            The test payment was unsuccessful.
          </p>

          <button
            type="button"
            onClick={resetPayment}
            className="mt-5 rounded-lg bg-background px-4 py-2 text-sm font-bold"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  )
}
