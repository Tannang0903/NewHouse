import Link from 'next/link'
import Image from 'next/image'
import { getPublishedBlogs } from '@/lib/api'
import { routes } from '@/constants/routes'

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  const blogs = await getPublishedBlogs()

  return (
    <div className='bg-black min-h-screen pt-[100px] pb-16 px-4'>
      <div className='max-w-[1200px] mx-auto'>
        <h1 className='text-3xl font-bold text-[#FFBA00] mb-2 text-center'>Blog NewHouse</h1>
        <p className='text-gray-300 text-center mb-10'>Kiến thức xây dựng, kinh nghiệm thiết kế và thi công thực tế</p>

        {blogs.length === 0 ? (
          <div className='text-center py-20 text-gray-400'>Chưa có bài viết nào</div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {blogs.map((blog) => (
              <Link
                key={blog.id}
                href={routes.BLOG_POST(blog.slug)}
                className='bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow'
              >
                <div className='relative h-48 bg-gray-100'>
                  {blog.thumbnailUrl ? (
                    <Image
                      src={blog.thumbnailUrl}
                      alt={blog.title}
                      fill
                      className='object-cover'
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    />
                  ) : (
                    <div className='w-full h-full flex items-center justify-center text-gray-400'>Không có ảnh</div>
                  )}
                </div>

                <div className='p-5'>
                  <h2 className='text-lg font-semibold text-gray-900 line-clamp-2 mb-2'>{blog.title}</h2>
                  <p className='text-sm text-gray-500 mb-3'>
                    {new Date(blog.createdAt).toLocaleDateString('vi-VN')} • {blog.author}
                  </p>
                  <p className='text-sm text-gray-700 line-clamp-3'>{blog.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
