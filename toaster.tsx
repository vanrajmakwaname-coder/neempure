'use client'

import { Check } from 'lucide-react'
import { useStore } from '@/components/store-provider'

export function Toaster() {
  const { toasts } = useStore()

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-50 flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="flex items-center gap-2 rounded-xl bg-foreground px-4 py-3 text-sm font-bold text-background shadow-lg"
        >
          <Check className="size-4 text-accent" />
          {t.message}
        </div>
      ))}
    </div>
  )
}
