'use client'

import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

interface NextImageProps extends Omit<ImageProps, 'src'> {
  src: string | any // Support both StaticImageData and string URLs
}

const NextImage = ({ src, alt, className, ...props }: NextImageProps) => {
  const [isLoading, setLoading] = useState(true)

  return (
    <Image
      src={src}
      alt={alt}
      className={`${className} ${isLoading ? 'blur-sm grayscale' : 'blur-0 grayscale-0'} duration-700 ease-in-out`}
      onLoadingComplete={() => setLoading(false)}
      {...props}
    />
  )
}

export default NextImage
