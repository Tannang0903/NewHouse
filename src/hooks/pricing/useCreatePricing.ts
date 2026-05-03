import { API_MAP, PriceType, PricingForm } from './types'

const useCreatePricing = () => {
  const createPricing = async (activeTab: PriceType, form: PricingForm) => {
    const res = await fetch(API_MAP[activeTab], {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.error || 'Có lỗi xảy ra')
    }
  }

  return { createPricing }
}

export default useCreatePricing
