'use client'

import { useState, useRef, useCallback } from 'react'
import { useUploadFile } from '@/hooks/upload'
import { ImageUploadProps, UploadingFile } from '@/interface'

export default function ImageUpload({
  images,
  onChange,
  folder = 'general',
  maxImages = 10,
  single = false,
  onUploadStart,
  onUploadEnd,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState<UploadingFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { uploadFile } = useUploadFile()

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return

      const fileArray = single ? [files[0]] : Array.from(files)

      const remaining = maxImages - images.length
      if (!single && fileArray.length > remaining) {
        alert(`Chỉ có thể thêm tối đa ${remaining} ảnh nữa`)
        return
      }

      const newUploading: UploadingFile[] = fileArray.map((file) => ({
        id: Math.random().toString(36).slice(2),
        name: file.name,
        preview: URL.createObjectURL(file),
        progress: 'uploading' as const,
      }))

      setUploading((prev) => [...prev, ...newUploading])
      onUploadStart?.()

      const uploadedUrls: string[] = []

      for (let i = 0; i < fileArray.length; i++) {
        const file = fileArray[i]
        const uploadItem = newUploading[i]

        try {
          const url = await uploadFile(file, folder)
          uploadedUrls.push(url)
          setUploading((prev) => prev.map((u) => (u.id === uploadItem.id ? { ...u, progress: 'done' } : u)))
        } catch {
          setUploading((prev) => prev.map((u) => (u.id === uploadItem.id ? { ...u, progress: 'error' } : u)))
        }
      }

      onUploadEnd?.()

      if (uploadedUrls.length > 0) {
        if (single) {
          onChange(uploadedUrls)
        } else {
          onChange([...images, ...uploadedUrls])
        }
      }

      setTimeout(() => {
        setUploading((prev) => prev.filter((u) => !newUploading.find((n) => n.id === u.id)))
      }, 1500)
    },
    [folder, images, maxImages, onChange, single, uploadFile]
  )

  const handleRemove = (url: string) => {
    onChange(images.filter((u) => u !== url))
  }

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      handleFiles(e.dataTransfer.files)
    },
    [handleFiles]
  )

  const canUploadMore = single ? images.length === 0 : images.length < maxImages

  return (
    <div className='space-y-3'>
      {canUploadMore && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
            isDragging ? 'border-amber-400 bg-amber-50' : 'border-gray-300 hover:border-amber-400 hover:bg-amber-50/50'
          }`}
        >
          <div className='flex flex-col items-center gap-2'>
            <div className='text-3xl'>📸</div>
            <p className='text-sm font-medium text-gray-700'>
              Kéo thả ảnh vào đây hoặc <span className='text-amber-500 underline'>chọn file</span>
            </p>
            <p className='text-xs text-gray-400'>
              JPG, PNG, WEBP — tối đa 10MB/ảnh
              {!single && ` — còn ${maxImages - images.length} ảnh`}
            </p>
          </div>
          <input
            ref={inputRef}
            type='file'
            accept='image/*'
            multiple={!single}
            className='hidden'
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>
      )}

      {uploading.length > 0 && (
        <div className='grid grid-cols-4 gap-2'>
          {uploading.map((item) => (
            <div key={item.id} className='relative aspect-square rounded-lg overflow-hidden'>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.preview} alt={item.name} className='w-full h-full object-cover' />
              <div className='absolute inset-0 flex items-center justify-center bg-black/40'>
                {item.progress === 'uploading' && <div className='animate-spin text-2xl'>⏳</div>}
                {item.progress === 'done' && <div className='text-2xl'>✅</div>}
                {item.progress === 'error' && <div className='text-2xl'>❌</div>}
              </div>
            </div>
          ))}
        </div>
      )}

      {images.length > 0 && (
        <div className={single ? '' : 'grid grid-cols-4 gap-2'}>
          {images.map((url, idx) => (
            <div
              key={url}
              className={`relative group rounded-lg overflow-hidden border border-gray-200 ${single ? 'aspect-video' : 'aspect-square'}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={`Ảnh ${idx + 1}`} className='w-full h-full object-cover' />
              <div className='absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100'>
                <button
                  type='button'
                  onClick={() => handleRemove(url)}
                  className='bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold transition-colors'
                  title='Xóa ảnh'
                >
                  ×
                </button>
              </div>
              {!single && (
                <div className='absolute top-1 left-1 bg-black/60 text-white text-xs rounded px-1.5 py-0.5'>
                  {idx + 1}
                </div>
              )}
            </div>
          ))}

          {!single && images.length < maxImages && (
            <button
              type='button'
              onClick={() => inputRef.current?.click()}
              className='aspect-square rounded-lg border-2 border-dashed border-gray-200 hover:border-amber-400 flex items-center justify-center text-gray-400 hover:text-amber-500 transition-colors'
            >
              <span className='text-2xl'>+</span>
            </button>
          )}
        </div>
      )}

      {!single && images.length > 0 && (
        <p className='text-xs text-gray-400 text-right'>
          {images.length}/{maxImages} ảnh
        </p>
      )}
    </div>
  )
}
