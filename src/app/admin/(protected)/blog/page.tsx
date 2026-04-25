'use client'

import { useState, useEffect, useCallback } from 'react'
import ImageUpload from '../../components/ImageUpload'

interface Blog {
  id: string
  slug: string
  title: string
  summary: string
  thumbnailUrl?: string
  author: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

interface BlogDetail extends Blog {
  content: string
}

const EMPTY_FORM = {
  slug: '',
  title: '',
  summary: '',
  content: '',
  thumbnailUrl: '',
  author: 'NewHouse',
  isPublished: false,
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export default function BlogAdminPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editBlog, setEditBlog] = useState<BlogDetail | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [fetchError, setFetchError] = useState('')

  const fetchData = useCallback(async () => {
    setLoading(true)
    setFetchError('')

    try {
      const res = await fetch('/api/blog')
      if (!res.ok) {
        const data = await res.json()
        setFetchError(data.error || 'Không thể tải danh sách bài viết')
        setBlogs([])
        return
      }

      const data = await res.json()
      setBlogs(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('fetchData error:', err)
      setFetchError('Không thể tải danh sách bài viết')
      setBlogs([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const openCreate = () => {
    setEditBlog(null)
    setForm(EMPTY_FORM)
    setError('')
    setShowModal(true)
  }

  const openEdit = async (blog: Blog) => {
    try {
      const res = await fetch(`/api/blog/${blog.id}`)
      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Không thể tải chi tiết bài viết')
        return
      }

      const detail: BlogDetail = await res.json()
      setEditBlog(detail)
      setForm({
        slug: detail.slug,
        title: detail.title,
        summary: detail.summary,
        content: detail.content,
        thumbnailUrl: detail.thumbnailUrl || '',
        author: detail.author,
        isPublished: detail.isPublished,
      })
      setError('')
      setShowModal(true)
    } catch (err) {
      console.error('openEdit error:', err)
      setError('Không thể tải chi tiết bài viết')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Xóa bài viết này?')) return

    try {
      const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' })
      if (!res.ok) {
        const data = await res.json()
        setFetchError(data.error || 'Xóa bài viết thất bại')
        return
      }

      fetchData()
    } catch (err) {
      console.error('handleDelete error:', err)
      setFetchError('Xóa bài viết thất bại')
    }
  }

  const handleTogglePublish = async (blog: Blog) => {
    try {
      const res = await fetch(`/api/blog/${blog.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !blog.isPublished }),
      })

      if (!res.ok) {
        const data = await res.json()
        setFetchError(data.error || 'Cập nhật trạng thái thất bại')
        return
      }

      fetchData()
    } catch (err) {
      console.error('handleTogglePublish error:', err)
      setFetchError('Cập nhật trạng thái thất bại')
    }
  }

  const handleTitleChange = (title: string) => {
    setForm((prev) => ({
      ...prev,
      title,
      slug: prev.slug || slugify(title),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    const url = editBlog ? `/api/blog/${editBlog.id}` : '/api/blog'
    const method = editBlog ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
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

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })

  return (
    <div>
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>Quản lý Blog</h1>
          <p className='text-gray-500 mt-1'>
            {blogs.filter((b) => b.isPublished).length}/{blogs.length} bài đã đăng
          </p>
        </div>
        <button
          onClick={openCreate}
          className='bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2'
        >
          <span>✏️</span> Viết bài mới
        </button>
      </div>

      {fetchError && (
        <div className='mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm'>
          {fetchError}
        </div>
      )}

      {loading ? (
        <div className='text-center py-20 text-gray-400'>Đang tải...</div>
      ) : (
        <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
          <table className='w-full'>
            <thead>
              <tr className='bg-gray-50 border-b border-gray-100'>
                <th className='text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase'>Tiêu đề</th>
                <th className='text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase'>Slug</th>
                <th className='text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase'>Tác giả</th>
                <th className='text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase'>Ngày tạo</th>
                <th className='text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase'>Trạng thái</th>
                <th className='text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase'>Thao tác</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-50'>
              {blogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className='text-center py-12 text-gray-400'>
                    Chưa có bài viết nào
                  </td>
                </tr>
              ) : (
                blogs.map((blog) => (
                  <tr key={blog.id} className='hover:bg-gray-50 transition-colors'>
                    <td className='px-6 py-4 max-w-xs'>
                      <div className='flex items-center gap-3'>
                        {blog.thumbnailUrl && (
                          <img
                            src={blog.thumbnailUrl}
                            alt={blog.title}
                            className='w-10 h-10 rounded-lg object-cover flex-shrink-0'
                          />
                        )}
                        <div>
                          <p className='text-sm font-medium text-gray-900 line-clamp-1'>{blog.title}</p>
                          <p className='text-xs text-gray-400 mt-0.5 line-clamp-1'>{blog.summary}</p>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <code className='text-xs bg-gray-100 px-2 py-1 rounded text-gray-600'>{blog.slug}</code>
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-600'>{blog.author}</td>
                    <td className='px-6 py-4 text-sm text-gray-500'>{formatDate(blog.createdAt)}</td>
                    <td className='px-6 py-4'>
                      <button
                        onClick={() => handleTogglePublish(blog)}
                        className={`inline-flex text-xs px-2.5 py-1 rounded-full font-medium transition-colors ${
                          blog.isPublished
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                        }`}
                      >
                        {blog.isPublished ? '✓ Đã đăng' : '◐ Nháp'}
                      </button>
                    </td>
                    <td className='px-6 py-4 text-right'>
                      <div className='flex items-center justify-end gap-2'>
                        <button
                          onClick={() => openEdit(blog)}
                          className='text-sm text-blue-600 hover:text-blue-800 font-medium'
                        >
                          Sửa
                        </button>
                        <span className='text-gray-300'>|</span>
                        <button
                          onClick={() => handleDelete(blog.id)}
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

      {showModal && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl'>
            <div className='sticky top-0 bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between'>
              <h2 className='text-lg font-bold text-gray-900'>{editBlog ? 'Chỉnh sửa bài viết' : 'Viết bài mới'}</h2>
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

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Tiêu đề bài viết <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  required
                  className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Slug (URL) <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  required
                  className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-400'
                />
                <p className='text-xs text-gray-400 mt-1'>URL: /blog/{form.slug || 'slug-bai-viet'}</p>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Tác giả</label>
                  <input
                    type='text'
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                    className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Ảnh thumbnail</label>
                  <ImageUpload
                    images={form.thumbnailUrl ? [form.thumbnailUrl] : []}
                    onChange={(urls) => setForm({ ...form, thumbnailUrl: urls[0] || '' })}
                    folder='blog'
                    single={true}
                  />
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Tóm tắt <span className='text-red-500'>*</span>
                </label>
                <textarea
                  value={form.summary}
                  onChange={(e) => setForm({ ...form, summary: e.target.value })}
                  required
                  rows={2}
                  placeholder='Tóm tắt ngắn hiển thị ở danh sách bài viết'
                  className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Nội dung đầy đủ <span className='text-red-500'>*</span>
                  <span className='text-gray-400 font-normal ml-1'>(hỗ trợ Markdown)</span>
                </label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  required
                  rows={10}
                  placeholder='# Tiêu đề&#10;&#10;Nội dung bài viết...'
                  className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-400 resize-y'
                />
              </div>

              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id='isPublished'
                  checked={form.isPublished}
                  onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
                  className='w-4 h-4 accent-amber-500'
                />
                <label htmlFor='isPublished' className='text-sm text-gray-700'>
                  Đăng bài ngay (bỏ tick để lưu nháp)
                </label>
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
                  {saving ? 'Đang lưu...' : editBlog ? 'Cập nhật' : 'Đăng bài'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
