export interface Design {
  id: string
  name: string
  introduction: string
  description: string
  images: string[]
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface DesignForm {
  name: string
  introduction: string
  description: string
  images: string[]
  order: number
  isActive: boolean
}
