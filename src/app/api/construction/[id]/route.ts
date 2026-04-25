import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const construction = await prisma.construction.findUnique({
      where: { id: params.id },
    })

    if (!construction) {
      return NextResponse.json({ error: 'Không tìm thấy' }, { status: 404 })
    }

    return NextResponse.json(construction)
  } catch (error) {
    console.error('GET /api/construction/[id] error:', error)
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
    const { name, introduction, description, images, type, order, isActive } = body

    const construction = await prisma.construction.update({
      where: { id: params.id },
      data: {
        ...(name && { name }),
        ...(introduction && { introduction }),
        ...(description && { description }),
        ...(images && { images }),
        ...(type && { type }),
        ...(order !== undefined && { order }),
        ...(isActive !== undefined && { isActive }),
      },
    })

    return NextResponse.json(construction)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: 'Không tìm thấy' }, { status: 404 })
    }

    console.error('PUT /api/construction/[id] error:', error)
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Không có quyền truy cập' }, { status: 403 })
    }

    await prisma.construction.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'Đã xóa thành công' })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: 'Không tìm thấy' }, { status: 404 })
    }

    console.error('DELETE /api/construction/[id] error:', error)
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 })
  }
}
