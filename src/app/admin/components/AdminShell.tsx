'use client'

import { useState } from 'react'
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
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
            </svg>
          </button>
          <span className='ml-3 text-lg font-bold text-amber-500'>NewHouse Admin</span>
        </div>

        {children}
      </main>
    </div>
  )
}
