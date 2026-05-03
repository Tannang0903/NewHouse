'use client'

import { memo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import { companyStaffImage } from '@/app/api/mockData'
import { CompanyInfoProps, ImageData, ImageSlideProps } from '@/interface'
import { useState } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const ImageSlide = memo(({ image, alt, priority }: ImageSlideProps) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className='relative w-full h-full'>
      <Image
        src={image}
        alt={alt}
        fill
        className={`xl:object-contain lg:object-contain object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        priority={priority}
        onLoadingComplete={() => setIsLoading(false)}
      />
      {isLoading && (
        <div className='absolute inset-0 flex items-center justify-center bg-gray-100'>
          <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#ffba00]'></div>
        </div>
      )}
    </div>
  )
})

const CompanyInfoBox = memo(() => (
  <div className='flex flex-col justify-center items-center absolute bg-[#ffba00] bottom-0 left-[50%] translate-x-[-50%] z-50 shadow-lg w-[90%] md:w-auto'>
    <h2 className='px-4 py-2 border-b-[2px] border-[#000] w-full text-center text-[16px] md:text-[18px] font-bold tracking-wide'>
      NEW HOUSE
    </h2>
    <div className='flex flex-col justify-center items-center px-4 py-2 font-light text-[13px] md:text-[14px] w-full'>
      <p className='text-center'>Tư vấn Thiết kế &amp; Thi công Xây dựng Đà Nẵng</p>
      <a
        href='tel:0932511898'
        className='text-center hover:underline transition-all duration-300 mt-1'
        aria-label='Gọi ngay: 0932.511.898'
      >
        Hotline: 0932.511.898
      </a>
    </div>
  </div>
))

const PLACEHOLDER = 'https://placehold.co/1200x800/1a1a1a/ffba00?text=NewHouse'

const CompanyInfo = ({ designImages }: CompanyInfoProps) => {
  const slides =
    designImages.length > 0
      ? designImages.map((url, i) => ({ id: String(i), image: url }))
      : [{ id: '0', image: PLACEHOLDER }]

  return (
    <section className='space-y-10' aria-label='Thông tin công ty'>
      <Swiper className='flex h-[calc(100vh-80px)]'>
        {slides.map((item: ImageData, index) => (
          <SwiperSlide key={item.id || index} className='relative'>
            <ImageSlide image={item.image} alt='Hình ảnh thiết kế NewHouse' priority={index === 0} />
            <CompanyInfoBox />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper className='flex xl:h-[calc(100vh-80px)] lg:h-[calc(100vh-80px)] h-[400px]'>
        {companyStaffImage.map((item: ImageData, index) => (
          <SwiperSlide key={item.id || index} className='relative'>
            <ImageSlide
              image={item.image}
              alt={item.description || 'Hình ảnh nhân viên NewHouse'}
              priority={index === 0}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

ImageSlide.displayName = 'ImageSlide'
CompanyInfoBox.displayName = 'CompanyInfoBox'
CompanyInfo.displayName = 'CompanyInfo'

export default memo(CompanyInfo)
