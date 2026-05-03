export interface Interior {
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

export interface InteriorForm {
  name: string
  introduction: string
  description: string
  images: string[]
  order: number
  isActive: boolean
}
