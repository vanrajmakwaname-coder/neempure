'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'

export const UPI_ID = '9016936893@fam'
export const PAYEE_NAME = 'NeemPure'

const CART_KEY = 'neempure_cart_v3'
const ORDERS_KEY = 'neempure_orders_v3'

export type Product = {
  id: string
  name: string
  weight: string
  price: number
  image: string
  blurb: string
}

export type CartItem = {
  id: string
  name: string
  price: number
  image: string
  qty: number
}

export type Address = {
  country: string
  pincode: string
  house: string
  street: string
  landmark: string
  area: string
  city: string
  state: string
  addressType: string
}

export type Order = {
  id: string
  date: string
  name: string
  phone: string
  address: Address
  items: CartItem[]
  total: number
  status: string
}

type Toast = { id: number; message: string }

type StoreContextValue = {
  cart: CartItem[]
  orders: Order[]
  cartCount: number
  cartTotal: number
  addItem: (product: Product) => void
  increment: (id: string) => void
  decrement: (id: string) => void
  removeItem: (id: string) => void
  clearCart: () => void
  placeOrder: (details: {
    name: string
    phone: string
    address: Address
  }) => Order
  toast: (message: string) => void
  toasts: Toast[]
}

const StoreContext = createContext<StoreContextValue | null>(null)

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [toasts, setToasts] = useState<Toast[]>([])
  const [hydrated, setHydrated] = useState(false)
  const toastId = useRef(0)

  // Load persisted state after mount to avoid hydration mismatches.
  useEffect(() => {
    setCart(safeParse<CartItem[]>(localStorage.getItem(CART_KEY), []))
    setOrders(safeParse<Order[]>(localStorage.getItem(ORDERS_KEY), []))
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }, [cart, hydrated])

  useEffect(() => {
    if (hydrated) localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
  }, [orders, hydrated])

  const toast = useCallback((message: string) => {
    const id = ++toastId.current
    setToasts((prev) => [...prev, { id, message }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 2200)
  }, [])

  const addItem = useCallback(
    (product: Product) => {
      setCart((prev) => {
        const existing = prev.find((x) => x.id === product.id)
        if (existing) {
          return prev.map((x) =>
            x.id === product.id ? { ...x, qty: x.qty + 1 } : x,
          )
        }
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            qty: 1,
          },
        ]
      })
      toast(`Added ${product.name}`)
    },
    [toast],
  )

  const increment = useCallback((id: string) => {
    setCart((prev) =>
      prev.map((x) => (x.id === id ? { ...x, qty: x.qty + 1 } : x)),
    )
  }, [])

  const decrement = useCallback((id: string) => {
    setCart((prev) =>
      prev
        .map((x) => (x.id === id ? { ...x, qty: x.qty - 1 } : x))
        .filter((x) => x.qty > 0),
    )
  }, [])

  const removeItem = useCallback(
    (id: string) => {
      setCart((prev) => {
        const item = prev.find((x) => x.id === id)
        if (item) toast(`${item.name} removed`)
        return prev.filter((x) => x.id !== id)
      })
    },
    [toast],
  )

  const clearCart = useCallback(() => setCart([]), [])

  const cartCount = useMemo(
    () => cart.reduce((a, x) => a + x.qty, 0),
    [cart],
  )
  const cartTotal = useMemo(
    () => cart.reduce((a, x) => a + x.price * x.qty, 0),
    [cart],
  )

  const placeOrder = useCallback(
    (details: { name: string; phone: string; address: Address }) => {
      const total = cart.reduce((a, x) => a + x.price * x.qty, 0)
      const order: Order = {
        id: 'NP-' + Date.now().toString().slice(-8),
        date: new Date().toLocaleString(),
        name: details.name,
        phone: details.phone,
        address: details.address,
        items: cart.map((x) => ({ ...x })),
        total,
        status: 'Payment Pending',
      }
      setOrders((prev) => [order, ...prev])
      setCart([])
      return order
    },
    [cart],
  )

  const value: StoreContextValue = {
    cart,
    orders,
    cartCount,
    cartTotal,
    addItem,
    increment,
    decrement,
    removeItem,
    clearCart,
    placeOrder,
    toast,
    toasts,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}

export function buildUpiLink(total: number, orderId: string) {
  // Keep params strictly to what every UPI app accepts.
  // Payee name and note must be alphanumeric only — spaces/symbols cause
  // some apps (esp. FamPay/@fam) to reject the transaction after scanning.
  const note = ('NeemPure' + orderId).replace(/[^a-zA-Z0-9]/g, '')
  const params = new URLSearchParams({
    pa: UPI_ID,
    pn: PAYEE_NAME.replace(/[^a-zA-Z0-9]/g, ''),
    am: total.toFixed(2),
    cu: 'INR',
    tn: note,
  })
  return 'upi://pay?' + params.toString()
}
