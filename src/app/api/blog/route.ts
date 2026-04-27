import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const stripHtml = (html: string) =>
  html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .trim()

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    const isAdmin = session?.user?.role === 'ADMIN'

    // Admins with no filter see all; everyone else only sees published items
    const where = isAdmin ? undefined : { isPublished: true }

    const blogs = await prisma.blog.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        slug: true,
        title: true,
        summary: true,
        thumbnailUrl: true,
        author: true,
        isPublished: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return NextResponse.json(blogs)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Không có quyền truy cập' }, { status: 403 })
    }

    const body = await request.json()
    const { slug, title, summary, content, thumbnailUrl, author, isPublished } = body

    if (!slug || !title || !summary || !content) {
      return NextResponse.json({ error: 'Thiếu thông tin bắt buộc' }, { status: 400 })
    }

    if (stripHtml(content).length === 0) {
      return NextResponse.json({ error: 'Nội dung bài viết không được để trống' }, { status: 400 })
    }

    const existing = await prisma.blog.findUnique({ where: { slug } })
    if (existing) {
      return NextResponse.json({ error: 'Slug đã tồn tại' }, { status: 409 })
    }

    const blog = await prisma.blog.create({
      data: {
        slug,
        title,
        summary,
        content,
        thumbnailUrl,
        author: author || 'NewHouse',
        isPublished: isPublished ?? false,
      },
    })

    return NextResponse.json(blog, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 })
  }
}
