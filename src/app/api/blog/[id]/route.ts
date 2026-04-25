import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    const blog = await prisma.blog.findFirst({
      where: session ? { id: params.id } : { id: params.id, isPublished: true },
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

    if (slug) {
      const existing = await prisma.blog.findUnique({ where: { slug } })
      if (existing && existing.id !== params.id) {
        return NextResponse.json({ error: 'Slug đã tồn tại' }, { status: 409 })
      }
    }

    const blog = await prisma.blog.update({
      where: { id: params.id },
      data: {
        ...(slug && { slug }),
        ...(title && { title }),
        ...(summary && { summary }),
        ...(content && { content }),
        ...(thumbnailUrl !== undefined && { thumbnailUrl }),
        ...(author && { author }),
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
