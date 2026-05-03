import { BlogDetail } from './types'

const useGetBlogDetail = () => {
  const getBlogDetail = async (id: string) => {
    const res = await fetch(`/api/blog/${id}`)
    if (!res.ok) throw new Error('Không thể tải chi tiết bài viết')
    return (await res.json()) as BlogDetail
  }

  return { getBlogDetail }
}

export default useGetBlogDetail
