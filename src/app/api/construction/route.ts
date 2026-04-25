import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/construction - Lấy danh sách
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

// POST /api/construction - Tạo mới
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 })
    }

    const body = await request.json()
    const { name, introduction, description, images, type, order } = body

    if (!name || !introduction || !description || !type) {
      return NextResponse.json({ error: 'Thiếu thông tin bắt buộc' }, { status: 400 })
    }

    const construction = await prisma.construction.create({
      data: {
        name,
        introduction,
        description,
        images: images || [],
        type,
        order: order || 0,
      },
    })

    return NextResponse.json(construction, { status: 201 })
  } catch (error) {
    console.error('POST /api/construction error:', error)
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 })
  }
}
