'use client'
import React from 'react'
import { Construction } from '@/interface/construction'
import Image from 'next/image'

interface Props {
  construction: Construction
}

const CardItem = ({ construction }: Props) => {
  const onShowDetail = () => {
    // Placeholder for future implementation
  }

  return (
    <div
      className='min-w-[30%] cursor-pointer bg-white'
      onClick={() => onShowDetail()}
      role='button'
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onShowDetail()
        }
      }}
    >
      <div className='flex justify-center items-center w-full relative h-[320px]'>
        <Image
          src={construction.imageUrl}
          alt={construction.name}
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          className='object-cover'
          priority
        />
      </div>
      <div className='lg:py-4 md:px-4 md:py-2 max-md:px-2 max-md:py-2 overflow-hidden'>
        <div className='flex flex-col gap-4'>
          <span className='font-normal leading-7 text-black lg:text-[18px] md:text-[16px] max-md:text-[12px] whitespace-nowrap break-words truncate'>
            {construction.name}
          </span>
          <span className='text-[12px] font-light h-[36px]'>{construction.introduction}</span>
          <div>
            <a
              href='/!'
              className='py-[5px] px-[10px] bg-[#ffba00] inline-flex items-center justify-center gap-3 text-white'
            >
              <span className='text-[14px] font-light'>Xem thêm</span>
              <i className='fa-solid fa-arrow-up-right-from-square text-[12px]'></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardItem
