export interface PriceItem {
  id: string
  label: string
  price: number
  isIncluded: boolean
  note?: string
  order: number
}

export type PriceType = 'design' | 'rough' | 'completed'

export interface PricingForm {
  label: string
  price: number
  isIncluded: boolean
  note: string
  order: number
}

export const API_MAP: Record<PriceType, string> = {
  design: '/api/pricing/design',
  rough: '/api/pricing/rough',
  completed: '/api/pricing/completed',
}
