'use client'

import { useState, useEffect, useCallback } from 'react'

interface PriceItem {
  id: string
  label: string
  price: number
  isIncluded: boolean
  note?: string
  order: number
}

type PriceType = 'design' | 'rough' | 'completed'

const PRICE_TABS: { key: PriceType; label: string; icon: string; color: string }[] = [
  { key: 'design', label: 'Thiết kế', icon: '📐', color: 'bg-blue-500' },
  { key: 'rough', label: 'Phần thô', icon: '🧱', color: 'bg-orange-500' },
  { key: 'completed', label: 'Hoàn thiện', icon: '🏠', color: 'bg-purple-500' },
]

const API_MAP: Record<PriceType, string> = {
  design: '/api/pricing/design',
  rough: '/api/pricing/rough',
  completed: '/api/pricing/completed',
}

const EMPTY_FORM = { label: '', price: 0, isIncluded: true, note: '', order: 0 }

const Spinner = () => (
  <svg className='w-4 h-4 animate-spin' fill='none' viewBox='0 0 24 24'>
    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
    <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v8z' />
  </svg>
)

const IconEdit = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='w-4 h-4'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={2}
  >
    <path d='M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7' />
    <path d='M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z' />
  </svg>
)

const IconTrash = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='w-4 h-4'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={2}
  >
    <polyline points='3 6 5 6 21 6' />
    <path d='M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6' />
    <path d='M10 11v6M14 11v6' />
    <path d='M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2' />
  </svg>
)

