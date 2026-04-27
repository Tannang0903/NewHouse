import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

const stripHtml = (html: string) =>
  html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .trim()

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    const blog = await prisma.blog.findFirst({
      where: session?.user?.role === 'ADMIN' ? { id: params.id } : { id: params.id, isPublished: true },
    })

    if (!blog) return NextResponse.json({ error: 'Không tìm thấy' }, { status: 404 })
    return NextResponse.json(blog)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Không có quyền truy cập' }, { status: 403 })
    }

    const body = await request.json()
    const { slug, title, summary, content, thumbnailUrl, author, isPublished } = body

    if (slug !== undefined && !slug.trim()) {
      return NextResponse.json({ error: 'Slug không được để trống' }, { status: 400 })
    }

    if (title !== undefined && !title.trim()) {
      return NextResponse.json({ error: 'Tiêu đề không được để trống' }, { status: 400 })
    }

    if (summary !== undefined && !summary.trim()) {
      return NextResponse.json({ error: 'Tóm tắt không được để trống' }, { status: 400 })
    }

    if (author !== undefined && !author.trim()) {
      return NextResponse.json({ error: 'Tác giả không được để trống' }, { status: 400 })
    }

    if (content !== undefined && stripHtml(content).length === 0) {
      return NextResponse.json({ error: 'Nội dung bài viết không được để trống' }, { status: 400 })
    }

    if (slug !== undefined) {
      const existing = await prisma.blog.findUnique({ where: { slug } })
      if (existing && existing.id !== params.id) {
        return NextResponse.json({ error: 'Slug đã tồn tại' }, { status: 409 })
      }
    }

    const blog = await prisma.blog.update({
      where: { id: params.id },
      data: {
        ...(slug !== undefined && { slug }),
        ...(title !== undefined && { title }),
        ...(summary !== undefined && { summary }),
        ...(content !== undefined && { content }),
        ...(thumbnailUrl !== undefined && { thumbnailUrl }),
        ...(author !== undefined && { author }),
        ...(isPublished !== undefined && { isPublished }),
      },
    })

    return NextResponse.json(blog)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: 'Không tìm thấy' }, { status: 404 })
    }

    console.error(error)
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Không có quyền truy cập' }, { status: 403 })
    }

    await prisma.blog.delete({ where: { id: params.id } })
    return NextResponse.json({ message: 'Đã xóa' })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: 'Không tìm thấy' }, { status: 404 })
    }

    console.error(error)
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 })
  }
}
