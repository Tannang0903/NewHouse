'use client'

import { useCallback, useEffect, useState } from 'react'
import ImageUpload from '../../../components/ImageUpload'
import { IconEdit, IconEye, IconEyeOff, IconTrash, Spinner } from '@/components/icons'

interface Item {
  id: string
  name: string
  introduction: string
  description: string
  images: string[]
  order: number
  isActive: boolean
}

interface FormData {
  name: string
  introduction: string
  description: string
  images: string[]
  order: number
  isActive: boolean
}

interface Props {
  type: 'DESIGN' | 'CONSTRUCTION' | 'INTERIOR'
  title: string
  description?: string
  itemLabel?: string
}

const API_MAP = {
  DESIGN: '/api/design',
  CONSTRUCTION: '/api/construction-work',
  INTERIOR: '/api/interior',
} as const

export default function ConstructionAdminByType({ type, title, description, itemLabel = 'công trình' }: Props) {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editItem, setEditItem] = useState<Item | null>(null)
  const [form, setForm] = useState<FormData>({
    name: '',
    introduction: '',
    description: '',
    images: [],
    order: 0,
    isActive: true,
  })
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [togglingId, setTogglingId] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const endpoint = API_MAP[type]
  const isAnyLoading = saving || !!deletingId || !!togglingId || uploading

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(endpoint)
      const data = await res.json()
      setItems(Array.isArray(data) ? data : [])
    } catch {
      setItems([])
    } finally {
      setLoading(false)
    }
  }, [endpoint])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const openCreate = () => {
    const maxOrder = items.reduce((max, i) => Math.max(max, i.order), 0)
    setEditItem(null)
    setForm({ name: '', introduction: '', description: '', images: [], order: maxOrder + 1, isActive: true })
    setError('')
    setShowModal(true)
  }

  const openEdit = (item: Item) => {
    setEditItem(item)
    setForm({
      name: item.name,
      introduction: item.introduction,
      description: item.description,
      images: item.images,
      order: item.order,
      isActive: item.isActive,
    })
    setError('')
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa mục này?')) return
    setDeletingId(id)
    try {
      await fetch(`${endpoint}/${id}`, { method: 'DELETE' })
      await fetchData()
    } finally {
      setDeletingId(null)
    }
  }

  const handleToggleActive = async (item: Item) => {
    setTogglingId(item.id)
    try {
      await fetch(`${endpoint}/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !item.isActive }),
      })
      await fetchData()
    } finally {
      setTogglingId(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const url = editItem ? `${endpoint}/${editItem.id}` : endpoint
      const method = editItem ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const d = await res.json()
        setError(d.error || 'Có lỗi xảy ra')
        return
      }
      setShowModal(false)
      await fetchData()
    } catch {
      setError('Không thể kết nối server')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>{title}</h1>
          {description ? <p className='text-gray-500 mt-1'>{description}</p> : null}
        </div>
        <button
          onClick={openCreate}
          disabled={isAnyLoading}
          className='bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2'
        >
          <span>➕</span> Thêm {itemLabel}
        </button>
      </div>

      {loading ? <div className='text-center py-20 text-gray-400'>Đang tải...</div> : null}

      <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
        <table className='w-full table-fixed'>
          <colgroup>
            <col className='w-14' />
            <col className='w-20' />
            <col />
            <col className='w-20' />
            <col className='w-32' />
          </colgroup>
          <thead>
            <tr className='bg-gray-50 border-b border-gray-100'>
              <th className='text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase'>#</th>
              <th className='text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase'>Ảnh</th>
              <th className='text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase'>{`Tên ${itemLabel}`}</th>
              <th className='text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase'>Ảnh</th>
              <th className='text-center px-3 py-3 text-xs font-semibold text-gray-500 uppercase'>Thao tác</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-50'>
            {items.map((item) => (
              <tr key={item.id} className='transition-colors hover:bg-gray-50'>
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
                  <p className='text-sm font-medium truncate text-gray-900'>{item.name}</p>
                  <p className='text-xs text-gray-400 truncate mt-0.5'>{item.introduction}</p>
                </td>
                <td className='px-3 py-3 text-sm text-gray-400 whitespace-nowrap'>
                  {item.images.length > 0 ? `${item.images.length} ảnh` : '—'}
                </td>
                <td className='px-3 py-3'>
                  <div className='flex items-center justify-center gap-1'>
                    <button
                      onClick={() => handleToggleActive(item)}
                      disabled={isAnyLoading}
                      title={item.isActive ? 'Đang hiển thị — click để ẩn' : 'Đang ẩn — click để hiển thị'}
                      className={`p-1.5 rounded-md transition-colors disabled:opacity-40 ${
                        item.isActive ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'
                      }`}
                    >
                      {togglingId === item.id ? <Spinner /> : item.isActive ? <IconEye /> : <IconEyeOff />}
                    </button>
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
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl'>
            <div className='sticky top-0 bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between z-10'>
              <h2 className='text-lg font-bold text-gray-900'>
                {editItem ? `Chỉnh sửa ${itemLabel}` : `Thêm ${itemLabel} mới`}
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

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Tên {itemLabel} <span className='text-red-500'>*</span>
                </label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  disabled={saving}
                  placeholder={`Nhập tên ${itemLabel}...`}
                  className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:bg-gray-50'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Giới thiệu ngắn <span className='text-red-500'>*</span>
                </label>
                <input
                  value={form.introduction}
                  onChange={(e) => setForm({ ...form, introduction: e.target.value })}
                  required
                  disabled={saving}
                  placeholder='Mô tả ngắn hiển thị dưới tên...'
                  className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:bg-gray-50'
                />
              </div>

              <div>
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

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Ảnh {itemLabel} <span className='text-gray-400 font-normal ml-1'>(tối đa 20 ảnh)</span>
                </label>
                <ImageUpload
                  images={form.images}
                  onChange={(urls: string[]) => setForm({ ...form, images: urls })}
                  folder='construction'
                  maxImages={20}
                  onUploadStart={() => setUploading(true)}
                  onUploadEnd={() => setUploading(false)}
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Thứ tự hiển thị</label>
                <input
                  type='number'
                  min={1}
                  value={form.order}
                  disabled={saving}
                  onChange={(e) => setForm({ ...form, order: Math.max(1, parseInt(e.target.value) || 1) })}
                  className='w-32 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:bg-gray-50'
                />
              </div>

              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id='isActive'
                  checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                  disabled={saving}
                  className='w-4 h-4 accent-amber-500'
                />
                <label htmlFor='isActive' className='text-sm text-gray-700'>
                  Hiển thị trên Landing Page
                </label>
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
