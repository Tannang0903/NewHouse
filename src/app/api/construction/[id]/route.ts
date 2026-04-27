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

    if (name !== undefined && !name.trim()) {
      return NextResponse.json({ error: 'Tên công trình không được để trống' }, { status: 400 })
    }

    if (introduction !== undefined && !introduction.trim()) {
      return NextResponse.json({ error: 'Giới thiệu ngắn không được để trống' }, { status: 400 })
    }

    if (description !== undefined && !description.trim()) {
      return NextResponse.json({ error: 'Mô tả chi tiết không được để trống' }, { status: 400 })
    }

    const updatedConstruction = await prisma.$transaction(async (tx) => {
      const current = await tx.construction.findUnique({
        where: { id: params.id },
        select: { id: true, type: true, order: true },
      })

      if (!current) {
        throw new Prisma.PrismaClientKnownRequestError('Not found', {
          code: 'P2025',
          clientVersion: 'unknown',
        })
      }

      const newType = type ?? current.type
      const requestedOrder = order !== undefined ? Number(order) : current.order

      // Khi đổi type hoặc đổi order: re-index group cũ + group mới
      if (newType !== current.type || requestedOrder !== current.order) {
        // 1) Reindex group cũ sau khi remove current item
        const oldGroup = await tx.construction.findMany({
          where: { type: current.type, NOT: { id: current.id } },
          orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
          select: { id: true },
        })

        for (let i = 0; i < oldGroup.length; i++) {
          await tx.construction.update({
            where: { id: oldGroup[i].id },
            data: { order: i + 1 },
          })
        }

        // 2) Build new group list (without current) then insert current at requested index
        const newGroup = await tx.construction.findMany({
          where: { type: newType, NOT: { id: current.id } },
          orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
          select: { id: true },
        })

        const normalizedOrder = Math.max(1, Math.min(requestedOrder, newGroup.length + 1))

        const newOrderList = [...newGroup]
        newOrderList.splice(normalizedOrder - 1, 0, { id: current.id })

        for (let i = 0; i < newOrderList.length; i++) {
          await tx.construction.update({
            where: { id: newOrderList[i].id },
            data: {
              order: i + 1,
              ...(newOrderList[i].id === current.id && { type: newType }),
            },
          })
        }
      }

      return tx.construction.update({
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

    return NextResponse.json(updatedConstruction)
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

    await prisma.$transaction(async (tx) => {
      const current = await tx.construction.findUnique({
        where: { id: params.id },
        select: { id: true, type: true },
      })

      if (!current) {
        throw new Prisma.PrismaClientKnownRequestError('Not found', {
          code: 'P2025',
          clientVersion: 'unknown',
        })
      }

      await tx.construction.delete({ where: { id: params.id } })

      // Re-index lại thứ tự cùng type sau khi xóa
      const remain = await tx.construction.findMany({
        where: { type: current.type },
        orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
        select: { id: true },
      })

      for (let i = 0; i < remain.length; i++) {
        await tx.construction.update({
          where: { id: remain[i].id },
          data: { order: i + 1 },
        })
      }
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
