'use client'

import { useState } from 'react'
import { IconMenu } from '@/components/icons'
import AdminSidebar from '../components/AdminSidebar'

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className='flex min-h-screen bg-gray-100'>
      {/* Backdrop overlay for mobile */}
      {sidebarOpen && (
        <div className='fixed inset-0 bg-black/40 z-30 lg:hidden' onClick={() => setSidebarOpen(false)} />
      )}

      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className='flex-1 lg:ml-64 p-4 lg:p-8'>
        {/* Mobile top bar */}
        <div className='lg:hidden flex items-center mb-4'>
          <button
            onClick={() => setSidebarOpen(true)}
            className='p-2 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors'
            aria-label='Mở menu'
          >
            <IconMenu className='w-6 h-6' />
          </button>
          <span className='ml-3 text-lg font-bold text-amber-500'>NewHouse Admin</span>
        </div>

        {children}
      </main>
    </div>
  )
}
