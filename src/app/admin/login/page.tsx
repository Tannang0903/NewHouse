'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    setLoading(false)

    if (result?.error) {
      setError('Email hoặc mật khẩu không chính xác')
    } else {
      router.push('/admin')
      router.refresh()
    }
  }

  return (
    <div className='min-h-screen bg-gray-900 flex items-center justify-center'>
      <div className='bg-white rounded-2xl shadow-xl w-full max-w-md p-8'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>NewHouse</h1>
          <p className='text-gray-500 mt-2'>Đăng nhập vào trang quản trị</p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-5'>
          {error && (
            <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm'>{error}</div>
          )}

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent'
              placeholder='admin@newhouse.vn'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Mật khẩu</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent'
              placeholder='••••••••'
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg transition-colors'
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>
      </div>
    </div>
  )
}
