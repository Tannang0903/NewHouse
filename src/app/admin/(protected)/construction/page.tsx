'use client'

import { useState, useEffect, useCallback } from 'react'
import ImageUpload from '../../components/ImageUpload'

interface Construction {
  id: string
  name: string
  introduction: string
  description: string
  images: string[]
  type: 'DESIGN' | 'CONSTRUCTION' | 'INTERIOR'
  order: number
  isActive: boolean
  createdAt: string
}

const EMPTY_FORM = {
  name: '',
  introduction: '',
  description: '',
  images: [] as string[],
  type: 'DESIGN' as 'DESIGN' | 'CONSTRUCTION' | 'INTERIOR',
  order: 0,
  isActive: true,
}

const typeLabel = { DESIGN: '🎨 Thiết kế', CONSTRUCTION: '🏗️ Thi công', INTERIOR: '🛋️ Nội thất' }
const typeBadge = {
  DESIGN: 'bg-blue-100 text-blue-700',
  CONSTRUCTION: 'bg-orange-100 text-orange-700',
  INTERIOR: 'bg-purple-100 text-purple-700',
}

// Icon components
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

const IconEye = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='w-4 h-4'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={2}
  >
    <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
    <circle cx='12' cy='12' r='3' />
  </svg>
)

const IconEyeOff = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='w-4 h-4'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={2}
  >
    <path d='M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94' />
    <path d='M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19' />
    <line x1='1' y1='1' x2='23' y2='23' />
  </svg>
)

