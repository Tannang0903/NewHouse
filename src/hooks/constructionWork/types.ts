export interface ConstructionWork {
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

export interface ConstructionWorkForm {
  name: string
  introduction: string
  description: string
  images: string[]
  order: number
  isActive: boolean
}
