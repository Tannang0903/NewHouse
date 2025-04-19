'use client'

import React, { memo, useState } from 'react'
import { Construction } from '@/interface/construction'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  construction: Construction
}

const CardItem = memo(({ construction }: Props) => {
  const [isLoading, setIsLoading] = useState(true)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
    }
  }

  return (
    <article
      className='group min-w-[30%] cursor-pointer bg-white hover:shadow-lg transition-all duration-300'
      role='article'
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={`Dự án ${construction.name}`}
    >
      <div className='flex justify-center items-center w-full relative h-[320px] overflow-hidden'>
        <Image
          src={construction.imageUrl}
          alt={`Hình ảnh dự án ${construction.name}`}
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          className={`object-cover transition-transform duration-300 group-hover:scale-105 ${
            isLoading ? 'blur-sm' : ''
          }`}
          priority
          onLoadingComplete={() => setIsLoading(false)}
        />
        {isLoading && (
          <div className='absolute inset-0 flex items-center justify-center bg-gray-100'>
            <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#ffba00]'></div>
          </div>
        )}
      </div>

      <div className='lg:py-4 md:px-4 md:py-2 max-md:px-2 max-md:py-2 overflow-hidden'>
        <div className='flex flex-col gap-4'>
          <h3 className='font-normal leading-7 text-black lg:text-[18px] md:text-[16px] max-md:text-[12px] whitespace-nowrap break-words truncate'>
            {construction.name}
          </h3>
          <p className='text-[12px] font-light h-[36px] line-clamp-2'>{construction.introduction}</p>
          <div>
            <Link
              href={`#`}
              className='py-[5px] px-[10px] bg-[#ffba00] inline-flex items-center justify-center gap-3 text-white hover:bg-[#e5a700] transition-colors duration-300'
              aria-label={`Xem thêm về dự án ${construction.name}`}
            >
              <span className='text-[14px] font-light'>Xem thêm</span>
              <i className='fa-solid fa-arrow-up-right-from-square text-[12px]' aria-hidden='true'></i>
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
})

CardItem.displayName = 'CardItem'

export default CardItem
