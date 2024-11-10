'use client'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { companyImage } from '@/app/api/mockData'

const CompanyInfo = () => {
  return (
    <Swiper className='flex h-[480px]'>
      {companyImage.map((item, index) => (
        <SwiperSlide key={index}>
          <img src={item.image} alt='ui/ux review check' className='object-cover h-full w-full' />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default CompanyInfo