export default function ConstructionAdminPage() {
  const [items, setItems] = useState<Construction[]>([])
  const [loading, setLoading] = useState(true)
  const [filterType, setFilterType] = useState<string>('ALL')
  const [showModal, setShowModal] = useState(false)
  const [editItem, setEditItem] = useState<Construction | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [togglingId, setTogglingId] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const isAnyLoading = saving || !!deletingId || !!togglingId || uploading
  const fetchData = useCallback(
    async (signal?: AbortSignal) => {
      setLoading(true)
      try {
        const url = filterType === 'ALL' ? '/api/construction' : `/api/construction?type=${filterType}`
        const res = await fetch(url, { signal })
        if (!res.ok) {
          if (!signal?.aborted) setItems([])
          return
        }
        const data = await res.json()
        if (!signal?.aborted) setItems(Array.isArray(data) ? data : [])
      } catch (err) {
        if (!signal?.aborted) {
          console.error('fetchData error:', err)
          setItems([])
        }
      } finally {
        if (!signal?.aborted) setLoading(false)
      }
    },
    [filterType]
  )

  useEffect(() => {
    const controller = new AbortController()
    fetchData(controller.signal)
    return () => controller.abort()
  }, [fetchData])

  const openCreate = () => {
    const defaultType = EMPTY_FORM.type
    const maxOrder = items.filter((i) => i.type === defaultType).reduce((max, i) => Math.max(max, i.order), 0)
    setEditItem(null)
    setForm({ ...EMPTY_FORM, order: maxOrder + 1 })
    setError('')
    setShowModal(true)
  }

  const openEdit = (item: Construction) => {
    setEditItem(item)
    setForm({
      name: item.name,
      introduction: item.introduction,
      description: item.description,
      images: item.images,
      type: item.type,
      order: item.order,
      isActive: item.isActive,
    })
    setError('')
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa công trình này?')) return
    setDeletingId(id)
    try {
      const res = await fetch(`/api/construction/${id}`, { method: 'DELETE' })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Xóa công trình thất bại')
        return
      }
      fetchData()
    } catch {
      setError('Xóa công trình thất bại')
    } finally {
      setDeletingId(null)
    }
  }

  const handleToggleActive = async (item: Construction) => {
    setTogglingId(item.id)
    try {
      const res = await fetch(`/api/construction/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !item.isActive }),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Cập nhật trạng thái thất bại')
        return
      }
      fetchData()
    } catch {
      setError('Cập nhật trạng thái thất bại')
    } finally {
      setTogglingId(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    const url = editItem ? `/api/construction/${editItem.id}` : '/api/construction'
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

  return (
    <div>
      {/* Header */}
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>Quản lý Công trình</h1>
          <p className='text-gray-500 mt-1'>Công trình thiết kế và thi công</p>
        </div>
        <button
          onClick={openCreate}
          disabled={isAnyLoading}
          className='bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2'
        >
          <span>➕</span> Thêm công trình
        </button>
      </div>

      {error && (
        <div className='mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center justify-between'>
          <span>{error}</span>
          <button onClick={() => setError('')} className='text-red-400 hover:text-red-600 font-bold ml-4'>
            ×
          </button>
        </div>
      )}

      {/* Filter tabs */}
      <div className='flex gap-2 mb-6'>
        {['ALL', 'DESIGN', 'CONSTRUCTION', 'INTERIOR'].map((t) => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filterType === t
                ? 'bg-amber-500 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {t === 'ALL' ? 'Tất cả' : t === 'DESIGN' ? 'Thiết kế' : t === 'CONSTRUCTION' ? 'Thi công' : 'Nội thất'}
            {t !== 'ALL' && (
              <span className='ml-1.5 text-xs opacity-75'>({items.filter((i) => i.type === t).length})</span>
            )}
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
              <col className='w-14' />
              <col className='w-20' />
              {/* name takes remaining space */}
              <col />
              <col className='w-36' />
              <col className='w-20' />
              <col className='w-32' />
            </colgroup>
            <thead>
              <tr className='bg-gray-50 border-b border-gray-100'>
                <th className='text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase'>#</th>
                <th className='text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase'>Ảnh</th>
                <th className='text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase'>Tên công trình</th>
                <th className='text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase'>Loại</th>
                <th className='text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase'>Ảnh</th>
                <th className='text-center px-3 py-3 text-xs font-semibold text-gray-500 uppercase'>Thao tác</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-50'>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={6} className='text-center py-12 text-gray-400'>
                    Chưa có công trình nào
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr
                    key={item.id}
                    className={`transition-colors ${item.isActive ? 'hover:bg-gray-50' : 'bg-gray-50/60 hover:bg-gray-100/60'}`}
                  >
                    <td className='px-4 py-3 text-sm font-medium text-gray-400'>{item.order}</td>
                    <td className='px-3 py-3'>
                      {item.images[0] ? (
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className='w-12 h-10 rounded-lg object-cover border border-gray-100'
                        />
                      ) : (
                        <div className='w-12 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-300 text-xs'>
                          📷
                        </div>
                      )}
                    </td>
                    <td className='px-3 py-3 min-w-0'>
                      <p
                        className={`text-sm font-medium truncate ${item.isActive ? 'text-gray-900' : 'text-gray-400'}`}
                      >
                        {item.name}
                      </p>
                      <p className='text-xs text-gray-400 truncate mt-0.5'>{item.introduction}</p>
                    </td>
                    <td className='px-3 py-3'>
                      <span
                        className={`inline-flex text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap ${typeBadge[item.type]}`}
                      >
                        {typeLabel[item.type]}
                      </span>
                    </td>
                    <td className='px-3 py-3 text-sm text-gray-400 whitespace-nowrap'>
                      {item.images.length > 0 ? `${item.images.length} ảnh` : '—'}
                    </td>
                    <td className='px-3 py-3'>
                      <div className='flex items-center justify-center gap-1'>
                        {/* Toggle active */}
                        <button
                          onClick={() => handleToggleActive(item)}
                          disabled={isAnyLoading}
                          title={item.isActive ? 'Đang hiển thị — click để ẩn' : 'Đang ẩn — click để hiển thị'}
                          className={`p-1.5 rounded-md transition-colors disabled:opacity-40 ${
                            item.isActive ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'
                          }`}
                        >
                          {togglingId === item.id ? (
                            <svg className='w-4 h-4 animate-spin' fill='none' viewBox='0 0 24 24'>
                              <circle
                                className='opacity-25'
                                cx='12'
                                cy='12'
                                r='10'
                                stroke='currentColor'
                                strokeWidth='4'
                              />
                              <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v8z' />
                            </svg>
                          ) : item.isActive ? (
                            <IconEye />
                          ) : (
                            <IconEyeOff />
                          )}
                        </button>

                        {/* Edit */}
                        <button
                          onClick={() => openEdit(item)}
                          disabled={isAnyLoading}
                          title='Chỉnh sửa'
                          className='p-1.5 rounded-md text-blue-500 hover:bg-blue-50 transition-colors disabled:opacity-40'
                        >
                          <IconEdit />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(item.id)}
                          disabled={isAnyLoading}
                          title='Xóa'
                          className='p-1.5 rounded-md text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40'
                        >
                          {deletingId === item.id ? (
                            <svg className='w-4 h-4 animate-spin' fill='none' viewBox='0 0 24 24'>
                              <circle
                                className='opacity-25'
                                cx='12'
                                cy='12'
                                r='10'
                                stroke='currentColor'
                                strokeWidth='4'
                              />
                              <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v8z' />
                            </svg>
                          ) : (
                            <IconTrash />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl'>
            <div className='sticky top-0 bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between z-10'>
              <h2 className='text-lg font-bold text-gray-900'>
                {editItem ? 'Chỉnh sửa công trình' : 'Thêm công trình mới'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                disabled={saving || uploading}
                className='text-gray-400 hover:text-gray-600 text-2xl leading-none disabled:opacity-50'
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className='p-6 space-y-4'>
              {error && (
                <div className='bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm'>{error}</div>
              )}

              <div className='grid grid-cols-2 gap-4'>
                <div className='col-span-2'>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Tên công trình <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='text'
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    disabled={saving}
                    className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:bg-gray-50'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Loại</label>
                  <select
                    value={form.type}
                    disabled={saving}
                    onChange={(e) => {
                      const nextType = e.target.value as 'DESIGN' | 'CONSTRUCTION' | 'INTERIOR'
                      const maxOrder = items
                        .filter((i) => i.type === nextType && i.id !== editItem?.id)
                        .reduce((max, i) => Math.max(max, i.order), 0)
                      setForm({ ...form, type: nextType, order: editItem ? form.order : maxOrder + 1 })
                    }}
                    className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:bg-gray-50'
                  >
                    <option value='DESIGN'>Thiết kế</option>
                    <option value='CONSTRUCTION'>Thi công</option>
                    <option value='INTERIOR'>Nội thất</option>
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Thứ tự hiển thị
                    <span className='text-xs text-gray-400 font-normal ml-1'>
                      (1–
                      {items.filter((i) => i.type === form.type && i.id !== editItem?.id).length + (editItem ? 0 : 1)})
                    </span>
                  </label>
                  <input
                    type='number'
                    min={1}
                    max={items.filter((i) => i.type === form.type && i.id !== editItem?.id).length + (editItem ? 0 : 1)}
                    value={form.order}
                    disabled={saving}
                    onChange={(e) => setForm({ ...form, order: Math.max(1, parseInt(e.target.value) || 1) })}
                    className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:bg-gray-50'
                  />
                </div>

                <div className='col-span-2'>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Giới thiệu ngắn <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='text'
                    value={form.introduction}
                    onChange={(e) => setForm({ ...form, introduction: e.target.value })}
                    required
                    disabled={saving}
                    className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:bg-gray-50'
                  />
                </div>

                <div className='col-span-2'>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Mô tả chi tiết <span className='text-red-500'>*</span>
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    required
                    rows={4}
                    disabled={saving}
                    className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none disabled:bg-gray-50'
                  />
                </div>

                <div className='col-span-2'>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Ảnh công trình
                    <span className='text-gray-400 font-normal ml-1'>(tối đa 20 ảnh)</span>
                  </label>
                  <ImageUpload
                    images={form.images}
                    onChange={(urls) => setForm({ ...form, images: urls })}
                    folder='construction'
                    maxImages={20}
                    onUploadStart={() => setUploading(true)}
                    onUploadEnd={() => setUploading(false)}
                  />
                </div>

                <div className='col-span-2 flex items-center gap-2'>
                  <input
                    type='checkbox'
                    id='isActive'
                    checked={form.isActive}
                    onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                    disabled={saving}
                    className='w-4 h-4 accent-amber-500'
                  />
                  <label htmlFor='isActive' className='text-sm text-gray-700'>
                    Hiển thị công trình này trên Landing Page
                  </label>
                </div>
              </div>

              <div className='flex justify-end gap-3 pt-2'>
                <button
                  type='button'
                  onClick={() => setShowModal(false)}
                  disabled={saving || uploading}
                  className='px-5 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 rounded-lg transition-colors'
                >
                  Hủy
                </button>
                <button
                  type='submit'
                  disabled={isAnyLoading}
                  className='px-5 py-2 text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 disabled:opacity-50 rounded-lg transition-colors flex items-center gap-2'
                >
                  {saving && (
                    <svg className='w-4 h-4 animate-spin' fill='none' viewBox='0 0 24 24'>
                      <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
                      <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v8z' />
                    </svg>
                  )}
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
