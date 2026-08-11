import type { Product } from '@/components/store-provider'

export const products: Product[] = [
  {
    id: 'neem-250g',
    name: 'Fresh Neem Leaves',
    weight: '250g pack',
    price: 200,
    image: '/products/neem-250g.png',
    blurb: 'Hand-picked tender leaves, ideal for daily wellness routines.',
  },
  {
    id: 'neem-500g',
    name: 'Neem Leaf Pack',
    weight: '500g pack',
    price: 400,
    image: '/products/neem-500g.png',
    blurb: 'A generous bundle with leaves and twigs, kept farm-fresh.',
  },
  {
    id: 'neem-1kg',
    name: 'Family Neem Pack',
    weight: '1kg pack',
    price: 650,
    image: '/products/neem-1kg.png',
    blurb: 'Our largest basket — enough for the whole household.',
  },
]
