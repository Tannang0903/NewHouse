import { API_MAP, PriceType } from './types'

const useDeletePricing = () => {
  const deletePricing = async (activeTab: PriceType, id: string) => {
    const res = await fetch(`${API_MAP[activeTab]}/${id}`, { method: 'DELETE' })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.error || 'Xóa thất bại')
    }
  }

  return { deletePricing }
}

export default useDeletePricing
