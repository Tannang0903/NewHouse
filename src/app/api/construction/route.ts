import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')

    const constructions = await prisma.construction.findMany({
      where: type ? { type: type as 'DESIGN' | 'CONSTRUCTION' | 'INTERIOR' } : undefined,
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    })

    return NextResponse.json(constructions)
  } catch (error) {
    console.error('GET /api/construction error:', error)
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Không có quyền truy cập' }, { status: 403 })
    }

    const body = await request.json()
    const { name, introduction, description, images, type, isActive } = body

    if (!name || !introduction || !description || !type) {
      return NextResponse.json({ error: 'Thiếu thông tin bắt buộc' }, { status: 400 })
    }

    // Tính order tiếp theo: lấy order lớn nhất trong cùng type rồi + 1
    const lastItem = await prisma.construction.findFirst({
      where: { type },
      orderBy: { order: 'desc' },
      select: { order: true },
    })

    const nextOrder = (lastItem?.order ?? 0) + 1

    const construction = await prisma.construction.create({
      data: {
        name,
        introduction,
        description,
        images: images || [],
        type,
        order: nextOrder,
        isActive: isActive ?? true,
      },
    })

    return NextResponse.json(construction, { status: 201 })
  } catch (error) {
    console.error('POST /api/construction error:', error)
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 })
  }
}
