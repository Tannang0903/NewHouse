import { BlogForm } from './types'

const useCreateBlog = () => {
  const createBlog = async (form: BlogForm) => {
    const res = await fetch('/api/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (!res.ok) {
      const d = await res.json()
      throw new Error(d.error || 'Có lỗi xảy ra')
    }
  }

  return { createBlog }
}

export default useCreateBlog
