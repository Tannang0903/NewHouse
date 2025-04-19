import { StaticImageData } from 'next/image'

export interface Construction {
  id: string
  name: string
  introduction: string
  description: string
  imageUrl: string | StaticImageData
}
