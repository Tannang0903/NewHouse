import Image from 'next/image'
import { memo } from 'react'
import { NextImageProps } from '@/interface'

const NextImage = ({ src, alt, ...props }: NextImageProps) => {
  return <Image src={src} alt={alt} {...props} />
}

NextImage.displayName = 'NextImage'

export default memo(NextImage)
