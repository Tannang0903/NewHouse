'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: '📊' },
  { label: 'Công trình', href: '/admin/construction', icon: '🏗️' },
  { label: 'Bảng giá', href: '/admin/pricing', icon: '💰' },
  { label: 'Blog', href: '/admin/blog', icon: '📝' },
]

interface AdminSidebarProps {
  open: boolean
  onClose: () => void
}

export default function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={`fixed left-0 top-0 h-full w-64 bg-gray-900 text-white flex flex-col shadow-xl z-40 transform transition-transform duration-200 ${
        open ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}
    >
      <div className='px-6 py-5 border-b border-gray-700 flex items-start justify-between'>
        <div>
          <h1 className='text-xl font-bold text-amber-400'>NewHouse Admin</h1>
          <p className='text-xs text-gray-400 mt-1'>Trang quản trị nội dung</p>
        </div>
        <button
          onClick={onClose}
          className='lg:hidden text-gray-400 hover:text-white text-2xl leading-none'
          aria-label='Đóng menu'
        >
          ×
        </button>
      </div>

      <nav className='flex-1 px-4 py-6 space-y-1'>
        {navItems.map((item) => {
          const isActive = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                isActive ? 'bg-amber-500 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className='px-4 py-4 border-t border-gray-700'>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className='w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors'
        >
          <span>🚪</span>
          Đăng xuất
        </button>
      </div>
    </aside>
  )
}
