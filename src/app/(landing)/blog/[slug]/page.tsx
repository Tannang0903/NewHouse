import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getBlogBySlug } from '@/lib/api'
import BlogContent from '@/components/editor/BlogContent'
import { routes } from '@/constants/routes'

export const dynamic = 'force-dynamic'

interface Props {
  params: { slug: string }
}

export default async function BlogPostPage({ params }: Props) {
  const blog = await getBlogBySlug(params.slug)

  if (!blog) notFound()

  return (
    <div className='bg-white min-h-screen pt-[100px] pb-16'>
      <div className='max-w-[800px] mx-auto px-4'>
        <Link
          href={routes.BLOG}
          className='inline-flex items-center gap-2 text-amber-500 hover:text-amber-600 text-sm mb-8 transition-colors'
        >
          ← Quay lại danh sách
        </Link>

        {blog.thumbnailUrl && (
          <div className='relative h-[400px] rounded-2xl overflow-hidden mb-8'>
            <Image src={blog.thumbnailUrl} alt={blog.title} fill className='object-cover' sizes='800px' priority />
          </div>
        )}

        <h1 className='text-3xl font-bold text-gray-900 mb-4'>{blog.title}</h1>

        <div className='flex items-center gap-4 text-sm text-gray-500 mb-8 border-b pb-6'>
          <span>{blog.author}</span>
          <span>•</span>
          <span>
            {new Date(blog.createdAt).toLocaleDateString('vi-VN', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </span>
        </div>

        <BlogContent html={blog.content} />
      </div>
    </div>
  )
}
