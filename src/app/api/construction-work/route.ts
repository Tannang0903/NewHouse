import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const items = await prisma.constructionWork.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    })

    return NextResponse.json(items)
  } catch (error) {
    console.error('GET /api/construction-work error:', error)
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
    const { name, introduction, description, images, isActive } = body

    if (!name || !introduction || !description) {
      return NextResponse.json({ error: 'Thiếu thông tin bắt buộc' }, { status: 400 })
    }

    const lastItem = await prisma.constructionWork.findFirst({
      orderBy: { order: 'desc' },
      select: { order: true },
    })

    const nextOrder = (lastItem?.order ?? 0) + 1

    const item = await prisma.constructionWork.create({
      data: {
        name,
        introduction,
        description,
        images: images || [],
        order: nextOrder,
        isActive: isActive ?? true,
      },
    })

    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    console.error('POST /api/construction-work error:', error)
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 })
  }
}
