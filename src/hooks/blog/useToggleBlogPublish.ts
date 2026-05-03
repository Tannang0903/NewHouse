import { Blog } from './types'

const useToggleBlogPublish = () => {
  const togglePublish = async (blog: Blog) => {
    const res = await fetch(`/api/blog/${blog.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isPublished: !blog.isPublished }),
    })

    if (!res.ok) {
      const d = await res.json()
      throw new Error(d.error || 'Cập nhật trạng thái thất bại')
    }
  }

  return { togglePublish }
}

export default useToggleBlogPublish
