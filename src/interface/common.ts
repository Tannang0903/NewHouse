import { ImageProps, StaticImageData } from 'next/image'

export interface NextImageProps extends Omit<ImageProps, 'src'> {
  src: string | StaticImageData
}

export interface ButtonProps {
  type?: 'submit' | 'button' | 'reset'
  classNameButton?: string
  children?: React.ReactNode
  isLoading?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}

export interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export interface ImageData {
  id: string
  image: string | StaticImageData
  description?: string
}

export interface ImageSlideProps {
  image: string | StaticImageData
  alt: string
  priority: boolean
}

export interface ImageWithLoadingProps {
  src: string | StaticImageData
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
}
