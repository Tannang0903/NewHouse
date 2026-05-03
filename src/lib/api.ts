import { prisma } from './prisma'
import { Construction } from '@/interface/construction'

export async function getDesignWorks(): Promise<Construction[]> {
  const items = await prisma.design.findMany({
    where: { isActive: true },
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  })
  return items.map((item) => ({
    id: item.id,
    name: item.name,
    introduction: item.introduction,
    description: item.description,
    images: item.images,
    order: item.order,
    isActive: item.isActive,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  }))
}

export async function getConstructionWorks(): Promise<Construction[]> {
  const items = await prisma.constructionWork.findMany({
    where: { isActive: true },
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  })
  return items.map((item) => ({
    id: item.id,
    name: item.name,
    introduction: item.introduction,
    description: item.description,
    images: item.images,
    order: item.order,
    isActive: item.isActive,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  }))
}

export async function getInteriorWorks(): Promise<Construction[]> {
  const items = await prisma.interior.findMany({
    where: { isActive: true },
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  })
  return items.map((item) => ({
    id: item.id,
    name: item.name,
    introduction: item.introduction,
    description: item.description,
    images: item.images,
    order: item.order,
    isActive: item.isActive,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  }))
}

export async function getDesignPrices() {
  return prisma.designPrice.findMany({ orderBy: { order: 'asc' } })
}

export async function getRoughLaborPrices() {
  return prisma.roughLaborPrice.findMany({ orderBy: { order: 'asc' } })
}

export async function getCompletedPrices() {
  return prisma.completedPrice.findMany({ orderBy: { order: 'asc' } })
}

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
