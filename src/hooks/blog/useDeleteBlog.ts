const useDeleteBlog = () => {
  const deleteBlog = async (id: string) => {
    const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' })

    if (!res.ok) {
      const d = await res.json()
      throw new Error(d.error || 'Xóa thất bại')
    }
  }

  return { deleteBlog }
}

export default useDeleteBlog
