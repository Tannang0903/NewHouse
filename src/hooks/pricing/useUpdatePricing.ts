import { API_MAP, PriceType, PricingForm } from './types'

const useUpdatePricing = () => {
  const updatePricing = async (activeTab: PriceType, id: string, form: Partial<PricingForm>) => {
    const res = await fetch(`${API_MAP[activeTab]}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.error || 'Cập nhật thất bại')
    }
  }

  return { updatePricing }
}

export default useUpdatePricing
