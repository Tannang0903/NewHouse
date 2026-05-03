import { BlogForm } from './types'

const useUpdateBlog = () => {
  const updateBlog = async (id: string, form: Partial<BlogForm>) => {
    const res = await fetch(`/api/blog/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (!res.ok) {
      const d = await res.json()
      throw new Error(d.error || 'Cập nhật thất bại')
    }
  }

  return { updateBlog }
}

export default useUpdateBlog
