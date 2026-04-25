import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Không có quyền truy cập' }, { status: 403 })
    }

    const body = await request.json()
    const { label, price, isIncluded, note, order } = body

    const item = await prisma.designPrice.update({
      where: { id: params.id },
      data: {
        ...(label && { label }),
        ...(price !== undefined && { price }),
        ...(isIncluded !== undefined && { isIncluded }),
        ...(note !== undefined && { note }),
        ...(order !== undefined && { order }),
      },
    })

    return NextResponse.json(item)
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

    await prisma.designPrice.delete({ where: { id: params.id } })
    return NextResponse.json({ message: 'Đã xóa' })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: 'Không tìm thấy' }, { status: 404 })
    }

    console.error(error)
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 })
  }
}
