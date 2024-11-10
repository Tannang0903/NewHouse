'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Construction } from '@/interface/construction'

interface Props {
  construction: Construction
}

const CardItem = ({ construction }: Props) => {
  const router = useRouter()

  const onShowDetail = () => {
    router.push(`/construction/${construction.id}`)
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
      <div className='flex justify-center items-center w-full'>
        <img
          src={construction.imageUrl}
          alt='ui/ux review check'
          className='object-cover lg:h-[320px] md:h-[180px] max-md:h-[100px] w-full '
        />
      </div>
      <div className='lg:py-4 md:px-4 md:py-2 max-md:px-2 max-md:py-2 overflow-hidden'>
        <div className='flex flex-col gap-4'>
          <span className='font-normal leading-7 text-black lg:text-[18px] md:text-[16px] max-md:text-[12px] whitespace-nowrap break-words truncate'>
            {construction.name}
          </span>
          <span className='text-[12px] font-light'>{construction.introduction}</span>
          <div>
            <a
              href='/!'
              className='py-[5px] px-[10px] bg-[#ffba00] inline-flex items-center justify-center gap-3 text-white'
            >
              <span className='text-[14px] font-light'>Khám phá</span>
              <i className='fa-solid fa-arrow-up-right-from-square text-[12px]'></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardItem
