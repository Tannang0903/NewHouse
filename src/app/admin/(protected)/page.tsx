import { prisma } from '@/lib/prisma'
import Link from 'next/link'

async function getStats() {
  const [constructions, designPrices, roughPrices, completedPrices, blogs] = await Promise.all([
    prisma.construction.count(),
    prisma.designPrice.count(),
    prisma.roughLaborPrice.count(),
    prisma.completedPrice.count(),
    prisma.blog.count(),
  ])
  const publishedBlogs = await prisma.blog.count({ where: { isPublished: true } })
  return { constructions, designPrices, roughPrices, completedPrices, blogs, publishedBlogs }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  const cards = [
    {
      title: 'Công trình',
      value: stats.constructions,
      desc: 'thiết kế + thi công',
      href: '/admin/construction',
      color: 'bg-blue-500',
      icon: '🏗️',
    },
    {
      title: 'Bảng giá thiết kế',
      value: stats.designPrices,
      desc: 'hạng mục',
      href: '/admin/pricing',
      color: 'bg-emerald-500',
      icon: '📐',
    },
    {
      title: 'Bảng giá phần thô',
      value: stats.roughPrices,
      desc: 'hạng mục',
      href: '/admin/pricing',
      color: 'bg-orange-500',
      icon: '🧱',
    },
    {
      title: 'Bảng giá hoàn thiện',
      value: stats.completedPrices,
      desc: 'hạng mục',
      href: '/admin/pricing',
      color: 'bg-purple-500',
      icon: '🏠',
    },
    {
      title: 'Blog',
      value: stats.blogs,
      desc: `${stats.publishedBlogs} đã đăng`,
      href: '/admin/blog',
      color: 'bg-rose-500',
      icon: '📝',
    },
  ]

  return (
    <div>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold text-gray-900'>Dashboard</h1>
        <p className='text-gray-500 mt-1'>Tổng quan hệ thống quản trị NewHouse</p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow group'
          >
            <div className='flex items-start justify-between'>
              <div>
                <p className='text-sm text-gray-500 font-medium'>{card.title}</p>
                <p className='text-4xl font-bold text-gray-900 mt-2'>{card.value}</p>
                <p className='text-sm text-gray-400 mt-1'>{card.desc}</p>
              </div>
              <div
                className={`${card.color} text-white w-12 h-12 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform`}
              >
                {card.icon}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick links */}
      <div className='mt-10'>
        <h2 className='text-lg font-semibold text-gray-800 mb-4'>Truy cập nhanh</h2>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
          <Link
            href='/admin/construction'
            className='bg-white border border-dashed border-gray-300 rounded-xl p-5 text-center hover:border-amber-400 hover:bg-amber-50 transition-colors'
          >
            <div className='text-2xl mb-2'>➕</div>
            <p className='text-sm font-medium text-gray-700'>Thêm công trình mới</p>
          </Link>
          <Link
            href='/admin/blog'
            className='bg-white border border-dashed border-gray-300 rounded-xl p-5 text-center hover:border-amber-400 hover:bg-amber-50 transition-colors'
          >
            <div className='text-2xl mb-2'>✏️</div>
            <p className='text-sm font-medium text-gray-700'>Viết bài blog mới</p>
          </Link>
          <Link
            href='/'
            target='_blank'
            className='bg-white border border-dashed border-gray-300 rounded-xl p-5 text-center hover:border-amber-400 hover:bg-amber-50 transition-colors'
          >
            <div className='text-2xl mb-2'>🌐</div>
            <p className='text-sm font-medium text-gray-700'>Xem Landing Page</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