export default function PricingAdminPage() {
  const [activeTab, setActiveTab] = useState<PriceType>('design')
  const [items, setItems] = useState<PriceItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editItem, setEditItem] = useState<PriceItem | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [error, setError] = useState('')

  const isAnyLoading = saving || !!deletingId

  const fetchData = useCallback(
    async (signal?: AbortSignal) => {
      setLoading(true)
      setError('')
      try {
        const res = await fetch(API_MAP[activeTab], { signal })
        if (!res.ok) {
          const data = await res.json()
          if (!signal?.aborted) {
            setError(data.error || 'Không thể tải dữ liệu bảng giá')
            setItems([])
          }
          return
        }
        const data = await res.json()
        if (!signal?.aborted) setItems(Array.isArray(data) ? data : [])
      } catch {
        if (!signal?.aborted) {
          setError('Không thể tải dữ liệu bảng giá')
          setItems([])
        }
      } finally {
        if (!signal?.aborted) setLoading(false)
      }
    },
    [activeTab]
  )

  useEffect(() => {
    const controller = new AbortController()
    fetchData(controller.signal)
    return () => controller.abort()
  }, [fetchData])

  const openCreate = () => {
    setEditItem(null)
    setForm(EMPTY_FORM)
    setError('')
    setShowModal(true)
  }

  const openEdit = (item: PriceItem) => {
    setEditItem(item)
    setForm({
      label: item.label,
      price: item.price,
      isIncluded: item.isIncluded,
      note: item.note || '',
      order: item.order,
    })
    setError('')
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Xóa hạng mục này?')) return
    setDeletingId(id)
    try {
      const res = await fetch(`${API_MAP[activeTab]}/${id}`, { method: 'DELETE' })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Xóa thất bại')
        return
      }
      fetchData()
    } catch {
      setError('Xóa thất bại')
    } finally {
      setDeletingId(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    const url = editItem ? `${API_MAP[activeTab]}/${editItem.id}` : API_MAP[activeTab]
    const method = editItem ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Có lỗi xảy ra')
        return
      }

      setShowModal(false)
      fetchData()
    } catch {
      setError('Không thể kết nối server')
    } finally {
      setSaving(false)
    }
  }

  const formatPrice = (price: number) => new Intl.NumberFormat('vi-VN').format(price) + ' đ/m²'

  const activeTabInfo = PRICE_TABS.find((t) => t.key === activeTab)!

  return (
    <div>
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>Quản lý Bảng giá</h1>
          <p className='text-gray-500 mt-1'>3 gói dịch vụ: Thiết kế, Phần thô, Hoàn thiện</p>
        </div>
        <button
          onClick={openCreate}
          disabled={isAnyLoading}
          className='bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2'
        >
          <span>➕</span> Thêm hạng mục
        </button>
      </div>

      {/* Tabs */}
      <div className='flex gap-3 mb-6'>
        {PRICE_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            disabled={isAnyLoading}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all disabled:opacity-50 ${
              activeTab === tab.key
                ? `${tab.color} text-white shadow-md`
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <div className='text-center py-20 text-gray-400'>Đang tải...</div>
      ) : (
        <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
          <table className='w-full table-fixed'>
            <colgroup>
              <col className='w-16' />
              <col />
              <col className='w-40' />
              <col className='w-28' />
              <col className='w-44' />
              <col className='w-28' />
            </colgroup>
            <thead>
              <tr className='bg-gray-50 border-b border-gray-100'>
                <th className='text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase'>Thứ tự</th>
                <th className='text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase'>Hạng mục</th>
                <th className='text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase'>Đơn giá</th>
                <th className='text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase'>Bao gồm</th>
                <th className='text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase'>Ghi chú</th>
                <th className='text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase'>Thao tác</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-50'>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={6} className='text-center py-12 text-gray-400'>
                    Chưa có hạng mục nào
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className='hover:bg-gray-50 transition-colors'>
                    <td className='px-6 py-4 text-sm text-gray-500'>{item.order}</td>
                    <td className='px-6 py-4 min-w-0'>
                      <p className='text-sm font-medium text-gray-900 truncate'>{item.label}</p>
                    </td>
                    <td className='px-6 py-4'>
                      <span className='text-sm font-semibold text-gray-900'>{formatPrice(item.price)}</span>
                    </td>
                    <td className='px-6 py-4'>
                      <span
                        className={`inline-flex text-xs px-2.5 py-1 rounded-full font-medium ${
                          item.isIncluded ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {item.isIncluded ? '✓ Có' : '✗ Không'}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-400 max-w-xs truncate'>{item.note || '—'}</td>
                    <td className='px-6 py-4 text-right'>
                      <div className='flex items-center justify-end gap-1'>
                        <button
                          onClick={() => openEdit(item)}
                          disabled={isAnyLoading}
                          title='Chỉnh sửa'
                          className='p-1.5 rounded-md text-blue-500 hover:bg-blue-50 transition-colors disabled:opacity-40'
                        >
                          <IconEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          disabled={isAnyLoading}
                          title='Xóa'
                          className='p-1.5 rounded-md text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40'
                        >
                          {deletingId === item.id ? <Spinner /> : <IconTrash />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Summary */}
          {items.length > 0 && (
            <div className='px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between'>
              <p className='text-xs text-gray-500'>
                {items.length} hạng mục • {items.filter((i) => i.isIncluded).length} bao gồm trong gói
              </p>
              <p className='text-xs font-medium text-gray-700'>
                Tổng:{' '}
                {new Intl.NumberFormat('vi-VN').format(
                  items.filter((i) => i.isIncluded).reduce((acc, i) => acc + i.price, 0)
                )}{' '}
                đ/m²
              </p>
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-2xl w-full max-w-lg shadow-2xl'>
            <div className='px-6 py-4 border-b border-gray-100 flex items-center justify-between'>
              <h2 className='text-lg font-bold text-gray-900 flex items-center gap-2'>
                <span>{activeTabInfo.icon}</span>
                {editItem ? 'Chỉnh sửa' : 'Thêm mới'} — {activeTabInfo.label}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                disabled={saving}
                className='text-gray-400 hover:text-gray-600 text-2xl leading-none disabled:opacity-50'
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className='p-6 space-y-4'>
              {error && (
                <div className='bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm'>{error}</div>
              )}

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Tên hạng mục <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  value={form.label}
                  onChange={(e) => setForm({ ...form, label: e.target.value })}
                  required
                  placeholder='VD: Phí khảo sát công trình'
                  className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400'
                />
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Đơn giá (đ/m²) <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='number'
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
                    required
                    min='0'
                    step='1000'
                    className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Thứ tự</label>
                  <input
                    type='number'
                    value={form.order}
                    onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
                    className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400'
                  />
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Ghi chú</label>
                <input
                  type='text'
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  placeholder='Ghi chú thêm (không bắt buộc)'
                  className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400'
                />
              </div>

              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id='isIncluded'
                  checked={form.isIncluded}
                  onChange={(e) => setForm({ ...form, isIncluded: e.target.checked })}
                  className='w-4 h-4 accent-amber-500'
                />
                <label htmlFor='isIncluded' className='text-sm text-gray-700'>
                  Bao gồm trong gói dịch vụ (dùng để tính tổng giá)
                </label>
              </div>

              <div className='flex justify-end gap-3 pt-2'>
                <button
                  type='button'
                  onClick={() => setShowModal(false)}
                  disabled={saving}
                  className='px-5 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 rounded-lg transition-colors'
                >
                  Hủy
                </button>
                <button
                  type='submit'
                  disabled={isAnyLoading}
                  className='px-5 py-2 text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 disabled:opacity-50 rounded-lg transition-colors flex items-center gap-2'
                >
                  {saving && <Spinner />}
                  {saving ? 'Đang lưu...' : editItem ? 'Cập nhật' : 'Thêm mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
