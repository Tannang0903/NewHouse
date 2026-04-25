export interface Construction {
  id: string
  name: string
  introduction: string
  description: string
  images: string[] // Array URL từ Cloudinary
  type: 'DESIGN' | 'CONSTRUCTION' | 'INTERIOR'
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}
