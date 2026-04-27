'use client'

import { useState, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import ImageUpload from '../../components/ImageUpload'

const TiptapEditor = dynamic(() => import('@/components/editor/TiptapEditor'), { ssr: false })

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

const Spinner = () => (
  <svg className='w-4 h-4 animate-spin' fill='none' viewBox='0 0 24 24'>
    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
    <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v8z' />
  </svg>
)

export default function BlogAdminPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editBlog, setEditBlog] = useState<BlogDetail | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [togglingId, setTogglingId] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [fetchError, setFetchError] = useState('')

  const isAnyLoading = saving || !!deletingId || !!togglingId || uploading
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
    } catch {
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
        setError('Không thể tải chi tiết bài viết')
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
    } catch {
      setError('Không thể tải chi tiết bài viết')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Xóa bài viết này?')) return
    setDeletingId(id)
    try {
      const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' })
      if (!res.ok) {
        const d = await res.json()
        setFetchError(d.error || 'Xóa thất bại')
        return
      }
      fetchData()
    } catch {
      setFetchError('Xóa thất bại')
    } finally {
      setDeletingId(null)
    }
  }

  const handleTogglePublish = async (blog: Blog) => {
    setTogglingId(blog.id)
    try {
      const res = await fetch(`/api/blog/${blog.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !blog.isPublished }),
      })
      if (!res.ok) {
        const d = await res.json()
        setFetchError(d.error || 'Cập nhật thất bại')
        return
      }
      fetchData()
    } catch {
      setFetchError('Cập nhật trạng thái thất bại')
    } finally {
      setTogglingId(null)
    }
  }

  const handleTitleChange = (title: string) => {
    setForm((prev) => ({ ...prev, title, slug: prev.slug || slugify(title) }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    const url = editBlog ? `/api/blog/${editBlog.id}` : '/api/blog'
    const method = editBlog ? 'PUT' : 'POST'
    try {
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
      fetchData()
    } catch {
      setError('Không thể kết nối server')
    } finally {
      setSaving(false)
    }
  }

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })

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
          disabled={isAnyLoading}
          className='bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2'
        >
          <span>✏️</span> Viết bài mới
        </button>
      </div>

      {fetchError && (
        <div className='mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center justify-between'>
          <span>{fetchError}</span>
          <button onClick={() => setFetchError('')} className='text-red-400 hover:text-red-600 font-bold ml-4'>
            ×
          </button>
        </div>
      )}

      {loading ? (
        <div className='text-center py-20 text-gray-400'>Đang tải...</div>
      ) : (
        <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
          <table className='w-full table-fixed'>
            <colgroup>
              {/* thumbnail */}
              <col className='w-16' />
              {/* title takes remaining space */}
              <col />
              <col className='w-36' />
              <col className='w-28' />
              <col className='w-32' />
              <col className='w-24' />
            </colgroup>
            <thead>
              <tr className='bg-gray-50 border-b border-gray-100'>
                <th className='px-4 py-3 text-xs font-semibold text-gray-500 uppercase'></th>
                <th className='text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase'>Tiêu đề</th>
                <th className='text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase'>Tác giả</th>
                <th className='text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase'>Ngày tạo</th>
                <th className='text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase'>Trạng thái</th>
                <th className='text-center px-3 py-3 text-xs font-semibold text-gray-500 uppercase'>Thao tác</th>
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
                    <td className='px-4 py-3'>
                      {blog.thumbnailUrl ? (
                        <img src={blog.thumbnailUrl} alt={blog.title} className='w-10 h-10 rounded-lg object-cover' />
                      ) : (
                        <div className='w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-300 text-xs'>
                          📄
                        </div>
                      )}
                    </td>
                    <td className='px-3 py-3 min-w-0'>
                      <p className='text-sm font-medium text-gray-900 truncate'>{blog.title}</p>
                      <p className='text-xs text-gray-400 truncate mt-0.5'>{blog.summary}</p>
                    </td>
                    <td className='px-3 py-3 text-sm text-gray-600 truncate'>{blog.author}</td>
                    <td className='px-3 py-3 text-sm text-gray-500 whitespace-nowrap'>{formatDate(blog.createdAt)}</td>
                    <td className='px-3 py-3'>
                      <button
                        onClick={() => handleTogglePublish(blog)}
                        disabled={isAnyLoading}
                        className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium transition-colors disabled:opacity-50 ${
                          blog.isPublished
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                        }`}
                      >
                        {togglingId === blog.id ? <Spinner /> : null}
                        {blog.isPublished ? '✓ Đã đăng' : '◐ Nháp'}
                      </button>
                    </td>
                    <td className='px-3 py-3'>
                      <div className='flex items-center justify-center gap-1'>
                        <button
                          onClick={() => openEdit(blog)}
                          disabled={isAnyLoading}
                          title='Chỉnh sửa'
                          className='p-1.5 rounded-md text-blue-500 hover:bg-blue-50 transition-colors disabled:opacity-40'
                        >
                          <IconEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          disabled={isAnyLoading}
                          title='Xóa'
                          className='p-1.5 rounded-md text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40'
                        >
                          {deletingId === blog.id ? <Spinner /> : <IconTrash />}
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
          <div className='bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl'>
            <div className='sticky top-0 bg-white z-10 px-6 py-4 border-b border-gray-100 flex items-center justify-between'>
              <h2 className='text-lg font-bold text-gray-900'>{editBlog ? 'Chỉnh sửa bài viết' : 'Viết bài mới'}</h2>
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
                  Tiêu đề bài viết <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  required
                  disabled={saving}
                  className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:bg-gray-50'
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
                  disabled={saving}
                  className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:bg-gray-50'
                />
                <p className='text-xs text-gray-400 mt-1'>URL: /blog/{form.slug || 'slug-bai-viet'}</p>
              </div>

              <div className='grid grid-cols-2 gap-4 items-start'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Tác giả</label>
                  <input
                    type='text'
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                    disabled={saving}
                    className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:bg-gray-50'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Ảnh thumbnail</label>
                  <div className='max-w-xs'>
                    <ImageUpload
                      images={form.thumbnailUrl ? [form.thumbnailUrl] : []}
                      onChange={(urls) => setForm({ ...form, thumbnailUrl: urls[0] || '' })}
                      folder='blog'
                      single={true}
                      onUploadStart={() => setUploading(true)}
                      onUploadEnd={() => setUploading(false)}
                    />
                  </div>
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
                  disabled={saving}
                  placeholder='Tóm tắt ngắn hiển thị ở danh sách bài viết'
                  className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none disabled:bg-gray-50'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Nội dung bài viết <span className='text-red-500'>*</span>
                  <span className='text-gray-400 font-normal ml-1 text-xs'>(paste ảnh trực tiếp vào nội dung)</span>
                </label>
                <TiptapEditor
                  value={form.content}
                  onChange={(html) => setForm((prev) => ({ ...prev, content: html }))}
                />
              </div>

              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id='isPublished'
                  checked={form.isPublished}
                  disabled={saving}
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
