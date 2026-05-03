import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const item = await prisma.interior.findUnique({ where: { id: params.id } })
    if (!item) return NextResponse.json({ error: 'Không tìm thấy' }, { status: 404 })
    return NextResponse.json(item)
  } catch {
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
    const { name, introduction, description, images, order, isActive } = body

    const updated = await prisma.$transaction(async (tx) => {
      const current = await tx.interior.findUnique({ where: { id: params.id }, select: { id: true, order: true } })
      if (!current)
        throw new Prisma.PrismaClientKnownRequestError('Not found', { code: 'P2025', clientVersion: 'unknown' })

      const requestedOrder = order !== undefined ? Number(order) : current.order

      if (requestedOrder !== current.order) {
        const siblings = await tx.interior.findMany({
          where: { NOT: { id: current.id } },
          orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
          select: { id: true },
        })

        const normalizedOrder = Math.max(1, Math.min(requestedOrder, siblings.length + 1))
        const newList = [...siblings]
        newList.splice(normalizedOrder - 1, 0, { id: current.id })

        for (let i = 0; i < newList.length; i++) {
          await tx.interior.update({ where: { id: newList[i].id }, data: { order: i + 1 } })
        }
      }

      return tx.interior.update({
        where: { id: params.id },
        data: {
          ...(name !== undefined && { name }),
          ...(introduction !== undefined && { introduction }),
          ...(description !== undefined && { description }),
          ...(images !== undefined && { images }),
          ...(isActive !== undefined && { isActive }),
        },
      })
    })

    return NextResponse.json(updated)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: 'Không tìm thấy' }, { status: 404 })
    }
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Không có quyền truy cập' }, { status: 403 })
    }

    await prisma.$transaction(async (tx) => {
      const current = await tx.interior.findUnique({ where: { id: params.id }, select: { id: true } })
      if (!current)
        throw new Prisma.PrismaClientKnownRequestError('Not found', { code: 'P2025', clientVersion: 'unknown' })

      await tx.interior.delete({ where: { id: params.id } })

      const remain = await tx.interior.findMany({
        orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
        select: { id: true },
      })
      for (let i = 0; i < remain.length; i++) {
        await tx.interior.update({ where: { id: remain[i].id }, data: { order: i + 1 } })
      }
    })

    return NextResponse.json({ message: 'Đã xóa thành công' })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: 'Không tìm thấy' }, { status: 404 })
    }
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 })
  }
}
