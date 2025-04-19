'use client'

import Image, { ImageProps, StaticImageData } from 'next/image'
import { memo } from 'react'

interface NextImageProps extends Omit<ImageProps, 'src'> {
  src: string | StaticImageData
}

const NextImage = ({ src, alt, ...props }: NextImageProps) => {
  return <Image src={src} alt={alt} {...props} />
}

NextImage.displayName = 'NextImage'

export default memo(NextImage)
