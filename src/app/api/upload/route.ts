import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const ALLOWED_FOLDERS = ['blog', 'construction', 'pricing'] as const
type AllowedFolder = (typeof ALLOWED_FOLDERS)[number]

function sanitizeFolder(raw: string): AllowedFolder {
  return ALLOWED_FOLDERS.includes(raw as AllowedFolder) ? (raw as AllowedFolder) : 'blog'
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Không có quyền truy cập' }, { status: 403 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const folder = sanitizeFolder((formData.get('folder') as string) || 'blog')

    if (!file) {
      return NextResponse.json({ error: 'Không có file' }, { status: 400 })
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Chỉ chấp nhận file ảnh' }, { status: 400 })
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File quá lớn (tối đa 10MB)' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`

    const result = await cloudinary.uploader.upload(base64, {
      folder: `newhouse/${folder}`,
      transformation: [
        { quality: 'auto', fetch_format: 'auto' },
        { width: 1920, crop: 'limit' },
      ],
    })

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload thất bại' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Không có quyền truy cập' }, { status: 403 })
    }

    const { publicId } = await request.json()
    if (!publicId) {
      return NextResponse.json({ error: 'Thiếu publicId' }, { status: 400 })
    }

    await cloudinary.uploader.destroy(publicId)
    return NextResponse.json({ message: 'Đã xóa ảnh' })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json({ error: 'Xóa thất bại' }, { status: 500 })
  }
}
