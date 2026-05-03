import { useCallback, useEffect, useState } from 'react'
import { API_MAP, PriceItem, PriceType } from './types'

const useGetPricing = () => {
  const [activeTab, setActiveTab] = useState<PriceType>('design')
  const [items, setItems] = useState<PriceItem[]>([])
  const [loading, setLoading] = useState(true)

  const refetch = useCallback(
    async (signal?: AbortSignal) => {
      setLoading(true)
      try {
        const res = await fetch(API_MAP[activeTab], { signal })
        if (!res.ok) {
          if (!signal?.aborted) setItems([])
          return
        }
        const data = await res.json()
        if (!signal?.aborted) setItems(Array.isArray(data) ? data : [])
      } catch {
        if (!signal?.aborted) setItems([])
      } finally {
        if (!signal?.aborted) setLoading(false)
      }
    },
    [activeTab]
  )

  useEffect(() => {
    const controller = new AbortController()
    refetch(controller.signal)
    return () => controller.abort()
  }, [refetch])

  return { activeTab, setActiveTab, items, loading, refetch }
}

export default useGetPricing
