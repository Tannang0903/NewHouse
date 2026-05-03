import { useCallback, useEffect, useState } from 'react'
import { Blog } from './types'

const useGetBlog = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')

  const refetch = useCallback(async () => {
    setLoading(true)
    setFetchError('')
    try {
      const res = await fetch('/api/blog')
      if (!res.ok) {
        const data = await res.json()
        setFetchError(data.error || 'Không thể tải danh sách bài viết')
        setBlogs([])
        return
      }
      const data = await res.json()
      setBlogs(Array.isArray(data) ? data : [])
    } catch {
      setFetchError('Không thể tải danh sách bài viết')
      setBlogs([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refetch()
  }, [refetch])

  return { blogs, loading, fetchError, setFetchError, refetch }
}

export default useGetBlog
