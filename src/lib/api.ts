/**
 * lib/api.ts
 * Dùng cho Server Components — query trực tiếp từ Prisma (không qua HTTP)
 * KHÔNG dùng file này ở Client Components
 */
import { prisma } from './prisma'
import { Construction } from '@/interface/construction'

// ==================== CONSTRUCTION ====================

export async function getConstructions(type?: 'DESIGN' | 'CONSTRUCTION' | 'INTERIOR'): Promise<Construction[]> {
  const items = await prisma.construction.findMany({
    where: {
      isActive: true,
      ...(type ? { type } : {}),
    },
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  })

  return items.map((item) => ({
    id: item.id,
    name: item.name,
    introduction: item.introduction,
    description: item.description,
    images: item.images,
    type: item.type,
    order: item.order,
    isActive: item.isActive,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  }))
}

// ==================== PRICING ====================

export async function getDesignPrices() {
  return prisma.designPrice.findMany({ orderBy: { order: 'asc' } })
}

export async function getRoughLaborPrices() {
  return prisma.roughLaborPrice.findMany({ orderBy: { order: 'asc' } })
}

export async function getCompletedPrices() {
  return prisma.completedPrice.findMany({ orderBy: { order: 'asc' } })
}

// ==================== BLOG ====================

export async function getPublishedBlogs() {
  return prisma.blog.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      slug: true,
      title: true,
      summary: true,
      thumbnailUrl: true,
      author: true,
      createdAt: true,
    },
  })
}

export async function getBlogBySlug(slug: string) {
  return prisma.blog.findUnique({
    where: { slug, isPublished: true },
  })
}
