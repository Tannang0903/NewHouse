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

export default function ConstructionAdminPage() {
  const [items, setItems] = useState<Construction[]>([])
  const [loading, setLoading] = useState(true)
  const [filterType, setFilterType] = useState<string>('ALL')
  const [showModal, setShowModal] = useState(false)
  const [editItem, setEditItem] = useState<Construction | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const url = filterType === 'ALL' ? '/api/construction' : `/api/construction?type=${filterType}`
      const res = await fetch(url)
      const data = await res.json()
      setItems(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('fetchData error:', err)
      setItems([])
    } finally {
      setLoading(false)
    }
  }, [filterType])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const openCreate = () => {
    setEditItem(null)
    setForm(EMPTY_FORM)
    setError('')
    setShowModal(true)
  }

  const openEdit = (item: Construction) => {
    setEditItem(item)
    setForm({
      name: item.name,
      introduction: item.introduction,
      description: item.description,
      images: item.images, // ← array trực tiếp, không cần join
      type: item.type,
      order: item.order,
      isActive: item.isActive,
    })
    setError('')
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa công trình này?')) return
    try {
      const res = await fetch(`/api/construction/${id}`, { method: 'DELETE' })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Xóa công trình thất bại')
        return
      }

      fetchData()
    } catch (err) {
      console.error('handleDelete error:', err)
      setError('Xóa công trình thất bại')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    const url = editItem ? `/api/construction/${editItem.id}` : '/api/construction'
    const method = editItem ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form), // ← form.images đã là array
    })

    setSaving(false)

    if (!res.ok) {
      const data = await res.json()
      setError(data.error || 'Có lỗi xảy ra')
      return
    }

    setShowModal(false)
    fetchData()
  }

  const typeLabel = { DESIGN: '🎨 Thiết kế', CONSTRUCTION: '🏗️ Thi công', INTERIOR: '🛋️ Nội thất' }

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
          className='bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2'
        >
          <span>➕</span> Thêm công trình
        </button>
      </div>

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
          <table className='w-full'>
            <thead>
              <tr className='bg-gray-50 border-b border-gray-100'>
                <th className='text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-16'>
                  STT
                </th>
                <th className='text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                  Tên công trình
                </th>
                <th className='text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                  Loại
                </th>
                <th className='text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                  Ảnh
                </th>
                <th className='text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                  Trạng thái
                </th>
                <th className='text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                  Thao tác
                </th>
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
                  <tr key={item.id} className='hover:bg-gray-50 transition-colors'>
                    <td className='px-6 py-4 text-sm text-gray-500'>{item.order}</td>
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-3'>
                        {/* Thumbnail ảnh đầu tiên */}
                        {item.images[0] ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className='w-12 h-12 rounded-lg object-cover flex-shrink-0 border border-gray-100'
                          />
                        ) : (
                          <div className='w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 flex-shrink-0'>
                            📷
                          </div>
                        )}
                        <div>
                          <p className='font-medium text-gray-900 text-sm'>{item.name}</p>
                          <p className='text-xs text-gray-400 mt-0.5 line-clamp-1'>{item.introduction}</p>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <span
                        className={`inline-flex text-xs px-2.5 py-1 rounded-full font-medium ${
                          item.type === 'DESIGN'
                            ? 'bg-blue-100 text-blue-700'
                            : item.type === 'CONSTRUCTION'
                              ? 'bg-orange-100 text-orange-700'
                              : 'bg-purple-100 text-purple-700'
                        }`}
                      >
                        {typeLabel[item.type]}
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <span className='text-sm text-gray-500'>
                        {item.images.length > 0 ? `${item.images.length} ảnh` : '—'}
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <span
                        className={`inline-flex text-xs px-2.5 py-1 rounded-full font-medium ${
                          item.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {item.isActive ? 'Hiển thị' : 'Ẩn'}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-right'>
                      <div className='flex items-center justify-end gap-2'>
                        <button
                          onClick={() => openEdit(item)}
                          className='text-sm text-blue-600 hover:text-blue-800 font-medium'
                        >
                          Sửa
                        </button>
                        <span className='text-gray-300'>|</span>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className='text-sm text-red-500 hover:text-red-700 font-medium'
                        >
                          Xóa
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
                className='text-gray-400 hover:text-gray-600 text-2xl leading-none'
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
                    className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Loại</label>
                  <select
                    value={form.type}
                    onChange={(e) =>
                      setForm({ ...form, type: e.target.value as 'DESIGN' | 'CONSTRUCTION' | 'INTERIOR' })
                    }
                    className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400'
                  >
                    <option value='DESIGN'>Thiết kế</option>
                    <option value='CONSTRUCTION'>Thi công</option>
                    <option value='INTERIOR'>Nội thất</option>
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Thứ tự hiển thị</label>
                  <input
                    type='number'
                    value={form.order}
                    onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
                    className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400'
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
                    className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400'
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
                    className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none'
                  />
                </div>

                {/* ✅ ImageUpload thay thế textarea URL */}
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
                  />
                </div>

                <div className='col-span-2 flex items-center gap-2'>
                  <input
                    type='checkbox'
                    id='isActive'
                    checked={form.isActive}
                    onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
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
                  className='px-5 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors'
                >
                  Hủy
                </button>
                <button
                  type='submit'
                  disabled={saving}
                  className='px-5 py-2 text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 disabled:opacity-50 rounded-lg transition-colors'
                >
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
